import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { TestTemplatesComponent } from './test-templates/test-templates.component';
import { TestTodoListComponent } from './test-todo-list/test-todo-list.component';
import { TestTypeComponent } from './test-type/test-type.component';

const routes: Routes = [
  { path: 'types', component: TestTypeComponent },
  { path: 'templates', component: TestTemplatesComponent },
  { path: 'todolist', component: TestTodoListComponent },
  { path: 'storyestimationvotes', component: SprintPlanningComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestManagementRoutingModule { }
