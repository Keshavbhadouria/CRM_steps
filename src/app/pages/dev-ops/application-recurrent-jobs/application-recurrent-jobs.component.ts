import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ApplicationRecurrentJobsService } from 'src/app/core/services/application-recurrent-jobs.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-recurrent-jobs',
  templateUrl: './application-recurrent-jobs.component.html',
  //styleUrls: ['./application-recurrent-jobs.component.scss']
})
export class ApplicationRecurrentJobsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  jobNameFilter = '';
  maxRunningAtTimeFilter: Date;
  minRunningAtTimeFilter: Date;
  saturdayFilter = -1;
  clientApplicationApplicationNameFilter = '';
  serverInventoryServerNameFilter = '';
  userNameFilter = '';

  viewRecurrentJob: any;
  editRecurrentJob: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  recurrentJobList: any;
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
      primaryKey: 'clientApplicationApplicationName',
      header: 'ClientApplicationName',
    },
    {
      primaryKey: 'serverInventoryServerName',
      header: 'ServerInventoryName',
    },
    {
      primaryKey: 'userName',
      header: 'Responsible',
    },
    {
      primaryKey: 'applicationRecurrentJob.jobName',
      header: 'JobName',
    },
    {
      primaryKey: 'applicationRecurrentJob.runningAtTime',
      header: 'RunningAtTime',
      format : PipeFormat.DATE
    },
    {
      primaryKey: 'applicationRecurrentJob.monday',
      header: 'Monday',
    },
    {
      primaryKey: 'applicationRecurrentJob.tuesday',
      header: 'Tuesday',
    },
    {
      primaryKey: 'applicationRecurrentJob.wednesday',
      header: 'Wednesday',
    },
    {
      primaryKey: 'applicationRecurrentJob.thursday',
      header: 'Thursday',
    },
    {
      primaryKey: 'applicationRecurrentJob.friday',
      header: 'Friday',
    },
    {
      primaryKey: 'applicationRecurrentJob.saturday',
      header: 'Saturday',
    },
    {
      primaryKey: 'applicationRecurrentJob.sunday',
      header: 'Sunday',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewRecurrentJob = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._applicationRecurrentJobService.getApplicationRecurrentJobForEdit(obj.applicationRecurrentJob.id).then(s => {
          this.hideLoader();
          this.editRecurrentJob = s.result.applicationRecurrentJob;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.applicationRecurrentJob.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _applicationRecurrentJobService: ApplicationRecurrentJobsService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'ServicesSchedules' }, { label: 'ApplicationRecurrentJobs', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._applicationRecurrentJobService.getAll(
      this.filterText,
      this.jobNameFilter,
      this.maxRunningAtTimeFilter,
      this.minRunningAtTimeFilter,
      this.saturdayFilter,
      this.clientApplicationApplicationNameFilter,
      this.serverInventoryServerNameFilter,
      this.userNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.recurrentJobList = res.result.items;
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
    this.editRecurrentJob = null;
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
          this._applicationRecurrentJobService.delete(id)
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
