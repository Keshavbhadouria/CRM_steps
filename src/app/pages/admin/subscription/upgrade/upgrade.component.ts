import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConsts } from 'src/app/core/constants/AppConstants';
import { SubscriptionPaymentType, SubscriptionStartType, EditionPaymentType, EditionSelectDto, SubscriptionPaymentGatewayType, PaymentPeriodType, PaymentGatewayModel, PaymentInfoDto, CreatePaymentDto } from 'src/app/core/models/Admin/Subscription';
import { AppSessionService } from 'src/app/core/services/app-session.service';
import { EditionHelperService } from 'src/app/core/services/edition-helper.service';
import { PaymentHelperService } from 'src/app/core/services/payment-helper.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { TenantRegistrationService } from 'src/app/core/services/tenant-registration.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  subscriptionPaymentType: typeof SubscriptionPaymentType = SubscriptionPaymentType;
  subscriptionStartType: typeof SubscriptionStartType = SubscriptionStartType;

  editionPaymentType: EditionPaymentType;
  edition: EditionSelectDto = new EditionSelectDto();
  // tenantId: number = abp.session.tenantId;
  subscriptionPaymentGateway = SubscriptionPaymentGatewayType;

  paymentPeriodType: PaymentPeriodType;
  additionalPrice: number;
  upgradeEditionId;
  editionPaymentTypeCheck: typeof EditionPaymentType = EditionPaymentType;
  paymentGateways: PaymentGatewayModel[];

  showPaymentForm = false;
  isLoading: boolean = false;



  constructor(
    private _router: Router,
    private _paymentHelperService: PaymentHelperService,
    private _activatedRoute: ActivatedRoute,
    public appSession: AppSessionService,
    private _paymentAppService: PaymentService,
    private _tenantRegistrationAppService: TenantRegistrationService,
    private _editionHelperService: EditionHelperService
  ) { }

  ngOnInit(): void {
    this.showMainSpinner();
    this.editionPaymentType = parseInt(this._activatedRoute.snapshot.queryParams['editionPaymentType']);
    this.upgradeEditionId = this._activatedRoute.snapshot.queryParams['upgradeEditionId'];
    if (this.appSession.tenant.edition.isFree) {
      this._tenantRegistrationAppService.getEdition(this.upgradeEditionId)
        .subscribe((resp) => {
          if (this._editionHelperService.isEditionFree(resp.result)) {
            this._paymentAppService.switchBetweenFreeEditions(resp.result.id)
              .subscribe((res) => {
                this.hideMainSpinner();
                this._router.navigate(['admin/subscription']);
              });
          } else {
            this.hideMainSpinner();
            this.redirectToBuy();
          }
        });
      return;
    }
    //edition is not free but there is no previous payment(tenant might be created with paid edition.)
    this._paymentAppService.hasAnyPayment()
      .subscribe(hasPayment => {
        if (!hasPayment) {
          this.hideMainSpinner();
          this.redirectToBuy();
          return;
        }

        this._paymentAppService.getPaymentInfo(this.upgradeEditionId)
          .subscribe((result: any) => {
            this.edition = result.result.edition;
            this.additionalPrice = Number(result.result.additionalPrice.toFixed(2));

            if (this.additionalPrice < AppConsts.MinimumUpgradePaymentAmount) {
              this._paymentAppService.upgradeSubscriptionCostsLessThenMinAmount(this.upgradeEditionId).subscribe(() => {
                this.hideMainSpinner()
                this.showPaymentForm = true;
                this._router.navigate(['app/admin/subscription-management']);
              });
            } else {
              this.hideMainSpinner()
              this.showPaymentForm = true;
            }

          });

        this._paymentAppService.getLastCompletedPayment().subscribe((result : any) => {
          let gateway = new PaymentGatewayModel();
          gateway.gatewayType = (result.result.gateway as any);
          gateway.supportsRecurringPayments = true;

          this.paymentGateways = [gateway];
          this.paymentPeriodType = result.result.paymentPeriodType;

          if (this.appSession.tenant.subscriptionPaymentType === this.subscriptionPaymentType.Manual) {
            this._paymentAppService.getActiveGateways(undefined)
              .subscribe((result: any) => {
                this.paymentGateways = result.result;
              });
          }
        });
      });
  }


  redirectToBuy(): void {
    this._router.navigate(['admin/buy'],
      {
        queryParams: {
          tenantId: this.appSession.tenant.id,
          editionPaymentType: EditionPaymentType.BuyNow,
          editionId: this.upgradeEditionId,
          subscriptionStartType: this.subscriptionStartType.Paid
        }
      });
  }


  checkout(gatewayType) {
    let input = new CreatePaymentDto();
    input.editionId = this.edition.id;
    input.editionPaymentType = ((this.editionPaymentType) as any);
    input.paymentPeriodType = ((this.paymentPeriodType) as any);
    input.recurringPaymentEnabled = this.hasRecurringSubscription();
    input.subscriptionPaymentGatewayType = gatewayType;
    input.successUrl = AppConsts.remoteServiceBaseUrl + '/api/services/app/payment/' + this._paymentHelperService.getEditionPaymentType(this.editionPaymentType) + 'Succeed';
    input.errorUrl = AppConsts.remoteServiceBaseUrl + '/api/services/app/payment/PaymentFailed';

    this._paymentAppService.createPayment(input)
      .subscribe((res: any) => {
        let paymentId = res.result
            this._router.navigate(['account/' + this.getPaymentGatewayType(gatewayType).toLocaleLowerCase() + '-purchase'],
                {
                    queryParams: {
                        paymentId: paymentId,
                        isUpgrade: true,
                        redirectUrl: 'app/admin/subscription-management'
                    }
                });
        });
}

getPaymentGatewayType(gatewayType): string {
    return this._paymentHelperService.getPaymentGatewayType(gatewayType);
}

hasRecurringSubscription(): boolean {
    return this.appSession.tenant.subscriptionPaymentType !== this.subscriptionPaymentType.Manual;
}













  showMainSpinner() {
    this.isLoading = true;
  }

  hideMainSpinner() {
    this.isLoading = false;
  }



}
