import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-business-kpi-modal',
  templateUrl: './view-business-kpi-modal.component.html',
  //styleUrls: ['./view-business-kpi-modal.component.scss']
})
export class ViewBusinessKpiModalComponent implements OnInit {

  constructor() { }
  businessKPI: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.businessKPI = this.data;
  }

}
