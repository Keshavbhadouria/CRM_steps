import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivityTriggersService, CreateOrEditActivityTriggerDto } from 'src/app/core/services/activity-trigger.service';

@Component({
  selector: 'app-activity-triggers-create-edit',
  templateUrl: './activity-triggers-create-edit.component.html',
  styleUrls: ['./activity-triggers-create-edit.component.scss']
})
export class ActivityTriggersCreateEditComponent implements OnInit {
  constructor(private _activityTriggersService: ActivityTriggersService ,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  activityTrigger: CreateOrEditActivityTriggerDto = new CreateOrEditActivityTriggerDto();
  loading = false;
  createLoader = false;
  allCountries = [];

  ngOnInit(): void {
    if (this.data) {
      this.activityTrigger = this.data;
    }
    else {
      this.activityTrigger = new CreateOrEditActivityTriggerDto();
      this.activityTrigger.description='';
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.activityTrigger) {
      this._activityTriggersService.createOrEdit(this.activityTrigger).then(res => {
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

