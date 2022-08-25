import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingsComponent } from './billings/billings.component';
import { ContactBillingsComponent } from './contact-billings/contact-billings.component';
import { ContactDocumentSignatureComponent } from './contact-document-signature/contact-document-signature.component';
import { ContactRevieewComponent } from './contact-revieew/contact-revieew.component';
import { ContactDocumentComponent } from './contacts/contact-view-detail/Components/contact-document/contact-document.component';
import { ContactInvoiceComponent } from './contacts/contact-view-detail/Components/Transactions/contact-invoice/contact-invoice.component';
import { ContactPaymentHistoryComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-history/contact-payment-history.component';
import { ContactPaymentPlanComponent } from './contacts/contact-view-detail/Components/Transactions/contact-payment-plan/contact-payment-plan.component';
import { ContactQuotationComponent } from './contacts/contact-view-detail/Components/Transactions/contact-quotation/contact-quotation.component';

import { ContactViewComponent } from './contacts/contact-view-detail/contact-view/contact-view.component';
import { ContactPDFFormComponent } from './contacts/ContactPDFForms/contact-pdfform/contact-pdfform.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ReteinerSectionsComponent } from './reteiner-sections/reteiner-sections.component';

const routes: Routes = [
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'contactForm',
    component: ContactPDFFormComponent
  },
  {
    path: 'contacts/contactdetail/:contactId/:userId/:name/:phoneno',
    component: ContactViewComponent
  },
  {
    path: 'contactPaymentHistories',
    component: ContactPaymentHistoryComponent
  },
  {
    path: 'billingInfos',
    component: BillingsComponent
  },
  {
    path: 'paymentPlan',
    component: ContactPaymentPlanComponent
  },
  {
    path: 'invoices',
    component: ContactInvoiceComponent
  },
  {
    path: 'contactQuoteHeaders',
    component: ContactQuotationComponent
  },
  {
    path: 'reteinerSectionses',
    component: ReteinerSectionsComponent
  },
  {
    path: 'contactreview',
    component: ContactRevieewComponent
  },
  {
    path: 'contactDocumentSignatures',
    component: ContactDocumentSignatureComponent
  },
  {
    path: 'contactBillings',
    component: ContactBillingsComponent
  },
  {
    path: 'contactDocuments',
    component: ContactDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
