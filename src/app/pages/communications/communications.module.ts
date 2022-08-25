import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationsRoutingModule } from './communications-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationEventsComponent } from './notification-events/notification-events.component';
import { CreateOrEditNotificationEventModalComponent } from './notification-events/create-or-edit-notification-event-modal/create-or-edit-notification-event-modal.component';
import { ViewNotificationEventModalComponent } from './notification-events/view-notification-event-modal/view-notification-event-modal.component';
import { NotificationTemplatesComponent } from './notification-templates/notification-templates.component';
import { CreateOrEditNotificationTemplateModalComponent } from './notification-templates/create-or-edit-notification-template-modal/create-or-edit-notification-template-modal.component';
import { ViewNotificationTemplateModalComponent } from './notification-templates/view-notification-template-modal/view-notification-template-modal.component';


@NgModule({
  declarations: [
    NotificationEventsComponent,
    CreateOrEditNotificationEventModalComponent,
    ViewNotificationEventModalComponent,
    
    NotificationTemplatesComponent,
    CreateOrEditNotificationTemplateModalComponent,
    ViewNotificationTemplateModalComponent
  ],
  imports: [
    CommonModule,
    CommunicationsRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class CommunicationsModule { }
