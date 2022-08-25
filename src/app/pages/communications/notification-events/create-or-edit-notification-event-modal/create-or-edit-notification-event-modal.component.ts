import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CorporateEventsService, CreateOrEditNotificationEventDto } from 'src/app/core/services/corporate-events.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-notification-event-modal',
  templateUrl: './create-or-edit-notification-event-modal.component.html',
  //styleUrls: ['./create-or-edit-notification-event-modal.component.scss']
})
export class CreateOrEditNotificationEventModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  event: CreateOrEditNotificationEventDto;
  loading = false;
  createLoader = false;

  constructor(private _corporateEventService: CorporateEventsService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.event = this.data;
    }
    else {
      this.event = new CreateOrEditNotificationEventDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.event) {
      this._corporateEventService.createOrEdit(this.event).then(res => {
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
