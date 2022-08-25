import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallObjectivesComponent } from './call-objectives/call-objectives.component';

const routes: Routes = [
  { path: '', component: CallObjectivesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallObjectivesRoutingModule { }
