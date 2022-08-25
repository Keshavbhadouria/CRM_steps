import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessTypesComponent } from './business-types/business-types.component';
import { BusinessActionsComponent } from './business-actions/business-actions.component';
import { BusinessTypeCreateEditComponent } from './business-types/business-type-create-edit/business-type-create-edit.component';
import { BusinessTypeViewComponent } from './business-types/business-type-view/business-type-view.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusinessActionRoutingModule } from './business-action-routing.module';
import { BusinessActionsCreateEditComponent } from './business-actions/business-actions-create-edit/business-actions-create-edit.component';
import { BusinessActionsViewComponent } from './business-actions/business-actions-view/business-actions-view.component';
import { BusinessActionWorkflowComponent } from './business-action-workflow/business-action-workflow.component';
import { WorkflowCreateOrEditModalComponent } from './business-action-workflow/workflow-create-or-edit-modal/workflow-create-or-edit-modal.component';
import { WorkflowViewModalComponent } from './business-action-workflow/workflow-view-modal/workflow-view-modal.component';
import { BusinessActionTriggersComponent } from './business-action-triggers/business-action-triggers.component';
import { CallBusinessActionEmailApiComponent } from './call-business-action-email-api/call-business-action-email-api.component';



@NgModule({
  declarations: [
    BusinessTypesComponent,
    BusinessActionsComponent,
    BusinessTypeCreateEditComponent,
    BusinessTypeViewComponent,
    BusinessActionsCreateEditComponent,
    BusinessActionsViewComponent,
    BusinessActionWorkflowComponent,
    WorkflowCreateOrEditModalComponent,
    WorkflowViewModalComponent,
    BusinessActionTriggersComponent,
    CallBusinessActionEmailApiComponent
  ],
  imports: [
    CommonModule,
    BusinessActionRoutingModule,
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class BusinessActionModule { }
