import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrEditSupportTicketComponent } from './create-or-edit-support-ticket/create-or-edit-support-ticket.component';
import { SupportCommentsComponent } from './support-comments/support-comments.component';
import { SupportStatusComponent } from './support-status/support-status.component';
import { UserSupportComponent } from './user-support/user-support.component';

const routes: Routes = [
  { path: 'supports', component: UserSupportComponent },
  { path: 'supportticketcomments', component: SupportCommentsComponent },
  { path: 'supportstatuses', component: SupportStatusComponent },
  { path: 'supportTicket/:id', component: CreateOrEditSupportTicketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportsRoutingModule { }
