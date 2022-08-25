import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffiliateManagementRoutingModule } from './affiliate-management-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AffiliateTiersComponent } from './affiliate-tiers/affiliate-tiers.component';
import { CreateOrEditAffiliateTierModalComponent } from './affiliate-tiers/create-or-edit-affiliate-tier-modal/create-or-edit-affiliate-tier-modal.component';
import { ViewAffiliateTierModalComponent } from './affiliate-tiers/view-affiliate-tier-modal/view-affiliate-tier-modal.component';
import { AffilitesComponent } from './affilites/affilites.component';
import { CreateOrEditAffiliateModalComponent } from './affilites/create-or-edit-affiliate-modal/create-or-edit-affiliate-modal.component';
import { ViewAffiliateModalComponent } from './affilites/view-affiliate-modal/view-affiliate-modal.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    AffiliateTiersComponent,
    CreateOrEditAffiliateTierModalComponent,
    ViewAffiliateTierModalComponent,
    
    AffilitesComponent,
    CreateOrEditAffiliateModalComponent,
    ViewAffiliateModalComponent,
  ],
  imports: [
    CommonModule,
    AffiliateManagementRoutingModule,
    
    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    TableModule,
    PaginatorModule,
  ]
})
export class AffiliateManagementModule { }
