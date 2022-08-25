import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommissionStatusService, CreateOrEditCommissionStatusDto } from 'src/app/core/services/commission-status.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-commission-status-modal',
  templateUrl: './create-or-edit-commission-status-modal.component.html',
  //styleUrls: ['./create-or-edit-commission-status-modal.component.scss']
})
export class CreateOrEditCommissionStatusModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  commissionStatus: CreateOrEditCommissionStatusDto;
  loading = false;
  createLoader = false;

  constructor(private _commissionStatusService: CommissionStatusService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.commissionStatus = this.data;
    }
    else {
      this.commissionStatus = new CreateOrEditCommissionStatusDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.commissionStatus) {
      this._commissionStatusService.createOrEdit(this.commissionStatus).then(res => {
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
