import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-job-type-modal',
  templateUrl: './view-job-type-modal.component.html',
  //styleUrls: ['./view-job-type-modal.component.scss']
})
export class ViewJobTypeModalComponent implements OnInit {

  constructor() { }
  jobType: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.jobType = this.data;
  }

}
