import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-test-template-modal',
  templateUrl: './view-test-template-modal.component.html'
  //styleUrls: ['./view-test-template-modal.component.scss']
})
export class ViewTestTemplateModalComponent implements OnInit {

  constructor() { }
  testTypeTodoListTemplate: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.testTypeTodoListTemplate = this.data;
  }

}
