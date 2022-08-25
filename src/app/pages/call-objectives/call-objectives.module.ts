import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallObjectivesRoutingModule } from './call-objectives-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CallObjectivesComponent } from './call-objectives/call-objectives.component';
import { CreateOrEditCallObjectiveModalComponent } from './call-objectives/create-or-edit-call-objective-modal/create-or-edit-call-objective-modal.component';
import { ViewCallObjectiveModalComponent } from './call-objectives/view-call-objective-modal/view-call-objective-modal.component';


@NgModule({
  declarations: [
    CallObjectivesComponent,
    CreateOrEditCallObjectiveModalComponent,
    ViewCallObjectiveModalComponent
  ],
  imports: [
    CommonModule,
    CallObjectivesRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class CallObjectivesModule { }
