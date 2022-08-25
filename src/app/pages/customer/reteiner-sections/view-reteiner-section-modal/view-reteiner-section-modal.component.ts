import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-reteiner-section-modal',
  templateUrl: './view-reteiner-section-modal.component.html',
  //styleUrls: ['./view-reteiner-section-modal.component.scss']
})
export class ViewReteinerSectionModalComponent implements OnInit {

  constructor() { }
  reteinerSection: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.reteinerSection = this.data;
  }

}
