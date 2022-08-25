import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlosaryTermsComponent } from './glosary-terms/glosary-terms.component';

const routes: Routes = [
  {
    path: 'glosaryTerms',
    component: GlosaryTermsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class glosaryRoutingModule { }
