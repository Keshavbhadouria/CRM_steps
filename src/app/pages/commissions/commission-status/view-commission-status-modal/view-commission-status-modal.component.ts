import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-commission-status-modal',
  templateUrl: './view-commission-status-modal.component.html',
  //styleUrls: ['./view-commission-status-modal.component.scss']
})
export class ViewCommissionStatusModalComponent implements OnInit {

  constructor() { }
  commissionStatus: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.commissionStatus = this.data;
  }

}
