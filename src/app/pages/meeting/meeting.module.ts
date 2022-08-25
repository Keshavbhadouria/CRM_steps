import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeetingOutputComponent } from './meeting-output/meeting-output.component';
import { CreateOrEditMeetingOutputModalComponent } from './meeting-output/create-or-edit-meeting-output-modal/create-or-edit-meeting-output-modal.component';
import { ViewMeetingOutputModalComponent } from './meeting-output/view-meeting-output-modal/view-meeting-output-modal.component';
import { MeetingAppointmentReasonComponent } from './meeting-appointment-reason/meeting-appointment-reason.component';
import { CreateOrEditMeetingAppointmentReasonModalComponent } from './meeting-appointment-reason/create-or-edit-meeting-appointment-reason-modal/create-or-edit-meeting-appointment-reason-modal.component';
import { ViewMeetingAppointmentReasonModalComponent } from './meeting-appointment-reason/view-meeting-appointment-reason-modal/view-meeting-appointment-reason-modal.component';
import { MeetingCommentsComponent } from './meeting-comments/meeting-comments.component';
import { CreateOrEditMeetingCommentModalComponent } from './meeting-comments/create-or-edit-meeting-comment-modal/create-or-edit-meeting-comment-modal.component';
import { ViewMeetingCommentModalComponent } from './meeting-comments/view-meeting-comment-modal/view-meeting-comment-modal.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { CreateOrMeetingModalComponent } from './meetings/create-or-meeting-modal/create-or-meeting-modal.component';
import { ViewMeetingModalComponent } from './meetings/view-meeting-modal/view-meeting-modal.component';
import { ZoomCredentialsComponent } from './zoom-credentials/zoom-credentials.component';
import { CreateOrEditZoomCredentialModalComponent } from './zoom-credentials/create-or-edit-zoom-credential-modal/create-or-edit-zoom-credential-modal.component';
import { ViewZoomCredentialModalComponent } from './zoom-credentials/view-zoom-credential-modal/view-zoom-credential-modal.component';
import { MeetingAvailabilityComponent } from './meeting-availability/meeting-availability.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [
    MeetingOutputComponent,
    CreateOrEditMeetingOutputModalComponent,
    ViewMeetingOutputModalComponent,
    MeetingAppointmentReasonComponent,
    CreateOrEditMeetingAppointmentReasonModalComponent,
    ViewMeetingAppointmentReasonModalComponent,
    MeetingCommentsComponent,
    CreateOrEditMeetingCommentModalComponent,
    ViewMeetingCommentModalComponent,
    MeetingsComponent,
    CreateOrMeetingModalComponent,
    ViewMeetingModalComponent,
    ZoomCredentialsComponent,
    CreateOrEditZoomCredentialModalComponent,
    ViewZoomCredentialModalComponent,
    MeetingAvailabilityComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    AccordionModule.forRoot(),

  ]
})
export class MeetingModule { }
