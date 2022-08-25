import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditPMIssueTypeDto, IssueTypeService } from 'src/app/core/services/issue-type.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-issue-type-modal',
  templateUrl: './create-or-edit-issue-type-modal.component.html',
  // styleUrls: ['./create-or-edit-issue-type-modal.component.scss']
})
export class CreateOrEditIssueTypeModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  issueType: CreateOrEditPMIssueTypeDto;
  loading = false;
  createLoader = false;

  constructor(private _issueTypeService: IssueTypeService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.issueType = this.data;
    }
    else {
      this.issueType = new CreateOrEditPMIssueTypeDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.issueType) {
      this._issueTypeService.createOrEdit(this.issueType).then(res => {
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
