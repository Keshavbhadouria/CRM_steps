import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-recurrentjob-modal',
  templateUrl: './view-recurrentjob-modal.component.html',
  //styleUrls: ['./view-recurrentjob-modal.component.scss']
})
export class ViewRecurrentjobModalComponent implements OnInit {

  constructor() { }
  recurrentJob: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.recurrentJob = this.data;
  }

}
