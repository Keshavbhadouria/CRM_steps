import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { MeetingsService } from 'src/app/core/services/meetings.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  //styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  zoomMeetingUrlFilter = '';
  maxScheduleDateFilter: Date;
  minScheduleDateFilter: Date;
  commentsFilter = '';
  maxMeetingStatusIdFilter: number;
  maxMeetingStatusIdFilterEmpty: number;
  minMeetingStatusIdFilter: number;
  minMeetingStatusIdFilterEmpty: number;
  isActiveFilter = -1;
  zoomUUIDFilter = '';
  zoomMeetingIdFilter = '';
  contactCompanyFilter = '';
  userNameFilter = '';
  meetingTimeSlotsStartTimeFilter = '';
  meetingDaysLookupDayShortNameFilter = '';
  contactZoomMeetingAppointmentReasonReasonFilter = '';
  contactZoomMeetingOutputOutputFilter = '';
  contactZoomMeetingOutputOutput2Filter = '';

  viewMeeting: any;
  editMeeting: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  meetingList: any;
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
      header: 'Company',
    },
    {
      primaryKey: 'userName',
      header: 'UserName',
    },
    {
      primaryKey: 'meetingTimeSlotsStartTime',
      header: 'MeetingTimeSlot',
    },
    {
      primaryKey: 'meetingDaysLookupDayShortName',
      header: 'DaySlotName',
    },
    {
      primaryKey: 'contactZoomMeetingAppointmentReasonReason',
      header: 'AppointmentReason',
    },
    {
      primaryKey: 'contactZoomMeetingOutputOutput',
      header: 'ExpectedOutput',
    },
    {
      primaryKey: 'contactZoomMeetingOutputOutput2',
      header: 'ActualOutput',
    },
    {
      primaryKey: 'contactZoomMeetingOutputOutput2',
      header: 'ActualOutput',
    },
    {
      primaryKey: 'contactZoomCallMeeting.zoomMeetingUrl',
      header: 'ZoomMeetingUrl',
    },
    {
      primaryKey: 'contactZoomCallMeeting.scheduleDate',
      header: 'ScheduleDate',
      format: PipeFormat.DATE
    },
    {
      primaryKey: 'contactZoomCallMeeting.comments',
      header: 'Comments',
    },
    {
      primaryKey: 'contactZoomCallMeeting.isActive',
      header: 'IsActive',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewMeeting = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._meetingServiceService.getContactZoomCallMeetingForEdit(obj.contactZoomCallMeeting.id).then(s => {
          this.hideLoader();
          this.editMeeting = s.result.contactZoomCallMeeting;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.contactZoomCallMeeting.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _meetingServiceService: MeetingsService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Meetings' }, { label: 'List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._meetingServiceService.getAll(
      this.filterText,
      this.zoomMeetingUrlFilter,
      this.maxScheduleDateFilter,
      this.minScheduleDateFilter,
      this.commentsFilter,
      this.maxMeetingStatusIdFilter == null ? this.maxMeetingStatusIdFilterEmpty : this.maxMeetingStatusIdFilter,
      this.minMeetingStatusIdFilter == null ? this.minMeetingStatusIdFilterEmpty : this.minMeetingStatusIdFilter,
      this.isActiveFilter,
      this.zoomUUIDFilter,
      this.zoomMeetingIdFilter,
      this.contactCompanyFilter,
      this.userNameFilter,
      this.meetingTimeSlotsStartTimeFilter,
      this.meetingDaysLookupDayShortNameFilter,
      this.contactZoomMeetingAppointmentReasonReasonFilter,
      this.contactZoomMeetingOutputOutputFilter,
      this.contactZoomMeetingOutputOutput2Filter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.meetingList = res.result.items;
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
    this.editMeeting = null;
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
          this._meetingServiceService.delete(id)
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
