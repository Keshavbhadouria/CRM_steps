import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneCallsComponent } from './phone-calls/phone-calls.component';

const routes: Routes = [
  { path: '', component: PhoneCallsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhoneCallsRoutingModule { }
