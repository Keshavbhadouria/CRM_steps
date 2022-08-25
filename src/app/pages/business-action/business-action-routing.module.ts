import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessActionTriggersComponent } from './business-action-triggers/business-action-triggers.component';
import { BusinessActionWorkflowComponent } from './business-action-workflow/business-action-workflow.component';
import { BusinessActionsComponent } from './business-actions/business-actions.component';
import { BusinessTypesComponent } from './business-types/business-types.component';
import { CallBusinessActionEmailApiComponent } from './call-business-action-email-api/call-business-action-email-api.component';


const routes: Routes = [
  { path: 'businesstype', component: BusinessTypesComponent },
  { path: 'businessaction', component: BusinessActionsComponent },
  { path: 'businessactionworkflow', component: BusinessActionWorkflowComponent },
  { path: 'businessactiontrigger', component: BusinessActionTriggersComponent },
  { path: 'testemails', component:  CallBusinessActionEmailApiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessActionRoutingModule { }
