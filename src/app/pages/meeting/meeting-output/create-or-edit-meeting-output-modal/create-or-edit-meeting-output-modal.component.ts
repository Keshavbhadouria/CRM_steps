import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactZoomMeetingOutputsService, CreateOrEditContactZoomMeetingOutputDto } from 'src/app/core/services/contact-zoom-meeting-outputs.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-meeting-output-modal',
  templateUrl: './create-or-edit-meeting-output-modal.component.html',
  //styleUrls: ['./create-or-edit-meeting-output-modal.component.scss']
})
export class CreateOrEditMeetingOutputModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  meetingOutput: CreateOrEditContactZoomMeetingOutputDto;
  loading = false;
  createLoader = false;

  constructor(private _contactZoomMeetingOutputService: ContactZoomMeetingOutputsService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.meetingOutput = this.data;
    }
    else {
      this.meetingOutput = new CreateOrEditContactZoomMeetingOutputDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.meetingOutput) {
      this._contactZoomMeetingOutputService.createOrEdit(this.meetingOutput).then(res => {
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
