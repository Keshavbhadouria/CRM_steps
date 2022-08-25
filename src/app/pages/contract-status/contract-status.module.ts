import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractStatusRoutingModule } from './contract-status-routing.module';
import { ContractStatusesComponent } from './contract-statuses/contract-statuses.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateOrEditContractStatusModalComponent } from './contract-statuses/create-or-edit-contract-status-modal.component';
import { ViewContractStatusModalComponent } from './contract-statuses/view-contract-status-modal.component';


@NgModule({
  declarations: [
    ContractStatusesComponent,
    CreateOrEditContractStatusModalComponent,
    ViewContractStatusModalComponent
  ],
  imports: [
    CommonModule,
    ContractStatusRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class ContractStatusModule { }
