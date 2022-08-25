import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CallOutcomesService, CreateOrEditContactPhoneCallOutcomeDto } from 'src/app/core/services/call-outcomes.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-call-outcome-modal',
  templateUrl: './create-or-edit-call-outcome-modal.component.html',
  //styleUrls: ['./create-or-edit-call-outcome-modal.component.scss']
})
export class CreateOrEditCallOutcomeModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  callOutcome: CreateOrEditContactPhoneCallOutcomeDto;
  loading = false;
  createLoader = false;

  constructor(private _callOutcomeService: CallOutcomesService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.callOutcome = this.data;
    }
    else {
      this.callOutcome = new CreateOrEditContactPhoneCallOutcomeDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.callOutcome) {
      this._callOutcomeService.createOrEdit(this.callOutcome).then(res => {
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
