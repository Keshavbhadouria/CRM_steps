import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantProfileRoutingModule } from './tenant-profile-routing.module';
import { CreditCardInfoComponent } from './credit-card-info/credit-card-info.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { CreateOrEditCreditCardModalComponent } from './credit-card-info/create-or-edit-credit-card-modal/create-or-edit-credit-card-modal.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CreditCardInfoComponent,
    CreateOrEditCreditCardModalComponent
  ],
  imports: [
    CommonModule,
    TenantProfileRoutingModule,
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    NgSelectModule
  ]
})
export class TenantProfileModule { }
