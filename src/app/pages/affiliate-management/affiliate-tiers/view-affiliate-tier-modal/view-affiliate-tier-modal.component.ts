import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-affiliate-tier-modal',
  templateUrl: './view-affiliate-tier-modal.component.html',
  //styleUrls: ['./view-affiliate-tier-modal.component.scss']
})
export class ViewAffiliateTierModalComponent implements OnInit {

  constructor() { }
  affiliateTier: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.affiliateTier = this.data;
  }
}
