import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditSubscriptionStatusDto, SubscriptionStatusService } from 'src/app/core/services/subscription-status.service';

@Component({
  selector: 'app-create-or-edit-subscription-status-modal',
  templateUrl: './create-or-edit-subscription-status-modal.component.html',
  //styleUrls: ['./create-or-edit-subscription-status-modal.component.scss']
})
export class CreateOrEditSubscriptionStatusModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  subscriptionStatus: CreateOrEditSubscriptionStatusDto;
  loading = false;
  createLoader = false;

  constructor(private _subscriptionStatusService: SubscriptionStatusService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.subscriptionStatus = this.data;
    }
    else {
      this.subscriptionStatus = new CreateOrEditSubscriptionStatusDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.subscriptionStatus) {
      this._subscriptionStatusService.createOrEdit(this.subscriptionStatus).then(res => {
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
