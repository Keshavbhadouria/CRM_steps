import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { MessageService } from 'src/app/core/services/message.service';
import { PhoneCallsService } from 'src/app/core/services/phone-calls.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phone-calls',
  templateUrl: './phone-calls.component.html',
  //styleUrls: ['./phone-calls.component.scss']
})
export class PhoneCallsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  inboundCallFilter = -1;
  phoneNumberFilter = '';
  voiceMailFilter = -1;
  commentsFilter = '';
  callAgainTodayFilter = -1;
  callAgainDateFilter = '';
  callAgainTimeFilter = '';
  contactCompanyFilter = '';
  userNameFilter = '';
  phoneCallObjetiveObjetiveNameFilter = '';
  contactPhoneCallOutcomeOutcomeFilter = '';
  businessActionScriptContentScriptFilter = '';
  phoneCallObjetiveObjetiveName2Filter = '';
  maxDateFilter: Date;
  minDateFilter: Date;
  leadTempratureFilter: string = '';

  viewPhoneCall: any;
  editPhoneCall: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  phoneCallList: any;
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
      primaryKey: 'contactCompany',
      header: 'ContactName',
    },
    {
      primaryKey: 'userName',
      header: 'LawyerName',
    },
    {
      primaryKey: 'contactPhoneCallOutcomeOutcome',
      header: 'Outcome',
    },
    {
      primaryKey: 'contactPhoneCallHistory.creationTime',
      header: 'Date',
      format : PipeFormat.DATE
    },
    {
      primaryKey: 'contactPhoneCallHistory.callAgainDate',
      header: 'CallAgainDate',
      format : PipeFormat.DATE
    },
    {
      primaryKey: 'contactPhoneCallHistory.callAgainTime',
      header: 'CallAgainTime'
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewPhoneCall = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._phoneCallService.getContactPhoneCallHistoryForEdit(obj.contactPhoneCallHistory.id).then(s => {
          this.hideLoader();
          this.editPhoneCall = s.result.contactPhoneCallHistory;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.contactPhoneCallHistory.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _phoneCallService: PhoneCallsService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'PhoneCalls' }, { label: 'List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._phoneCallService.getAll(
      this.filterText,
      this.maxDateFilter,
      this.minDateFilter,
      this.inboundCallFilter,
      this.phoneNumberFilter,
      this.voiceMailFilter,
      this.commentsFilter,
      this.callAgainTodayFilter,
      this.callAgainDateFilter,
      this.callAgainTimeFilter,
      this.contactCompanyFilter,
      this.userNameFilter,
      this.phoneCallObjetiveObjetiveNameFilter,
      this.contactPhoneCallOutcomeOutcomeFilter,
      this.businessActionScriptContentScriptFilter,
      this.phoneCallObjetiveObjetiveName2Filter,
      this.leadTempratureFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.phoneCallList = res.result.items;
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
    this.editPhoneCall = null;
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
          this._phoneCallService.delete(id)
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
