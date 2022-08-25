import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-zoom-meeting-view-modal',
  templateUrl: './contact-zoom-meeting-view-modal.component.html',
  styleUrls: ['./contact-zoom-meeting-view-modal.component.scss']
})
export class ContactZoomMeetingViewModalComponent implements OnInit {

  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }

}
