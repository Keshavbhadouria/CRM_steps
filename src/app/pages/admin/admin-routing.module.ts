import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { LanguagesComponent } from './languages/languages.component';
import { PoliciesComponent } from './policies/policies.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { RefundPaymentsReasonsComponent } from './refund-payments-reasons/refund-payments-reasons.component';
import { RolesComponent } from './roles/roles.component';
import { SelectEditionComponent } from './select-edition/select-edition.component';
import { PbxConfigurationComponent } from './settings/pbx-configuration/pbx-configuration.component';
import { TenantSettingsComponent } from './settings/tenant-settings.component';
import { SubscriptionPaymentsComponent } from './subscription-payments/subscription-payments.component';
import { SubscriptionStatusComponent } from './subscription-status/subscription-status.component';
import { BuyComponent } from './subscription/buy/buy.component';
import { PaymentCompletedComponent } from './subscription/payment/payment-completed/payment-completed.component';
import { PaypalPurchaseComponent } from './subscription/payment/paypal-purchase/paypal-purchase.component';
import { StripeCancelPaymentComponent } from './subscription/payment/Stripe/stripe-cancel-payment/stripe-cancel-payment.component';
import { StripePaymentResultComponent } from './subscription/payment/Stripe/stripe-payment-result/stripe-payment-result.component';
import { StripePurchaseComponent } from './subscription/payment/Stripe/stripe-purchase/stripe-purchase.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UpgradeComponent } from './subscription/upgrade/upgrade.component';
import { TargetTitlesComponent } from './target-titles/target-titles.component';
import { TenantsComponent } from './tenants/tenants.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'targetTitles', component: TargetTitlesComponent },
  { path: 'pushNotificationHistories', component: PushNotificationComponent },
  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path:'policies', component: PoliciesComponent},
  { path: 'auditLog', component: AuditLogComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'subscription-payments', component: SubscriptionPaymentsComponent },
  { path: 'select-edition', component: SelectEditionComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'paypal-purchase', component: PaypalPurchaseComponent },
  { path: 'stripe-purchase', component: StripePurchaseComponent },
  { path: 'stripe-payment-result', component: StripePaymentResultComponent },
  { path: 'stripe-cancel-payment', component: StripeCancelPaymentComponent },
  { path: 'payment-completed', component: PaymentCompletedComponent },
  { path: 'tenant', component: TenantsComponent },
  { path: 'tenantSetting', component: TenantSettingsComponent},
  { path: 'subscriptionstatus', component: SubscriptionStatusComponent },
  { path: 'refundreasons', component: RefundPaymentsReasonsComponent },
  { path: 'pbx', component: PbxConfigurationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
