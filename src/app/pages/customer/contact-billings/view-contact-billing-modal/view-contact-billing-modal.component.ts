import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-contact-billing-modal',
  templateUrl: './view-contact-billing-modal.component.html',
  //styleUrls: ['./view-contact-billing-modal.component.scss']
})
export class ViewContactBillingModalComponent implements OnInit {

  constructor() { }
  viewContactBilling: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.viewContactBilling = this.data;
  }
}
