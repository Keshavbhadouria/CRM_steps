import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BugStatusService, CreateOrEditBugStatusDto } from 'src/app/core/services/bug-status.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-bug-status-modal',
  templateUrl: './create-or-edit-bug-status-modal.component.html'
  //styleUrls: ['./create-or-edit-bug-status-modal.component.scss']
})
export class CreateOrEditBugStatusModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  bugStatus: CreateOrEditBugStatusDto;
  loading = false;
  createLoader = false;

  constructor(private _bugStatusService: BugStatusService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.bugStatus = this.data;
    }
    else {
      this.bugStatus = new CreateOrEditBugStatusDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.bugStatus) {
      this._bugStatusService.createOrEdit(this.bugStatus).then(res => {
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
