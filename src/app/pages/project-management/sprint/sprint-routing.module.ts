import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintTypesComponent } from './sprint-types/sprint-types.component';
import { SprintComponent } from './sprint/sprint.component';
import { SpritStatusComponent } from './sprit-status/sprit-status.component';

const routes: Routes = [
  {
    path: 'status',
    component: SpritStatusComponent
  },
  {
    path: 'types',
    component: SprintTypesComponent
  },
  {
    path: ':projectId',
    component: SprintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
