import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallOutcomesRoutingModule } from './call-outcomes-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CallOutcomesComponent } from './call-outcomes/call-outcomes.component';
import { CreateOrEditCallOutcomeModalComponent } from './call-outcomes/create-or-edit-call-outcome-modal/create-or-edit-call-outcome-modal.component';
import { ViewCallOutcomeModalComponent } from './call-outcomes/view-call-outcome-modal/view-call-outcome-modal.component';


@NgModule({
  declarations: [
    CallOutcomesComponent,
    CreateOrEditCallOutcomeModalComponent,
    ViewCallOutcomeModalComponent
  ],
  imports: [
    CommonModule,
    CallOutcomesRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class CallOutcomesModule { }
