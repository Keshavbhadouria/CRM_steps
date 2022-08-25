import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillingInfoService, CreateOrEditBillingInfoDto } from 'src/app/core/services/billing-info.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-billing-modal',
  templateUrl: './create-or-edit-billing-modal.component.html',
  //styleUrls: ['./create-or-edit-billing-modal.component.scss']
})
export class CreateOrEditBillingModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  billing: CreateOrEditBillingInfoDto;
  loading = false;
  createLoader = false;


  constructor(private _biilingInfoService: BillingInfoService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.billing = this.data;
    }
    else {
      this.billing = new CreateOrEditBillingInfoDto();
    }

  }

  save(): void {
    this.showCreateEditLoader();
    if (this.billing) {
      this._biilingInfoService.createOrEdit(this.billing).then(res => {
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
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
