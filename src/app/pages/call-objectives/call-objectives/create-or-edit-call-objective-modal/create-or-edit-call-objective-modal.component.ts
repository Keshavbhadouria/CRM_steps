import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CallObjectiveService, CreateOrEditPhoneCallObjetiveDto } from 'src/app/core/services/call-objective.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-call-objective-modal',
  templateUrl: './create-or-edit-call-objective-modal.component.html',
  //styleUrls: ['./create-or-edit-call-objective-modal.component.scss']
})
export class CreateOrEditCallObjectiveModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  callObjective: CreateOrEditPhoneCallObjetiveDto;
  loading = false;
  createLoader = false;

  constructor(private _callObjectiveService: CallObjectiveService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.callObjective = this.data;
    }
    else {
      this.callObjective = new CreateOrEditPhoneCallObjetiveDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.callObjective) {
      this._callObjectiveService.createOrEdit(this.callObjective).then(res => {
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
