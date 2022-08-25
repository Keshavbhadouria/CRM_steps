import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractTemplateDetailsComponent } from './contract-template-details/contract-template-details.component';
import { ContractTemplateNameComponent } from './contract-template-name/contract-template-name.component';
import { CustomerContractSignaturesComponent } from './customer-contract-signatures/customer-contract-signatures.component';
import { CustomerContractTemplateComponent } from './customer-contract-template/customer-contract-template.component';
import { CustomerContractDetailComponent } from './cutomer-contract-detail/cutomer-contract-detail.component';
import { NewRetainerComponent } from './new-retainer/new-retainer.component';

const routes: Routes = [
  {
    path: 'contractTemplateNames',
    component: ContractTemplateNameComponent
  },
  {
    path: 'customercontract/:templateid/:templatename',
    component: CustomerContractTemplateComponent
  },
  {
    path: 'contractdetail/:templateid/:templatename',
    component: ContractTemplateDetailsComponent
  },
  {
    path: 'retainerlist/:templateid/:templatename',
    component: NewRetainerComponent
  },
  {
    path: 'customercontractdetail/:contracttemplateid/:contracttemplatename',
    component: CustomerContractDetailComponent
  },
  {
    path: 'customercontractsignature/:contracttemplateid/:contracttemplatename',
    component: CustomerContractSignaturesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetainerRoutingModule { }
