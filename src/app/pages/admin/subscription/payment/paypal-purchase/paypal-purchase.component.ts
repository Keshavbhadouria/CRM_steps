import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XmlHttpRequestHelper } from 'src/app/core/helpers/XmlHttpRequestHelper';
import { EditionPaymentType, SubscriptionPaymentGatewayType, SubscriptionPaymentDto, PayPalConfigurationDto } from 'src/app/core/models/Admin/Subscription';
import { AppSessionService } from 'src/app/core/services/app-session.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PaypalPaymentService } from 'src/app/core/services/paypal-payment.service';
import { ScriptLoaderService } from 'src/app/core/services/script-loader.service';
import { TenantRegistrationHelperService } from 'src/app/core/services/tenant-registration-helper.service';

@Component({
  selector: 'app-paypal-purchase',
  templateUrl: './paypal-purchase.component.html',
  styleUrls: ['./paypal-purchase.component.scss']
})
export class PaypalPurchaseComponent implements OnInit {
  @Input() editionPaymentType: EditionPaymentType;

  config: PayPalConfigurationDto;

  paypalIsLoading = true;
  subscriptionPaymentGateway = SubscriptionPaymentGatewayType;

  totalAmount = 0;
  description = '';
  paymentId;
  redirectUrl;
  successCallbackUrl;
  errorCallbackUrl;

  constructor(
      private injector: Injector,
      private _activatedRoute: ActivatedRoute,
      private _payPalPaymentAppService: PaypalPaymentService,
      private _paymentAppService: PaymentService,
    private _router: Router,
    public appSession: AppSessionService,
   private _tenantRegistrationHelper: TenantRegistrationHelperService
  ) {
  }

  ngOnInit(): void {
      this.paymentId = this._activatedRoute.snapshot.queryParams['paymentId'];
      this.redirectUrl = this._activatedRoute.snapshot.queryParams[
          'redirectUrl'
      ];

      this._payPalPaymentAppService
          .getConfiguration()
          .subscribe((res: any) => {
              this.config = res.result;
              new ScriptLoaderService()
                  .load(
                      'https://www.paypal.com/sdk/js?client-id=' +
                      res.result.clientId +
                      '&currency=' +
                      this.appSession.application.currency
                  )
                .then(() => {
                      this._paymentAppService
                          .getPayment(this.paymentId)
                        .subscribe((res: any) => {
                              let result = res.result;
                              this.description = result.description;
                              this.totalAmount = result.amount;
                              this.successCallbackUrl = result.successUrl;
                              this.errorCallbackUrl = result.errorUrl;

                              this.subscriptionPaymentGateway = result.gateway as any;

                              this.paypalIsLoading = false;
                              this.preparePaypalButton();
                          });
                  });
          });
  }

  preparePaypalButton(): void {
      const self = this;
      (<any>window).paypal
          .Buttons({
              createOrder: function (data, actions) {
                  return actions.order.create({
                      purchase_units: [
                          {
                              amount: {
                                  value: self.totalAmount,
                                  currency_code: self.appSession.application.currency
                              }
                          }
                      ]
                  });
              },
              onApprove: function (data, actions) {
                  self._payPalPaymentAppService
                      .confirmPayment(self.paymentId, data.orderID)
                      .subscribe(() => {
                          XmlHttpRequestHelper.ajax(
                              'post',
                              self.successCallbackUrl + (self.successCallbackUrl.includes('?') ? '&' : '?') + 'paymentId=' +
                              self.paymentId,
                              null,
                              null,
                              result => {
                                  if (self._tenantRegistrationHelper.registrationResult) {
                                      self._tenantRegistrationHelper.registrationResult.isActive = true;
                                  }
                                  self._router.navigate([self.redirectUrl]);
                              }
                          );
                      });
              }
          })
          .render('#paypal-button');
  }
}
