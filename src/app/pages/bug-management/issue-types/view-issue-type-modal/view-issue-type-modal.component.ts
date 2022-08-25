import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-issue-type-modal',
  templateUrl: './view-issue-type-modal.component.html',
  //styleUrls: ['./view-issue-type-modal.component.scss']
})
export class ViewIssueTypeModalComponent implements OnInit {

  constructor() { }
  issueType: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.issueType = this.data;
  }

}
