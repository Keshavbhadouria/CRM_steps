import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TargetTitlesComponent } from './target-titles/target-titles.component';
import { ViewTargetTitleModalComponent } from './target-titles/view-target-title-modal/view-target-title-modal.component';
import { CreateOrEditTargetTitleModalComponent } from './target-titles/create-or-edit-target-title-modal/create-or-edit-target-title-modal.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { CreateOrEditPushNotificationModalComponent } from './push-notification/create-or-edit-push-notification-modal/create-or-edit-push-notification-modal.component';
import { ViewPushNotificationModalComponent } from './push-notification/view-push-notification-modal/view-push-notification-modal.component';
import { UsersComponent } from './users/users.component';
import { CreateOrEditUserModalComponent } from './users/create-or-edit-user-modal/create-or-edit-user-modal.component';
import { TreeModule } from 'primeng/tree';
import { PermissionTreeModalComponent } from './users/permission-tree-modal/permission-tree-modal.component';
import { PermissionTreeComponent } from './users/permission-tree/permission-tree.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RolesComponent } from './roles/roles.component';
import { CreateOrEditRoleModalComponent } from './roles/create-or-edit-role-modal/create-or-edit-role-modal.component';
import { PoliciesComponent } from './policies/policies.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { AuditLogViewComponent } from './audit-log/audit-log-view/audit-log-view.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageCreateEditModalComponent } from './languages/language-create-edit-modal/language-create-edit-modal.component';
import { DropdownModule } from "primeng/dropdown";
import { LanguageTextsComponent } from './languages/language-texts/language-texts.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SelectEditionComponent } from './select-edition/select-edition.component';
import { UpgradeComponent } from './subscription/upgrade/upgrade.component';
import { BuyComponent } from './subscription/buy/buy.component';
import { PaypalPurchaseComponent } from './subscription/payment/paypal-purchase/paypal-purchase.component';
import { StripePurchaseComponent } from './subscription/payment/Stripe/stripe-purchase/stripe-purchase.component';
import { StripeCancelPaymentComponent } from './subscription/payment/Stripe/stripe-cancel-payment/stripe-cancel-payment.component';
import { StripePaymentResultComponent } from './subscription/payment/Stripe/stripe-payment-result/stripe-payment-result.component';
import { PaymentCompletedComponent } from './subscription/payment/payment-completed/payment-completed.component';
import { TenantsComponent } from './tenants/tenants.component';
import {EditionComboComponent} from './edition-combo.component';
import { TenantsCreateEditComponent } from './tenants/tenants-create-edit/tenants-create-edit.component';
import { TenantsUpdateComponent } from './tenants/tenants-update/tenants-update.component';
import { TenantSettingsComponent } from './settings/tenant-settings.component';
import { SubscriptionPaymentsComponent } from './subscription-payments/subscription-payments.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SubscriptionStatusComponent } from './subscription-status/subscription-status.component';

import { CreateOrEditSubscriptionStatusModalComponent } from './subscription-status/create-or-edit-subscription-status-modal/create-or-edit-subscription-status-modal.component';
import { ViewSubscriptionStatusModalComponent } from './subscription-status/view-subscription-status-modal/view-subscription-status-modal.component';
import { SubscriptionPaymentRefundComponent } from './subscription-payments/subscription-payment-refund/subscription-payment-refund.component';
import { RefundPaymentsReasonsComponent } from './refund-payments-reasons/refund-payments-reasons.component';
import { RefundPaymentReasonCreateOrEditModalComponent } from './refund-payments-reasons/refund-payment-reason-create-or-edit-modal/refund-payment-reason-create-or-edit-modal.component';
import { RefundPaymentReasonViewModalComponent } from './refund-payments-reasons/refund-payment-reason-view-modal/refund-payment-reason-view-modal.component';
import { PbxConfigurationComponent } from './settings/pbx-configuration/pbx-configuration.component';
import { PbxConfigurationCreateOrEditModalComponent } from './settings/pbx-configuration/pbx-configuration-create-or-edit-modal/pbx-configuration-create-or-edit-modal.component';
import { PbxConfigurationViewModalComponent } from './settings/pbx-configuration/pbx-configuration-view-modal/pbx-configuration-view-modal.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HrModule } from '../project-management/hr/hr.module';
import { CollaboratorNewUIComponent } from '../project-management/hr/collaborators/collabolator-new/collaborator-new-ui/collaborator-new-ui.component';



@NgModule({
  declarations: [
    TargetTitlesComponent,
    CreateOrEditTargetTitleModalComponent,
    ViewTargetTitleModalComponent,

    PushNotificationComponent,
    CreateOrEditPushNotificationModalComponent,
    ViewPushNotificationModalComponent,

    UsersComponent,
    CreateOrEditUserModalComponent,

    PermissionTreeModalComponent,
    PermissionTreeComponent,


    RolesComponent,
    CreateOrEditRoleModalComponent,
    PoliciesComponent,
    AuditLogComponent,
    AuditLogViewComponent,
    LanguagesComponent,
    LanguageCreateEditModalComponent,
    LanguageTextsComponent,
    SubscriptionComponent,
    SelectEditionComponent,
    UpgradeComponent,
    BuyComponent,
    StripePurchaseComponent,
    PaypalPurchaseComponent,
    StripeCancelPaymentComponent,
    StripePaymentResultComponent,
    PaymentCompletedComponent,
    TenantsComponent,
    EditionComboComponent,
    TenantsCreateEditComponent,
    TenantsUpdateComponent,
    TenantSettingsComponent,
    SubscriptionPaymentsComponent,

    SubscriptionStatusComponent,
    CreateOrEditSubscriptionStatusModalComponent,
    ViewSubscriptionStatusModalComponent,
    SubscriptionPaymentRefundComponent,
    RefundPaymentsReasonsComponent,
    RefundPaymentReasonCreateOrEditModalComponent,
    RefundPaymentReasonViewModalComponent,
    PbxConfigurationComponent,
    PbxConfigurationCreateOrEditModalComponent,
    PbxConfigurationViewModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TreeModule,
    TabsModule.forRoot(),
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    SharedModule,
    AccordionModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    BsDropdownModule,
    HrModule
  ]
})
export class AdminModule { }
