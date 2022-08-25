import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingAppointmentReasonComponent } from './meeting-appointment-reason/meeting-appointment-reason.component';
import { MeetingAvailabilityComponent } from './meeting-availability/meeting-availability.component';
import { MeetingCommentsComponent } from './meeting-comments/meeting-comments.component';
import { MeetingOutputComponent } from './meeting-output/meeting-output.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { ZoomCredentialsComponent } from './zoom-credentials/zoom-credentials.component';

const routes: Routes = [
  { path: 'contactZoomMeetingOutputs', component: MeetingOutputComponent },
  { path: 'contactZoomMeetingAppointmentReasons', component: MeetingAppointmentReasonComponent },
  { path: 'contactZoomCallCommentses', component: MeetingCommentsComponent },
  { path: 'contactZoomCallMeetings', component: MeetingsComponent },
  { path: 'zoomCredentials', component: ZoomCredentialsComponent },
  { path: 'meetingAvailability', component: MeetingAvailabilityComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
