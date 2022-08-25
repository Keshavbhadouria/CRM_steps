import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-template-view',
  templateUrl: './invoice-template-view.component.html',
  styleUrls: ['./invoice-template-view.component.scss']
})
export class InvoiceTemplateViewComponent implements OnInit {


  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }

}
