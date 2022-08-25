import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-meeting-appointment-reason-modal',
  templateUrl: './view-meeting-appointment-reason-modal.component.html',
  //styleUrls: ['./view-meeting-appointment-reason-modal.component.scss']
})
export class ViewMeetingAppointmentReasonModalComponent implements OnInit {

  constructor() { }
  meetingAppointmentReason: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.meetingAppointmentReason = this.data;
  }

}
