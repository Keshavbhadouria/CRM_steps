import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityTriggersComponent } from './activity-triggers/activity-triggers.component';
import { ActivityTriggersCreateEditComponent } from './activity-triggers/activity-triggers-create-edit/activity-triggers-create-edit.component';
import { ActivityTriggersViewComponent } from './activity-triggers/activity-triggers-view/activity-triggers-view.component';


@NgModule({
  declarations: [
    ActivityTriggersComponent,
    ActivityTriggersCreateEditComponent,
    ActivityTriggersViewComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class ActivityModule { }
