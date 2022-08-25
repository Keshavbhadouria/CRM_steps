import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-description-view',
  templateUrl: './job-description-view.component.html',
  styleUrls: ['./job-description-view.component.scss']
})
export class JobDescriptionViewComponent implements OnInit {
  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }

}
