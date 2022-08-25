import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-expense-type-modal',
  templateUrl: './view-expense-type-modal.component.html'
  //styleUrls: ['./view-expense-type-modal.component.scss']
})
export class ViewExpenseTypeModalComponent implements OnInit {

  constructor() { }
  expenseType: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.expenseType = this.data;
  }

}
