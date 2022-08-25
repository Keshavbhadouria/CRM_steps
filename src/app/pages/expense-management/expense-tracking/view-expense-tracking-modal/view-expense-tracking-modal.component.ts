import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-expense-tracking-modal',
  templateUrl: './view-expense-tracking-modal.component.html',
  //styleUrls: ['./view-expense-tracking-modal.component.scss']
})
export class ViewExpenseTrackingModalComponent implements OnInit {

  constructor() { }
  expenseTracking: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.expenseTracking = this.data;
  }

}
