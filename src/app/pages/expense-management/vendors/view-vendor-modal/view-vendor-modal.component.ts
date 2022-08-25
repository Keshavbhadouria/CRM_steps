import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-vendor-modal',
  templateUrl: './view-vendor-modal.component.html',
  //styleUrls: ['./view-vendor-modal.component.scss']
})
export class ViewVendorModalComponent implements OnInit {

  constructor() { }
  vendor: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.vendor = this.data;
  }

}
