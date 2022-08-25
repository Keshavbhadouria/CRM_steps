import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactZoomMeetingAppointmentReasonService, CreateOrEditContactZoomMeetingAppointmentReasonDto } from 'src/app/core/services/contact-zoom-meeting-appointment-reason.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-meeting-appointment-reason-modal',
  templateUrl: './create-or-edit-meeting-appointment-reason-modal.component.html',
  //styleUrls: ['./create-or-edit-meeting-appointment-reason-modal.component.scss']
})
export class CreateOrEditMeetingAppointmentReasonModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  appointmentReason: CreateOrEditContactZoomMeetingAppointmentReasonDto;
  loading = false;
  createLoader = false;

  constructor(private _contactZoomMeetingAppoinmentService: ContactZoomMeetingAppointmentReasonService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.appointmentReason = this.data;
    }
    else {
      this.appointmentReason = new CreateOrEditContactZoomMeetingAppointmentReasonDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.appointmentReason) {
      this._contactZoomMeetingAppoinmentService.createOrEdit(this.appointmentReason).then(res => {
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
