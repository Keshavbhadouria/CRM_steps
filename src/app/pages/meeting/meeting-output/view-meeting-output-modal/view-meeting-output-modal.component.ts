import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-meeting-output-modal',
  templateUrl: './view-meeting-output-modal.component.html',
  //styleUrls: ['./view-meeting-output-modal.component.scss']
})
export class ViewMeetingOutputModalComponent implements OnInit {

  constructor() { }
  meetingOutput: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.meetingOutput = this.data;
  }
}
