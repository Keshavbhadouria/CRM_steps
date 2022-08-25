import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailHistoriesRoutingModule } from './email-histories-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailHisotryComponent } from './email-hisotry/email-hisotry.component';
import { CreateOrEditEmailHistoryModalComponent } from './email-hisotry/create-or-edit-email-history-modal/create-or-edit-email-history-modal.component';
import { ViewEmailHistoryModalComponent } from './email-hisotry/view-email-history-modal/view-email-history-modal.component';


@NgModule({
  declarations: [
    EmailHisotryComponent,
    CreateOrEditEmailHistoryModalComponent,
    ViewEmailHistoryModalComponent
  ],
  imports: [
    CommonModule,
    EmailHistoriesRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class EmailHistoriesModule { }
