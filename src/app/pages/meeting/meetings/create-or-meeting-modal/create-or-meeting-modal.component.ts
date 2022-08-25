import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditContactZoomCallMeetingDto, MeetingsService } from 'src/app/core/services/meetings.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-or-meeting-modal',
  templateUrl: './create-or-meeting-modal.component.html',
  //styleUrls: ['./create-or-meeting-modal.component.scss']
})
export class CreateOrMeetingModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  meeting: CreateOrEditContactZoomCallMeetingDto;
  loading = false;
  createLoader = false;

  contacts: DropdownDto[];
  users: DropdownDto[];
  meetingTimeSlots: DropdownDto[];
  meetingDays: DropdownDto[];
  appointmentReasons: DropdownDto[];
  meetingOutputs: DropdownDto[];

  public editor = ClassicEditor;

  constructor(private _meetingsService: MeetingsService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.meeting = this.data;
    }
    else {
      this.meeting = new CreateOrEditContactZoomCallMeetingDto();
      this.meeting.comments = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._meetingsService.getAllContactForTableDropdown(),
      this._meetingsService.getAllUserForTableDropdown(),
      this._meetingsService.getAllMeetingTimeSlotsForTableDropdown(),
      this._meetingsService.getAllMeetingDaysLookupForTableDropdown(),
      this._meetingsService.getAllContactZoomMeetingAppointmentReasonForTableDropdown(),
      this._meetingsService.getAllContactZoomMeetingOutputForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contacts = data[0].result;
          this.users = data[1].result;
          this.meetingTimeSlots = data[2].result;
          this.meetingDays = data[3].result;
          this.appointmentReasons = data[4].result;
          this.meetingOutputs = data[5].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.meeting) {
      this._meetingsService.createOrEdit(this.meeting).then(res => {
        if (res.success) {
          this.hideCreateEditLoader();
          this.$modalClose.emit(true);
        } else {
          this.hideCreateEditLoader();
          this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
      });
    }

  }
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }
  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
}
