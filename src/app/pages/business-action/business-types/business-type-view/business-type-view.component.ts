import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-type-view',
  templateUrl: './business-type-view.component.html',
  styleUrls: ['./business-type-view.component.scss']
})
export class BusinessTypeViewComponent implements OnInit {

  constructor() { }
  businessType: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.businessType = this.data;
  }
}
