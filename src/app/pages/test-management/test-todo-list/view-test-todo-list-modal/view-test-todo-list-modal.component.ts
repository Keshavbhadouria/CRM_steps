import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-test-todo-list-modal',
  templateUrl: './view-test-todo-list-modal.component.html'
  //styleUrls: ['./view-test-todo-list-modal.component.scss']
})
export class ViewTestTodoListModalComponent implements OnInit {

  constructor() { }
  testTypeTodoList: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.testTypeTodoList = this.data;
  }

}
