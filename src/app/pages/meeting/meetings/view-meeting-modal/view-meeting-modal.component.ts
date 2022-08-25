import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-meeting-modal',
  templateUrl: './view-meeting-modal.component.html',
  //styleUrls: ['./view-meeting-modal.component.scss']
})
export class ViewMeetingModalComponent implements OnInit {

  constructor() { }
  meeting: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.meeting = this.data;
  }
}
