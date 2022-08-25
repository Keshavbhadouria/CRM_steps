import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportsRoutingModule } from './supports-routing.module';
import { UserSupportComponent } from './user-support/user-support.component';
import { CreateOrEditUserSupportModalComponent } from './user-support/create-or-edit-user-support-modal/create-or-edit-user-support-modal.component';
import { ViewUserSupportModalComponent } from './user-support/view-user-support-modal/view-user-support-modal.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportCommentsComponent } from './support-comments/support-comments.component';
import { CreateOrEditSupportCommentModalComponent } from './support-comments/create-or-edit-support-comment-modal/create-or-edit-support-comment-modal.component';
import { ViewSupportCommentModalComponent } from './support-comments/view-support-comment-modal/view-support-comment-modal.component';
import { SupportStatusComponent } from './support-status/support-status.component';
import { CreateOrEditSupportStatusModalComponent } from './support-status/create-or-edit-support-status-modal/create-or-edit-support-status-modal.component';
import { ViewSupportStatusModalComponent } from './support-status/view-support-status-modal/view-support-status-modal.component';
import { CreateOrEditSupportTicketComponent } from './create-or-edit-support-ticket/create-or-edit-support-ticket.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    UserSupportComponent,
    CreateOrEditUserSupportModalComponent,
    ViewUserSupportModalComponent,
    
    SupportCommentsComponent,
    CreateOrEditSupportCommentModalComponent,
    ViewSupportCommentModalComponent,
    
    SupportStatusComponent,
    CreateOrEditSupportStatusModalComponent,
    ViewSupportStatusModalComponent,
    CreateOrEditSupportTicketComponent
  ],
  imports: [
    CommonModule,
    SupportsRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    TableModule,
    PaginatorModule
  ]
})
export class SupportsModule { }
