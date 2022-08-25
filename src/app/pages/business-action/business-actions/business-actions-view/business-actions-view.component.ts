import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-actions-view',
  templateUrl: './business-actions-view.component.html',
  styleUrls: ['./business-actions-view.component.scss']
})
export class BusinessActionsViewComponent implements OnInit {

  constructor() { }
  businessAction: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.businessAction = this.data;
  }
}
