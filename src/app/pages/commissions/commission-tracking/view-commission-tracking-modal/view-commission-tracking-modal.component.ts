import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-commission-tracking-modal',
  templateUrl: './view-commission-tracking-modal.component.html',
  //styleUrls: ['./view-commission-tracking-modal.component.scss']
})
export class ViewCommissionTrackingModalComponent implements OnInit {

  constructor() { }
  commissionTracking: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.commissionTracking = this.data;
  }

}
