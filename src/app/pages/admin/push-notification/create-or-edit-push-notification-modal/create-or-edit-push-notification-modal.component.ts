import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPushNotificationHistoryDto, PushNotificationService } from 'src/app/core/services/push-notification.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-or-edit-push-notification-modal',
  templateUrl: './create-or-edit-push-notification-modal.component.html',
  //styleUrls: ['./create-or-edit-push-notification-modal.component.scss']
})
export class CreateOrEditPushNotificationModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  pushNotification: CreateOrEditPushNotificationHistoryDto;
  loading = false;
  createLoader = false;

  public editor = ClassicEditor;

  constructor(private _pushNotificationService: PushNotificationService,
    private _messageService: MessageService) { }

    ngOnInit(): void {
      if (this.data) {
        this.pushNotification = this.data;
      }
      else {
        this.pushNotification = new CreateOrEditPushNotificationHistoryDto();
        this.pushNotification.body = '';
      }
    }
    save() {
      this.showCreateEditLoader();
      if (this.pushNotification) {
        this._pushNotificationService.createOrEdit(this.pushNotification).then(res => {
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
