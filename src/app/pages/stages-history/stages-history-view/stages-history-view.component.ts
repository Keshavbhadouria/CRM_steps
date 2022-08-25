import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stages-history-view',
  templateUrl: './stages-history-view.component.html',
  styleUrls: ['./stages-history-view.component.scss']
})
export class StagesHistoryViewComponent implements OnInit {
  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }
}
