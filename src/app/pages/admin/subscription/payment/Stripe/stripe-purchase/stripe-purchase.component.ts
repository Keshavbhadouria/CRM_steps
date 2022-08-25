import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConsts } from 'src/app/core/constants/AppConstants';
import { EditionPaymentType, StripeCreatePaymentSessionInput, SubscriptionPaymentDto, SubscriptionPaymentGatewayType, SubscriptionStartType } from 'src/app/core/models/Admin/Subscription';
import { AppSessionService } from 'src/app/core/services/app-session.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ScriptLoaderService } from 'src/app/core/services/script-loader.service';
import { StripePaymentService } from 'src/app/core/services/stripe-payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stripe-purchase',
  templateUrl: './stripe-purchase.component.html',
  styleUrls: ['./stripe-purchase.component.scss']
})
export class StripePurchaseComponent implements OnInit {
  @Input() editionPaymentType: EditionPaymentType;

  amount = 0;
  description = '';

  subscriptionPayment: SubscriptionPaymentDto;
  stripeIsLoading = true;
  subscriptionPaymentGateway = SubscriptionPaymentGatewayType;
  subscriptionStartType = SubscriptionStartType;

  paymentId;
  successCallbackUrl;
  errorCallbackUrl;

  constructor(
      injector: Injector,
      private _activatedRoute: ActivatedRoute,
      private _stripePaymentAppService: StripePaymentService,
    private _paymentAppService: PaymentService,
    public appSession: AppSessionService,
  ) {

  }

  ngOnInit(): void {

      this.stripeIsLoading = true;
      this.paymentId = this._activatedRoute.snapshot.queryParams['paymentId'];

      new ScriptLoaderService().load('https://js.stripe.com/v3').then(() => {
          this._stripePaymentAppService.getConfiguration()
              .subscribe(
                (res: any) => {
                  let config = res.result;
                      this._stripePaymentAppService.createPaymentSession(new StripeCreatePaymentSessionInput({
                          paymentId: this.paymentId,
                          successUrl: environment.frontEndURL + '/admin/stripe-payment-result',
                          cancelUrl: environment.frontEndURL + '/admin/stripe-cancel-payment'
                      })).subscribe(
                        (res : any) => {
                          let sessionId = res.result;
                              this._paymentAppService.getPayment(this.paymentId)
                                  .subscribe(
                                    (res: any) => {
                                      let result = res.result;
                                          // this.spinnerService.hide();
                                          this.amount = result.amount;
                                          this.description = result.description;
                                          this.successCallbackUrl = result.successUrl;
                                          this.errorCallbackUrl = result.errorUrl;
                                          let stripe = (<any>window).Stripe(config.publishableKey);
                                          let checkoutButton = document.getElementById('stripe-checkout');
                                          checkoutButton.addEventListener('click', function () {
                                              stripe.redirectToCheckout({ sessionId: sessionId });
                                          });

                                          this.stripeIsLoading = false;
                                      },
                                      (err) => {
                                        this.stripeIsLoading = false;
                                      });
                          },
                          (err) => {
                            this.stripeIsLoading = false;
                          }
                      );
                  },
                  (err) => {
                    this.stripeIsLoading = false;
                  });
      }).catch(err => {
        this.stripeIsLoading = false;
      });
  }
}
