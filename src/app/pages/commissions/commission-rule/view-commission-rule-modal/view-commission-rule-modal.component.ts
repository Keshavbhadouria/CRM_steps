import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-commission-rule-modal',
  templateUrl: './view-commission-rule-modal.component.html',
  //styleUrls: ['./view-commission-rule-modal.component.scss']
})
export class ViewCommissionRuleModalComponent implements OnInit {

  constructor() { }
  commissionRule: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.commissionRule = this.data;
  }

}
