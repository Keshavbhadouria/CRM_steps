import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-task-bug-modal',
  templateUrl: './view-task-bug-modal.component.html',
  //styleUrls: ['./view-task-bug-modal.component.scss']
})
export class ViewTaskBugModalComponent implements OnInit {

  constructor() { }
  taskBug: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.taskBug = this.data;
  }

}
