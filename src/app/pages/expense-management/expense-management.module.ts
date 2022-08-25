import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseManagementRoutingModule } from './expense-management-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseTypesComponent } from './expense-types/expense-types.component';
import { ViewExpenseTypeModalComponent } from './expense-types/view-expense-type-modal/view-expense-type-modal.component';
import { CreateOrEditExpenseTypeModalComponent } from './expense-types/create-or-edit-expense-type-modal/create-or-edit-expense-type-modal.component';
import { ExpenseTrackingComponent } from './expense-tracking/expense-tracking.component';
import { CreateOrEditExpenseTrackingModalComponent } from './expense-tracking/create-or-edit-expense-tracking-modal/create-or-edit-expense-tracking-modal.component';
import { ViewExpenseTrackingModalComponent } from './expense-tracking/view-expense-tracking-modal/view-expense-tracking-modal.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ViewVendorModalComponent } from './vendors/view-vendor-modal/view-vendor-modal.component';
import { CreateOrEditVendorModalComponent } from './vendors/create-or-edit-vendor-modal/create-or-edit-vendor-modal.component';


@NgModule({
  declarations: [
    ExpenseTypesComponent,
    CreateOrEditExpenseTypeModalComponent,
    ViewExpenseTypeModalComponent,
    
    ExpenseTrackingComponent,
    CreateOrEditExpenseTrackingModalComponent,
    ViewExpenseTrackingModalComponent,

    VendorsComponent,
    ViewVendorModalComponent,
    CreateOrEditVendorModalComponent
  ],
  imports: [
    CommonModule,
    ExpenseManagementRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class ExpenseManagementModule { }
