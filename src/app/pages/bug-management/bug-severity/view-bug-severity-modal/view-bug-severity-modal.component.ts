import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-bug-severity-modal',
  templateUrl: './view-bug-severity-modal.component.html',
  //styleUrls: ['./view-bug-severity-modal.component.scss']
})
export class ViewBugSeverityModalComponent implements OnInit {

  constructor() { }
  bugSeverity: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.bugSeverity = this.data;
  }

}
