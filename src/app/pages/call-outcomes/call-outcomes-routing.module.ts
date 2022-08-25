import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallOutcomesComponent } from './call-outcomes/call-outcomes.component';

const routes: Routes = [
  { path: '', component: CallOutcomesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallOutcomesRoutingModule { }
