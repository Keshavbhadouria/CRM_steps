import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneCallsRoutingModule } from './phone-calls-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhoneCallsComponent } from './phone-calls/phone-calls.component';
import { CreateOrEditPhoneCallModalComponent } from './phone-calls/create-or-edit-phone-call-modal/create-or-edit-phone-call-modal.component';
import { ViewPhoneCallModalComponent } from './phone-calls/view-phone-call-modal/view-phone-call-modal.component';


@NgModule({
  declarations: [
    PhoneCallsComponent,
    CreateOrEditPhoneCallModalComponent,
    ViewPhoneCallModalComponent
  ],
  imports: [
    CommonModule,
    PhoneCallsRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class PhoneCallsModule { }
