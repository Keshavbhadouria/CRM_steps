import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffiliateTiersComponent } from './affiliate-tiers/affiliate-tiers.component';
import { AffilitesComponent } from './affilites/affilites.component';

const routes: Routes = [
  { path: 'affiliateTiers', component: AffiliateTiersComponent },
  { path: 'affiliates', component: AffilitesComponent },
  { path: 'commissionStatuses', component: AffilitesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffiliateManagementRoutingModule { }
