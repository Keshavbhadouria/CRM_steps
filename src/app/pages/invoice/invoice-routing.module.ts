import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceTemplateComponent } from './invoice-template/invoice-template.component';

const routes: Routes = [
  {path: 'invoiceTemplate', component: InvoiceTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
