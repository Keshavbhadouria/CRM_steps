import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-glosary-terms-view',
  templateUrl: './glosary-terms-view.component.html',
  styleUrls: ['./glosary-terms-view.component.scss']
})
export class GlosaryTermsViewComponent implements OnInit {

  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }
}
