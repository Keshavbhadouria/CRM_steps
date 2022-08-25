import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SMSTrackingComponent } from './smstracking/smstracking.component';

const routes: Routes = [

  {
    path: '',
    component : SMSTrackingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SMSTrackingRoutingModule { }
