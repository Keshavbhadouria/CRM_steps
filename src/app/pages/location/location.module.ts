import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationRoutingModule } from './location-routing.module';
import { CountriesComponent } from './countries/countries.component';
import { StatesComponent } from './states/states.component';
import { CountryCreateEditComponent } from './countries/country-create-edit/country-create-edit.component';
import { CountryViewComponent } from './countries/country-view/country-view.component';
import { StateCreateEditComponent } from './states/state-create-edit/state-create-edit.component';
import { StateViewComponent } from './states/state-view/state-view.component';



@NgModule({
  declarations: [
    CountriesComponent,
    StatesComponent,
    CountryCreateEditComponent,
    CountryViewComponent,
    StateCreateEditComponent,
    StateViewComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class LocationModule { }
