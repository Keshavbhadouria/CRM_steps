import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppConsts } from 'src/app/core/constants/AppConstants';
import { SubscriptionPaymentType, SubscriptionStartType, EditionPaymentType, EditionSelectDto, SubscriptionPaymentGatewayType, PaymentPeriodType, PaymentGatewayModel, CreatePaymentDto } from 'src/app/core/models/Admin/Subscription';
import { AppSessionService } from 'src/app/core/services/app-session.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { EditionHelperService } from 'src/app/core/services/edition-helper.service';
import { PaymentHelperService } from 'src/app/core/services/payment-helper.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { TenantRegistrationService } from 'src/app/core/services/tenant-registration.service';

@Component({
  selector: 'SelectPaymentPlan',
  templateUrl: './select-paid-plan.component.html',
  styleUrls: ['./select-paid-plan.component.scss']
})
export class SelectPaidPlanComponent implements OnInit {

  @Input() editionId = 0;
  @Input() editionPaymentType: EditionPaymentType;
  @Input() public modal: any;
  @Output() selectedPaymentPeriod = new EventEmitter<object>();

  edition: EditionSelectDto = new EditionSelectDto();
  tenantId: number;
  paymentPeriodType = PaymentPeriodType;
  selectedPaymentPeriodType: PaymentPeriodType;
  subscriptionPaymentGateway = SubscriptionPaymentGatewayType;
  paymentGateways: PaymentGatewayModel[];
  supportsRecurringPayments = false;
  recurringPaymentEnabled = false;

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

    // These Will be Pass From Input Decorator
    // this.editionPaymentType = this._activatedRoute.snapshot.queryParams['editionPaymentType'];
    // this.editionId = this._activatedRoute.snapshot.queryParams['editionId'];
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

  onDone() {
    this.selectedPaymentPeriod.emit({ selectedPaymentPeriodType: this.selectedPaymentPeriodType, recurringPaymentEnabled: this.recurringPaymentEnabled });
    this.modal.close('Close click');
  }


  showMainLoader() {
    this.isLoading = true;
  }

  hideMainLoader() {
    this.isLoading = false;
}

}
