import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { PMTaskPrioritiesServiceProxy } from 'src/app/core/services/task-priorities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-priority-view',
  templateUrl: './task-priority-view.component.html',
  styleUrls: ['./task-priority-view.component.scss']
})
export class TaskPriorityViewComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  pmtaskPriority: any;
  
  constructor(private _taskFrequenciesService: PMTaskPrioritiesServiceProxy,
    private _messageService: MessageService,
     private modalService: NgbModal) { }

     ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task Frequency', active: true }];
      if (this.data) {
        this.pmtaskPriority = this.data;
      }
    }
  
    closeCreateModal(reason?: any) {
      if (reason) {
        this.modalService.dismissAll(reason);
      } else {
        this.modalService.dismissAll();
      }
    }

}
