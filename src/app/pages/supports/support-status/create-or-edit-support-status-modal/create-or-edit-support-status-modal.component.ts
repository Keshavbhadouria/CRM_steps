import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditHelpDeskStatusDto, SupportStatusService } from 'src/app/core/services/support-status.service';

@Component({
  selector: 'app-create-or-edit-support-status-modal',
  templateUrl: './create-or-edit-support-status-modal.component.html',
  //styleUrls: ['./create-or-edit-support-status-modal.component.scss']
})
export class CreateOrEditSupportStatusModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  supportStatus: CreateOrEditHelpDeskStatusDto;
  loading = false;
  createLoader = false;

  constructor(private _supportStatusService: SupportStatusService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.supportStatus = this.data;
    }
    else {
      this.supportStatus = new CreateOrEditHelpDeskStatusDto();
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.supportStatus) {
      this._supportStatusService.createOrEdit(this.supportStatus).then(res => {
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
