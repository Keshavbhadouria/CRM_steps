import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SMSTrackingRoutingModule } from './smstracking-routing.module';
import { SMSTrackingComponent } from './smstracking/smstracking.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { UIModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [
    SMSTrackingComponent
  ],
  imports: [
    CommonModule,
    SMSTrackingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    NgbDatepickerModule,
    SimplebarAngularModule,
    NgbNavModule,
    SharedModule
  ]
})
export class SMSTrackingModule { }
