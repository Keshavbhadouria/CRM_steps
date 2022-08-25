import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-test-type-modal',
  templateUrl: './view-test-type-modal.component.html'
  //styleUrls: ['./view-test-type-modal.component.scss']
})
export class ViewTestTypeModalComponent implements OnInit {

  constructor() { }
  testType: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.testType = this.data;
  }

}
