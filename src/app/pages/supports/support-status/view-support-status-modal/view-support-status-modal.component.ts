import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-support-status-modal',
  templateUrl: './view-support-status-modal.component.html',
  //styleUrls: ['./view-support-status-modal.component.scss']
})
export class ViewSupportStatusModalComponent implements OnInit {

  constructor() { }
  supportStatus: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.supportStatus = this.data;
  }

}
