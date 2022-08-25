import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestManagementRoutingModule } from './test-management-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestTypeComponent } from './test-type/test-type.component';
import { CreateOrEditTestTypeModalComponent } from './test-type/create-or-edit-test-type-modal/create-or-edit-test-type-modal.component';
import { ViewTestTypeModalComponent } from './test-type/view-test-type-modal/view-test-type-modal.component';
import { TestTemplatesComponent } from './test-templates/test-templates.component';
import { CreateOrEditTestTemplateModalComponent } from './test-templates/create-or-edit-test-template-modal/create-or-edit-test-template-modal.component';
import { ViewTestTemplateModalComponent } from './test-templates/view-test-template-modal/view-test-template-modal.component';
import { TestTodoListComponent } from './test-todo-list/test-todo-list.component';
import { CreateOrEditTestTodoListModalComponent } from './test-todo-list/create-or-edit-test-todo-list-modal/create-or-edit-test-todo-list-modal.component';
import { ViewTestTodoListModalComponent } from './test-todo-list/view-test-todo-list-modal/view-test-todo-list-modal.component';
import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { CreateOrEditSprintPlanningModalComponent } from './sprint-planning/create-or-edit-sprint-planning-modal/create-or-edit-sprint-planning-modal.component';
import { ViewSprintPlanningModalComponent } from './sprint-planning/view-sprint-planning-modal/view-sprint-planning-modal.component';


@NgModule({
  declarations: [
    TestTypeComponent,
    CreateOrEditTestTypeModalComponent,
    ViewTestTypeModalComponent,
    
    TestTemplatesComponent,
    CreateOrEditTestTemplateModalComponent,
    ViewTestTemplateModalComponent,
    
    TestTodoListComponent,
    CreateOrEditTestTodoListModalComponent,
    ViewTestTodoListModalComponent,
    
    SprintPlanningComponent,
    CreateOrEditSprintPlanningModalComponent,
    ViewSprintPlanningModalComponent
  ],
  imports: [
    CommonModule,
    TestManagementRoutingModule,
    
    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class TestManagementModule { }
