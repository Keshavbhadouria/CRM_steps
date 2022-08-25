import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { StatesComponent } from './states/states.component';

const routes: Routes = [
  {
    path: 'countries',
    component: CountriesComponent
  },
  {
    path: 'states',
    component: StatesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
