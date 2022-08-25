import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lmsdisplay-view',
  templateUrl: './lmsdisplay-view.component.html',
  styleUrls: ['./lmsdisplay-view.component.scss']
})
export class LmsdisplayViewComponent implements OnInit {

  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }
}
