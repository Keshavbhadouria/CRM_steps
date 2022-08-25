import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-push-notification-modal',
  templateUrl: './view-push-notification-modal.component.html',
  //styleUrls: ['./view-push-notification-modal.component.scss']
})
export class ViewPushNotificationModalComponent implements OnInit {

  constructor() { }
  pushNotification: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.pushNotification = this.data;
  }

}
