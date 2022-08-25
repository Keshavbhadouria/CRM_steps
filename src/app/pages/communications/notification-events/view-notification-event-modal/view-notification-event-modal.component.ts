import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-notification-event-modal',
  templateUrl: './view-notification-event-modal.component.html',
  //styleUrls: ['./view-notification-event-modal.component.scss']
})
export class ViewNotificationEventModalComponent implements OnInit {

  constructor() { }
  notificationEvent: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.notificationEvent = this.data;
  }

}
