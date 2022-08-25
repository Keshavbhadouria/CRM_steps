import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseTrackingComponent } from './expense-tracking/expense-tracking.component';
import { ExpenseTypesComponent } from './expense-types/expense-types.component';
import { VendorsComponent } from './vendors/vendors.component';

const routes: Routes = [
  { path: 'expensetypes', component: ExpenseTypesComponent },
  { path: 'expensetracking', component: ExpenseTrackingComponent },
  { path: 'vendors', component: VendorsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseManagementRoutingModule { }
