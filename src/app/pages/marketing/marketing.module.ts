import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { CampaignObjectivesComponent } from './campaign-objectives/campaign-objectives.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignsCreateEditComponent } from './campaigns/campaigns-create-edit/campaigns-create-edit.component';
import { CampaignsViewComponent } from './campaigns/campaigns-view/campaigns-view.component';
import { CampaignObjectiveCreateEditComponent } from './campaign-objectives/campaign-objective-create-edit/campaign-objective-create-edit.component';
import { CampaignObjectivesViewComponent } from './campaign-objectives/campaign-objectives-view/campaign-objectives-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    CampaignObjectivesComponent,
    CampaignsComponent,
    CampaignsCreateEditComponent,
    CampaignsViewComponent,
    CampaignObjectiveCreateEditComponent,
    CampaignObjectivesViewComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    TableModule,
    PaginatorModule
  ]
})
export class MarketingModule { }
