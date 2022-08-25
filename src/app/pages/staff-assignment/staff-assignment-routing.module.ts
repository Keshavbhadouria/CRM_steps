import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffAssignmentComponent } from './staff-assignment/staff-assignment.component';

const routes: Routes = [
  {
    path: '',
    component: StaffAssignmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffAssignmentRoutingModule { }
