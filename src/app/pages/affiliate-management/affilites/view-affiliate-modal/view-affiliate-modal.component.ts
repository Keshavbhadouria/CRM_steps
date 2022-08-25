import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-affiliate-modal',
  templateUrl: './view-affiliate-modal.component.html',
  //styleUrls: ['./view-affiliate-modal.component.scss']
})
export class ViewAffiliateModalComponent implements OnInit {

  constructor() { }
  affiliate: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.affiliate = this.data;
  }
}
