import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lmsform-type-view',
  templateUrl: './lmsform-type-view.component.html',
  styleUrls: ['./lmsform-type-view.component.scss']
})
export class LmsformTypeViewComponent implements OnInit {

  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }

}
