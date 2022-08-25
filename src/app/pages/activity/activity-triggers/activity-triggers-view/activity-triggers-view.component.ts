import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-triggers-view',
  templateUrl: './activity-triggers-view.component.html',
  styleUrls: ['./activity-triggers-view.component.scss']
})
export class ActivityTriggersViewComponent implements OnInit {
  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }

}
