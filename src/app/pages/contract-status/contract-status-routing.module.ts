import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractStatusesComponent } from './contract-statuses/contract-statuses.component';

const routes: Routes = [
  { path: 'contractStatuses', component: ContractStatusesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractStatusRoutingModule { }
