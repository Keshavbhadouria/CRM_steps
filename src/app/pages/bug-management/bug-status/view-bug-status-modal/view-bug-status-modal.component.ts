import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-bug-status-modal',
  templateUrl: './view-bug-status-modal.component.html'
  //styleUrls: ['./view-bug-status-modal.component.scss']
})
export class ViewBugStatusModalComponent implements OnInit {

  constructor() { }
  bugStatus: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.bugStatus = this.data;
  }

}
