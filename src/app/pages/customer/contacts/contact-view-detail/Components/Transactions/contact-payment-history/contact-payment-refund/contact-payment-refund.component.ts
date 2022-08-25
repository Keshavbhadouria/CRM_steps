import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RefundPaymentDto } from 'src/app/core/models/Admin/Subscription';
import { ContactPaymentHistoriesService } from 'src/app/core/services/contact-payment-histories.service';
import { MessageService } from 'src/app/core/services/message.service';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-contact-payment-refund',
  templateUrl: './contact-payment-refund.component.html',
  styleUrls: ['./contact-payment-refund.component.scss']
})
export class ContactPaymentRefundComponent implements OnInit {

  subscriptionPayment: any;
  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  loading = false;
  createLoader = false;

  reason: number;
  comments: string;
  refundPayment: RefundPaymentDto = new RefundPaymentDto();

  reasons = [];

  constructor(private paymentService: PaymentService,
    private _contactPaymentHistoriesService: ContactPaymentHistoriesService,
    private _messageService: MessageService) {
    paymentService.getRefundReasons().then(res => {
      this.reasons = res.result;
    });
  }

  ngOnInit(): void {
    if (this.data.contactPaymentHistory.externalPaymentId) {
      this.refundPayment.ExternalPaymentId = this.data.contactPaymentHistory.externalPaymentId || "ch_abcd";
    }
    else {

      return this._messageService.showError('Error', 'Amount is not paid yet, you cannot refund!');
    }
  }


  save() {
    if (!this.refundPayment.RefundPaymentReasonId)
      return this._messageService.showError('Error', 'Please select refund reason!');
    if (!this.refundPayment.RefundComments)
     return this._messageService.showError('Error', 'Please write refund comments!');
    if (!this.refundPayment.ExternalPaymentId)
     return this._messageService.showError('Error', 'Amount is not paid yet, you cannot refund!');

    this.showLoader();
    this._contactPaymentHistoriesService.refundPayment(this.refundPayment).subscribe((res: any) => {
      if (res.success) {
        this.$modalClose.emit(true);
      } else {
        this._messageService.showError('Error', res.error.message);
      }
      this.hideLoader();
    },
    (error) => {
      this.hideLoader();
    }
    )
  }


  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
}
