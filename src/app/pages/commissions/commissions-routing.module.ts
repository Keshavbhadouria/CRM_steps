import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionRuleComponent } from './commission-rule/commission-rule.component';
import { CommissionStatusComponent } from './commission-status/commission-status.component';
import { CommissionTrackingComponent } from './commission-tracking/commission-tracking.component';

const routes: Routes = [
  { path: 'commissionStatuses', component: CommissionStatusComponent },
  { path: 'commissionRules', component: CommissionRuleComponent },
  { path: 'commissionTrackings', component: CommissionTrackingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionsRoutingModule { }
