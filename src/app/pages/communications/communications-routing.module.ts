import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationEventsComponent } from './notification-events/notification-events.component';
import { NotificationTemplatesComponent } from './notification-templates/notification-templates.component';

const routes: Routes = [
  { path: 'notificationEvents', component: NotificationEventsComponent },
  { path: 'notificationTemplates', component: NotificationTemplatesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationsRoutingModule { }
