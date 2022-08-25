import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { ContactZoomMeetingService } from 'src/app/core/services/contact-zoom-meeting.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-zoom-meeting',
  templateUrl: './contact-zoom-meeting.component.html',
  styleUrls: ['./contact-zoom-meeting.component.scss']
})
export class ContactZoomMeetingComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  zoomMeetingUrlFilter = '';
  maxScheduleDateFilter: moment.Moment;
  minScheduleDateFilter: moment.Moment;
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
  contactId: number;

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
      header: 'ContactCompany',
    },
    {
      primaryKey: 'contactZoomCallMeeting.contactName',
      header: 'ContactName',
    },
    {
      primaryKey: 'contactZoomMeetingAppointmentReasonReason',
      header: 'Reason',
    },
    {
      primaryKey: 'contactZoomCallMeeting.scheduleDate',
      header: 'ScheduleDate',
      format: PipeFormat.DATE
    },
    {
      primaryKey: 'meetingTimeSlotsStartTime',
      header: 'ScheduleTime',
    },
    {
      primaryKey: 'userName',
      header: 'Username',
    },
    {
      primaryKey: 'contactZoomMeetingOutputOutput',
      header: 'Output',
    },
    {
      primaryKey: 'contactZoomCallMeeting.zoomMeetingUrl',
      header: 'Meeting Link',
      type:'link'
    },
    {
      primaryKey: 'contactZoomCallMeeting.isActive',
      header: 'Status'
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
    // {
    //   title: 'Edit',
    //   func: (obj) => {
    //     this.showLoader();
    //     this._contactZoomMeetingService.getContactPhoneCallHistoryForEdit(obj.contactPhoneCallHistory.id).then(s => {
    //       this.hideLoader();
    //       this.editPhoneCall = s.result.contactPhoneCallHistory;
    //       this.modalService.open(this.createModal, this.ngbModalOptions);
    //     });
    //   },
    //   icon: '../../../../assets/icons/editIcon.svg'
    // },
    // {
    //   title: 'Delete',
    //   func: (obj) => {
    //     this.onDelete(obj.contactPhoneCallHistory.id);
    //   },
    //   icon: '../../../../assets/icons/deleteIcon.svg'
    // },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService, private route: ActivatedRoute,
    private modalService: NgbModal,
    private _contactZoomMeetingService: ContactZoomMeetingService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'PhonecCallHistory', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._contactZoomMeetingService.getAll(
      this.filterText,
      this.zoomMeetingUrlFilter,
      this.maxScheduleDateFilter === undefined ? this.maxScheduleDateFilter : moment(this.maxScheduleDateFilter).endOf('day'),
      this.minScheduleDateFilter === undefined ? this.minScheduleDateFilter : moment(this.minScheduleDateFilter).startOf('day'),
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

}
