import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-kpi-category-modal',
  templateUrl: './view-kpi-category-modal.component.html'
  //styleUrls: ['./view-kpi-category-modal.component.scss']
})
export class ViewKpiCategoryModalComponent implements OnInit {

  constructor() { }
  kPiCategory: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.kPiCategory = this.data;
  }

}
