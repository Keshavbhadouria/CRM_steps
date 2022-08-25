import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactCreateEditModalComponent } from './contacts/contact-create-edit-modal/contact-create-edit-modal.component';
import { ContactViewModalComponent } from './contacts/contact-view-modal/contact-view-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ContactViewComponent } from './contacts/contact-view-detail/contact-view/contact-view.component';
import { ContactProfileComponent } from './contacts/contact-view-detail/Components/Profile/contact-profile/contact-profile.component';
import { CreateContactObjectionModelComponent } from './contacts/contact-view-detail/Components/Profile/create-contact-objection-model/create-contact-objection-model.component';
import { CommunicationComponent } from './contacts/contact-view-detail/Components/Communication/communication.component';
import { ContactChatComponent } from './contacts/contact-view-detail/Components/Communication/contact-chat/contact-chat.component';
import { ContactEmailComponent } from './contacts/contact-view-detail/Components/Communication/contact-email/contact-email.component';
import { PreferenceComponent } from './contacts/contact-view-detail/Components/Communication/preference/preference.component';
import { SMSComponent } from './contacts/contact-view-detail/Components/Communication/sms/sms.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ContactEmailCreateEditModalComponent } from './contacts/contact-view-detail/Components/Communication/contact-email/contact-email-create-edit-modal/contact-email-create-edit-modal.component';
import { ContactEmailViewModalComponent } from './contacts/contact-view-detail/Components/Communication/contact-email/contact-email-view-modal/contact-email-view-modal.component';
import { PhoneCallHistoryComponent } from './contacts/contact-view-detail/Components/Communication/phone-call-history/phone-call-history.component';
import { PhoneCallHistoryViewModalComponent } from './contacts/contact-view-detail/Components/Communication/phone-call-history/phone-call-history-view-modal/phone-call-history-view-modal.component';
import { ContactQuestionsComponent } from './contacts/contact-view-detail/Components/Communication/contact-questions/contact-questions.component';
import { ContactQuestionsCreateEditModalComponent } from './contacts/contact-view-detail/Components/Communication/contact-questions/contact-questions-create-edit-modal/contact-questions-create-edit-modal.component';
import { ContactQuestionsViewModalComponent } from './contacts/contact-view-detail/Components/Communication/contact-questions/contact-questions-view-modal/contact-questions-view-modal.component';
import { ContactQuotationComponent } from './contacts/contact-view-detail/Components/Transactions/contact-quotation/contact-quotation.component';
import { ContactInvoiceComponent } from './contacts/contact-view-detail/Components/Transactions/contact-invoice/contact-invoice.component';
import { ContactRetainersComponent } from './contacts/contact-view-detail/Components/Transactions/contact-retainers/contact-retainers.component';
import { ContactPaymentPlanComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-plan/contact-payment-plan.component';
import { ContactPaymentHistoryComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-history/contact-payment-history.component';
import { ContactQuotationViewModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-quotation/contact-quotation-view-modal/contact-quotation-view-modal.component';
import { ContactTransactionsComponent } from './contacts/contact-view-detail/Components/Transactions/transactions.component';
import { ContactInvoiceViewModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-invoice/contact-invoice-view-modal/contact-invoice-view-modal.component';
import { ContactPaymentPlanViewModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-plan/contact-payment-plan-view-modal/contact-payment-plan-view-modal.component';
import { BillingsComponent } from './billings/billings.component';
import { CreateOrEditBillingModalComponent } from './billings/create-or-edit-billing-modal/create-or-edit-billing-modal.component';
import { ViewBillingModalComponent } from './billings/view-billing-modal/view-billing-modal.component';
import { ContactPaymentHistoryViewModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-history/contact-payment-history-view-modal/contact-payment-history-view-modal.component';
import { ContactDocumentComponent } from './contacts/contact-view-detail/Components/contact-document/contact-document.component';
import { ContactDocumentViewModalComponent } from './contacts/contact-view-detail/Components/contact-document/contact-document-view-modal/contact-document-view-modal.component';
import { ContactRetainerViewModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-retainers/contact-retainer-view-modal/contact-retainer-view-modal.component';
import { ContactTaskComponent } from './contacts/contact-view-detail/Components/Task/contact-task/contact-task.component';
import { ContactZoomMeetingComponent } from './contacts/contact-view-detail/Components/Communication/contact-zoom-meeting/contact-zoom-meeting.component';
import { ContactZoomMeetingViewModalComponent } from './contacts/contact-view-detail/Components/Communication/contact-zoom-meeting/contact-zoom-meeting-view-modal/contact-zoom-meeting-view-modal.component';
import { CreateOrEditContactPaymentHistoryModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-history/create-or-edit-contact-payment-history-modal/create-or-edit-contact-payment-history-modal.component';
import { CreateOrEditContactPaymentPlanModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-plan/create-or-edit-contact-payment-plan-modal/create-or-edit-contact-payment-plan-modal.component';
import { CreateOrEditContactInvoiceModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-invoice/create-or-edit-contact-invoice-modal/create-or-edit-contact-invoice-modal.component';
import { CreateOrEditContactQuotationModalComponent } from './contacts/contact-view-detail/Components/Transactions/contact-quotation/create-or-edit-contact-quotation-modal/create-or-edit-contact-quotation-modal.component';
import { ReteinerSectionsComponent } from './reteiner-sections/reteiner-sections.component';
import { CreateOrEditReteinerSectionModalComponent } from './reteiner-sections/create-or-edit-reteiner-section-modal/create-or-edit-reteiner-section-modal.component';
import { ViewReteinerSectionModalComponent } from './reteiner-sections/view-reteiner-section-modal/view-reteiner-section-modal.component';
import { ProfileComponent } from './contacts/contact-view-detail/Components/Profile/profile/profile.component';
import { ContactProductInterestComponent } from './contacts/contact-view-detail/Components/Profile/contact-product-interest/contact-product-interest.component';
import { ContactRevieewComponent } from './contact-revieew/contact-revieew.component';
import { ContactReviewViewModalComponent } from './contact-revieew/contact-review-view-modal/contact-review-view-modal.component';
import { ContactDocumentSignatureComponent } from './contact-document-signature/contact-document-signature.component';
import { CreateOrEditContactdocumentSignatureModalComponent } from './contact-document-signature/create-or-edit-contactdocument-signature-modal/create-or-edit-contactdocument-signature-modal.component';
import { ViewContactdocumentSignatureModalComponent } from './contact-document-signature/view-contactdocument-signature-modal/view-contactdocument-signature-modal.component';
import { ContactBillingsComponent } from './contact-billings/contact-billings.component';
import { CreateOrEditContactBillingModalComponent } from './contact-billings/create-or-edit-contact-billing-modal/create-or-edit-contact-billing-modal.component';
import { ViewContactBillingModalComponent } from './contact-billings/view-contact-billing-modal/view-contact-billing-modal.component';
import { CreateOrEditContactDocumentModalComponent } from './contacts/contact-view-detail/Components/contact-document/create-or-edit-contact-document-modal/create-or-edit-contact-document-modal.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ContactPaymentRefundComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-history/contact-payment-refund/contact-payment-refund.component';
import { ContactPDFFormComponent } from './contacts/ContactPDFForms/contact-pdfform/contact-pdfform.component';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactCreateEditModalComponent,
    ContactViewModalComponent,
    ContactViewComponent,
    ContactProfileComponent,
    CreateContactObjectionModelComponent,
    CommunicationComponent,
    ContactChatComponent,
    ContactEmailComponent,
    PreferenceComponent,
    SMSComponent,
    ContactEmailCreateEditModalComponent,
    ContactEmailViewModalComponent,
    PhoneCallHistoryComponent,
    PhoneCallHistoryViewModalComponent,
    ContactQuestionsComponent,
    ContactQuestionsCreateEditModalComponent,
    ContactQuestionsViewModalComponent,

    ContactQuotationComponent,
    ContactInvoiceComponent,
    ContactRetainersComponent,
    ContactPaymentPlanComponent,
    ContactPaymentHistoryComponent,
    ContactQuotationViewModalComponent,
    ContactTransactionsComponent,
    ContactInvoiceViewModalComponent,
    ContactPaymentPlanViewModalComponent,

    BillingsComponent,
    CreateOrEditBillingModalComponent,
    ViewBillingModalComponent,
    ContactPaymentHistoryViewModalComponent,
    ContactDocumentComponent,
    ContactDocumentViewModalComponent,
    ContactRetainerViewModalComponent,
    ContactTaskComponent,
    ContactZoomMeetingComponent,
    ContactZoomMeetingViewModalComponent,
    CreateOrEditContactPaymentHistoryModalComponent,
    CreateOrEditContactPaymentPlanModalComponent,
    CreateOrEditContactInvoiceModalComponent,
    CreateOrEditContactQuotationModalComponent,
    ReteinerSectionsComponent,
    CreateOrEditReteinerSectionModalComponent,
    ViewReteinerSectionModalComponent,
    ProfileComponent,
    ContactProductInterestComponent,
    ContactRevieewComponent,
    ContactReviewViewModalComponent,
    ContactDocumentSignatureComponent,
    CreateOrEditContactdocumentSignatureModalComponent,
    ViewContactdocumentSignatureModalComponent,
    ContactBillingsComponent,
    CreateOrEditContactBillingModalComponent,
    ViewContactBillingModalComponent,
    CreateOrEditContactDocumentModalComponent,
    ContactPaymentRefundComponent,
    ContactPDFFormComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    NgbDatepickerModule,
    SimplebarAngularModule,
    NgbNavModule,
    SharedModule,
    TableModule,
    PaginatorModule
  ]
})
export class CustomerModule { }
