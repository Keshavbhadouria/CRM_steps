import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BugSeverityService, CreateOrEditBugSeverityDto } from 'src/app/core/services/bug-severity.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-bug-severity-modal',
  templateUrl: './create-or-edit-bug-severity-modal.component.html',
  //styleUrls: ['./create-or-edit-bug-severity-modal.component.scss']
})
export class CreateOrEditBugSeverityModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  bugSeverity: CreateOrEditBugSeverityDto;
  loading = false;
  createLoader = false;

  constructor(private _bugSeverityService: BugSeverityService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.bugSeverity = this.data;
    }
    else {
      this.bugSeverity = new CreateOrEditBugSeverityDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.bugSeverity) {
      this._bugSeverityService.createOrEdit(this.bugSeverity).then(res => {
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
