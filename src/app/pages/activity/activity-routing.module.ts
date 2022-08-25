import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityTriggersComponent } from './activity-triggers/activity-triggers.component';

const routes: Routes = [
  {
    path: 'activityTriggers',
    component: ActivityTriggersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
