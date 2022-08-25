import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-billing-modal',
  templateUrl: './view-billing-modal.component.html',
  //styleUrls: ['./view-billing-modal.component.scss']
})
export class ViewBillingModalComponent implements OnInit {

  constructor() { }
  viewBilling: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.viewBilling = this.data;
  }
}
