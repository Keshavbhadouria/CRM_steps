import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetainerRoutingModule } from './retainer-routing.module';
import { ContractTemplateNameComponent } from './contract-template-name/contract-template-name.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewModalComponent } from './contract-template-name/view-modal/view-modal.component';
import { CreateEditModalComponent } from './contract-template-name/create-edit-modal/create-edit-modal.component';
import { CustomerContractTemplateComponent } from './customer-contract-template/customer-contract-template.component';
import { CustomerContractTemplateViewModalComponent } from './customer-contract-template/customer-contract-template-view-modal/customer-contract-template-view-modal.component';
import { CustomerContractTemplateCreateEditModalComponent } from './customer-contract-template/customer-contract-template-create-edit-modal/customer-contract-template-create-edit-modal.component';
import { ContractTemplateDetailsComponent } from './contract-template-details/contract-template-details.component';
import { ContractTemplateDetailsViewModalComponent } from './contract-template-details/contract-template-details-view-modal/contract-template-details-view-modal.component';
import { ContractTemplateDetailsCreateEditModalComponent } from './contract-template-details/contract-template-details-create-edit-modal/contract-template-details-create-edit-modal.component';
import { NewRetainerComponent } from './new-retainer/new-retainer.component';
import { RetainerViewModalComponent } from './new-retainer/retainer-view-modal/retainer-view-modal.component';
import { RetainerCreateEditModalComponent } from './new-retainer/retainer-create-edit-modal/retainer-create-edit-modal.component';
import { CustomerContractDetailComponent } from './cutomer-contract-detail/cutomer-contract-detail.component';
import { CustomerContractDetailViewModalComponent } from './cutomer-contract-detail/customer-contract-detail-view-modal/customer-contract-detail-view-modal.component';
import { CustomerContractDetailCreateEditModalComponent } from './cutomer-contract-detail/customer-contract-detail-create-edit-modal/customer-contract-detail-create-edit-modal.component';
import { CustomerContractSignaturesComponent } from './customer-contract-signatures/customer-contract-signatures.component';
import { CustomerContractSignaturesViewModalComponent } from './customer-contract-signatures/customer-contract-signatures-view-modal/customer-contract-signatures-view-modal.component';
import { CustomerContractSignaturesCreateEditModalComponent } from './customer-contract-signatures/customer-contract-signatures-create-edit-modal/customer-contract-signatures-create-edit-modal.component';


@NgModule({
  declarations: [
    ContractTemplateNameComponent,
    ViewModalComponent,
    CreateEditModalComponent,
    CustomerContractTemplateComponent,
    CustomerContractTemplateViewModalComponent,
    CustomerContractTemplateCreateEditModalComponent,
    ContractTemplateDetailsComponent,
    ContractTemplateDetailsViewModalComponent,
    ContractTemplateDetailsCreateEditModalComponent,
    NewRetainerComponent,
    RetainerViewModalComponent,
    RetainerCreateEditModalComponent,
    CustomerContractDetailComponent,
    CustomerContractDetailViewModalComponent,
    CustomerContractDetailCreateEditModalComponent,
    CustomerContractSignaturesComponent,
    CustomerContractSignaturesViewModalComponent,
    CustomerContractSignaturesCreateEditModalComponent,
  ],
  imports: [
    CommonModule,
    RetainerRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class RetainerModule { }
