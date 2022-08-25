import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { PushNotificationService } from 'src/app/core/services/push-notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  //styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  toFilter = '';
  titleFilter = '';
  subTitleFilter = '';
  typeFilter = '';
  bodyFilter = '';
  maxUserIdFilter: number;
  maxUserIdFilterEmpty: number;
  minUserIdFilter: number;
  minUserIdFilterEmpty: number;
  priorityFilter = '';
  maxContactIdFilter: number;
  maxContactIdFilterEmpty: number;
  minContactIdFilter: number;
  minContactIdFilterEmpty: number;
  isSentFilter = -1;
  maxScheduleDatetimeFilter: Date;
  minScheduleDatetimeFilter: Date;
  maxCreatedOnFilter: Date;
  minCreatedOnFilter: Date;

  viewPushNotification: any;
  editPushNotification: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  pushNotificationList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'pushNotificationHistory.to',
      header: 'To',
    },
    {
      primaryKey: 'pushNotificationHistory.title',
      header: 'Title',
    },
    {
      primaryKey: 'pushNotificationHistory.subTitle',
      header: 'SubTitle',
    },
    {
      primaryKey: 'pushNotificationHistory.type',
      header: 'Type',
    },
    {
      primaryKey: 'pushNotificationHistory.body',
      header: 'Body',
    },
    {
      primaryKey: 'pushNotificationHistory.userId',
      header: 'UserId',
    },
    {
      primaryKey: 'pushNotificationHistory.priority',
      header: 'Priority',
    },
    {
      primaryKey: 'pushNotificationHistory.contactId',
      header: 'ContactId',
    },
    {
      primaryKey: 'pushNotificationHistory.isSent',
      header: 'IsSent',
    },
    {
      primaryKey: 'pushNotificationHistory.scheduleDatetime',
      header: 'ScheduleDatetime',
      format: PipeFormat.DATE
    },
    {
      primaryKey: 'pushNotificationHistory.createdOn',
      header: 'CreatedOn',
      format: PipeFormat.DATE
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewPushNotification = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._pushNotificationService.getPushNotificationHistoryForEdit(obj.pushNotificationHistory.id).then(s => {
          this.hideLoader();
          this.editPushNotification = s.result.pushNotificationHistory;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.pushNotificationHistory.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _pushNotificationService: PushNotificationService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'PushNotifications' }, { label: 'List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._pushNotificationService.getAll(
      this.filterText,
      this.toFilter,
      this.titleFilter,
      this.subTitleFilter,
      this.typeFilter,
      this.bodyFilter,
      this.maxUserIdFilter == null ? this.maxUserIdFilterEmpty : this.maxUserIdFilter,
      this.minUserIdFilter == null ? this.minUserIdFilterEmpty : this.minUserIdFilter,
      this.priorityFilter,
      this.maxContactIdFilter == null ? this.maxContactIdFilterEmpty : this.maxContactIdFilter,
      this.minContactIdFilter == null ? this.minContactIdFilterEmpty : this.minContactIdFilter,
      this.isSentFilter,
      this.maxScheduleDatetimeFilter,
      this.minScheduleDatetimeFilter,
      this.maxCreatedOnFilter,
      this.minCreatedOnFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.pushNotificationList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.editPushNotification = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  onDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: this.translate.instant('Areyousure?'),
        text: this.translate.instant('RevertMsg'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('confirmButtonTextMsg'),
        cancelButtonText: this.translate.instant('cancelButtonTextMsg'),
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._pushNotificationService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess(this.translate.instant('Deleted!'),
                  this.translate.instant('RecordDeletedSuccessfully'));
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
}
