import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpicStatusComponent } from './epic-status/epic-status.component';
import { EpicComponent } from './epic/epic.component';

const routes: Routes = [
  {
    path: 'status',
    component: EpicStatusComponent
  },
  {
    path: ':projectId',
    component: EpicComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpicRoutingModule { }
