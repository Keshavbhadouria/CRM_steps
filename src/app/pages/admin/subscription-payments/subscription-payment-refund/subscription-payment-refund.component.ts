import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { error } from 'console';
import { RefundPaymentDto } from 'src/app/core/models/Admin/Subscription';
import { MessageService } from 'src/app/core/services/message.service';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-subscription-payment-refund',
  templateUrl: './subscription-payment-refund.component.html',
  styleUrls: ['./subscription-payment-refund.component.scss']
})
export class SubscriptionPaymentRefundComponent implements OnInit {

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

  constructor(private paymentService: PaymentService, private _messageService: MessageService) {
    paymentService.getRefundReasons().then(res => {
      this.reasons = res.result;
    });
  }

  ngOnInit(): void {
    if (this.data.externalPaymentId) {
      this.refundPayment.ExternalPaymentId = this.data.externalPaymentId;
    }
    else {

    }
  }


  save() {
    if (!this.refundPayment.RefundPaymentReasonId)
      return this._messageService.showError('Error', 'Please select refund reason!');
    if (!this.refundPayment.RefundComments)
     return this._messageService.showError('Error', 'Please write refund comments!');
    if (!this.refundPayment.RefundPaymentReasonId)
     return this._messageService.showError('Error', 'Amount is not paid yet, you cannot refund!');

    this.showLoader();
    this.paymentService.refundPayment(this.refundPayment).subscribe((res: any) => {
      if (res.success) {
        this.$modalClose.emit(true);
      } else {
        this._messageService.showError('Error', res.error.message);
      }
      this.hideLoader();
    }),
      (error) => {
        this._messageService.showError('Error', error.error.message);
        this.hideLoader();
      }
  }


  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
}
