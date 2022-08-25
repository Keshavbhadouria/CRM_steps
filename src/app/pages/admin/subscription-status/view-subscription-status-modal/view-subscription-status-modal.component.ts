import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-subscription-status-modal',
  templateUrl: './view-subscription-status-modal.component.html',
  //styleUrls: ['./view-subscription-status-modal.component.scss']
})
export class ViewSubscriptionStatusModalComponent implements OnInit {

  constructor() { }
  subscriptionStatus: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.subscriptionStatus = this.data;
  }

}
