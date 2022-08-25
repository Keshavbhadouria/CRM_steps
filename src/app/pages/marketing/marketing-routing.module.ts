import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignObjectivesComponent } from './campaign-objectives/campaign-objectives.component';
import { CampaignsComponent } from './campaigns/campaigns.component';

const routes: Routes = [
 { path: "campaignobjectives" , component: CampaignObjectivesComponent},
 { path: "campaigns/:affiliateId" , component: CampaignsComponent},
 { path: "campaigns" , component: CampaignsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
