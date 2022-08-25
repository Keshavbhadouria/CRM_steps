import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardInfoComponent } from './credit-card-info/credit-card-info.component';

const routes: Routes = [
  {
    path: 'creditcardinfo',
    component: CreditCardInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantProfileRoutingModule { }
