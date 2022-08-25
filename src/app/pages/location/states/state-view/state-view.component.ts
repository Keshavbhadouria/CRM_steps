import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-view',
  templateUrl: './state-view.component.html',
  styleUrls: ['./state-view.component.scss']
})
export class StateViewComponent implements OnInit {
  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }
}
