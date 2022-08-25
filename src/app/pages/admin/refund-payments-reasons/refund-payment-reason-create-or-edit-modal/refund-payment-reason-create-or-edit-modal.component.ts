import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditRefundPaymentReasonDto, RefundPaymentReasonService } from 'src/app/core/services/refund-payment-reason.service';


@Component({
  selector: 'app-refund-payment-reason-create-or-edit-modal',
  templateUrl: './refund-payment-reason-create-or-edit-modal.component.html',
  styleUrls: ['./refund-payment-reason-create-or-edit-modal.component.scss']
})
export class RefundPaymentReasonCreateOrEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;



  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  refundReason: CreateOrEditRefundPaymentReasonDto = new CreateOrEditRefundPaymentReasonDto();

  constructor(private _refundPaymentReasonService: RefundPaymentReasonService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Services' }, { label: 'Create FeeType', active: true }];

    if (this.data) {
      this.refundReason = this.data;
    }
    else {
      this.refundReason = new CreateOrEditRefundPaymentReasonDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.refundReason) {
      this._refundPaymentReasonService.createOrEdit(this.refundReason).then(res => {
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



  //#endregion


  //#region Helper Methods


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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}

