import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCnameRecord } from 'dns';
import { AppConsts } from 'src/app/core/constants/AppConstants';
import { EditionPaymentType, EditionSelectDto, PaymentPeriodType, SubscriptionPaymentGatewayType, PaymentGatewayModel, CreatePaymentDto } from 'src/app/core/models/Admin/Subscription';
import { AppSessionService } from 'src/app/core/services/app-session.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PaymentHelperService } from 'src/app/core/services/payment-helper.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { TenantRegistrationService } from 'src/app/core/services/tenant-registration.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {


  editionPaymentType: EditionPaymentType;
  edition: EditionSelectDto = new EditionSelectDto();
  tenantId: number;
  paymentPeriodType = PaymentPeriodType;
  selectedPaymentPeriodType: PaymentPeriodType;
  subscriptionPaymentGateway = SubscriptionPaymentGatewayType;
  paymentGateways: PaymentGatewayModel[];
  supportsRecurringPayments = false;
  recurringPaymentEnabled = false;
  editionId = 0;
  isLoading = false;

  constructor(private _authService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _paymnetHelperService: PaymentHelperService,
    private _paymentAppService: PaymentService,
    public appSession: AppSessionService,
    private _tenantRegistrationService: TenantRegistrationService
  ) {
    this.tenantId = this._authService.getTenantId();
   }

  ngOnInit(): void {
    let tenantId = parseInt(this._activatedRoute.snapshot.queryParams['tenantId']);
    // abp.multiTenancy.setTenantIdCookie(tenantId);
    this.editionPaymentType = this._activatedRoute.snapshot.queryParams['editionPaymentType'];
    this.editionId = this._activatedRoute.snapshot.queryParams['editionId'];
    this.showMainLoader()
    this._tenantRegistrationService.getEdition(this.editionId)
      .subscribe((result: any) => {
        this.hideMainLoader();
            this.edition = result.result;
            this.selectedPaymentPeriodType = this._paymnetHelperService.getInitialSelectedPaymentPeriodType(this.edition);
        });

    this._paymentAppService.getActiveGateways(undefined)
      .subscribe((result: any) => {
        this.hideMainLoader();
            this.paymentGateways = result.result;
            this.supportsRecurringPayments = result.result.some((pg) => pg.supportsRecurringPayments);
        });
  }


  checkout(gatewayType) {
    let input = {} as CreatePaymentDto;
    input.editionId = this.editionId;
    input.editionPaymentType = ((this.editionPaymentType) as any);
    input.paymentPeriodType = ((this.selectedPaymentPeriodType) as any);
    input.recurringPaymentEnabled = this.recurringPaymentEnabled;
    input.subscriptionPaymentGatewayType = gatewayType;
    input.successUrl = AppConsts.remoteServiceBaseUrl + '/api/services/app/payment/' + this._paymnetHelperService.getEditionPaymentType(this.editionPaymentType) + 'Succeed';
    input.errorUrl = AppConsts.remoteServiceBaseUrl + '/api/services/app/payment/PaymentFailed';

    this._paymentAppService.createPayment(input)
      .subscribe((res: any) => {
            this._router.navigate(['admin/' + this.getPaymentGatewayType(gatewayType).toLocaleLowerCase() + '-purchase'],
                {
                    queryParams: {
                        paymentId: res.result,
                        redirectUrl: 'account/register-tenant-result'
                    }
                });
        });
}

getPaymentGatewayType(gatewayType): string {
    return this._paymnetHelperService.getPaymentGatewayType(gatewayType);
}

onPaymentPeriodChangeChange(selectedPaymentPeriodType) {
    this.selectedPaymentPeriodType = selectedPaymentPeriodType;
  }


  showMainLoader() {
    this.isLoading = true;
  }

  hideMainLoader() {
    this.isLoading = false;
}

}
