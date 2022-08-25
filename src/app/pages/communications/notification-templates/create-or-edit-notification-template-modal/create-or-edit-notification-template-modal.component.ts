import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditNotificationTemplateDto, NotificationTemplatesService } from 'src/app/core/services/notification-templates.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';

@Component({
  selector: 'app-create-or-edit-notification-template-modal',
  templateUrl: './create-or-edit-notification-template-modal.component.html',
  //styleUrls: ['./create-or-edit-notification-template-modal.component.scss']
})
export class CreateOrEditNotificationTemplateModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  notificationTemplate: CreateOrEditNotificationTemplateDto;
  loading = false;
  createLoader = false;

  notificationEvents: DropdownDto[];

  public editor = ClassicEditor;

  constructor(private _notificationTemplateService: NotificationTemplatesService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.notificationTemplate = this.data;
    }
    else {
      this.notificationTemplate = new CreateOrEditNotificationTemplateDto();
      this.notificationTemplate.body = '';
    }
    this.loadDropDown();
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._notificationTemplateService.getAllNotificationEventForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.notificationEvents = data[0].result;
        }
        this.hideLoader();
      });
  }

  save() {
    this.showCreateEditLoader();
    if (this.notificationTemplate) {
      this._notificationTemplateService.createOrEdit(this.notificationTemplate).then(res => {
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
