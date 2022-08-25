import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailHisotryComponent } from './email-hisotry/email-hisotry.component';

const routes: Routes = [
  {path: '', component : EmailHisotryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailHistoriesRoutingModule { }
