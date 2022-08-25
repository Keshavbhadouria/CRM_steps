import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionsRoutingModule } from './commissions-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommissionStatusComponent } from './commission-status/commission-status.component';
import { CreateOrEditCommissionStatusModalComponent } from './commission-status/create-or-edit-commission-status-modal/create-or-edit-commission-status-modal.component';
import { ViewCommissionStatusModalComponent } from './commission-status/view-commission-status-modal/view-commission-status-modal.component';
import { CommissionRuleComponent } from './commission-rule/commission-rule.component';
import { CreateOrEditCommissionRuleModalComponent } from './commission-rule/create-or-edit-commission-rule-modal/create-or-edit-commission-rule-modal.component';
import { ViewCommissionRuleModalComponent } from './commission-rule/view-commission-rule-modal/view-commission-rule-modal.component';
import { CommissionTrackingComponent } from './commission-tracking/commission-tracking.component';
import { CreateOrEditCommissionTrackingModalComponent } from './commission-tracking/create-or-edit-commission-tracking-modal/create-or-edit-commission-tracking-modal.component';
import { ViewCommissionTrackingModalComponent } from './commission-tracking/view-commission-tracking-modal/view-commission-tracking-modal.component';


@NgModule({
  declarations: [
    CommissionStatusComponent,
    CreateOrEditCommissionStatusModalComponent,
    ViewCommissionStatusModalComponent,

    CommissionRuleComponent,
    CreateOrEditCommissionRuleModalComponent,
    ViewCommissionRuleModalComponent,
    
    CommissionTrackingComponent,
    CreateOrEditCommissionTrackingModalComponent,
    ViewCommissionTrackingModalComponent
  ],
  imports: [
    CommonModule,
    CommissionsRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class CommissionsModule { }
