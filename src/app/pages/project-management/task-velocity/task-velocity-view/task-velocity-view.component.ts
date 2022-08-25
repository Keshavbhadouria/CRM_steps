import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { PMTaskFrequenciesServiceProxy } from 'src/app/core/services/task-frequencies.service';
import { TaskVelocitiesServiceProxy } from 'src/app/core/services/task-velocity.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-velocity-view',
  templateUrl: './task-velocity-view.component.html',
  styleUrls: ['./task-velocity-view.component.scss']
})
export class TaskVelocityViewComponent implements OnInit {
  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  pmtaskVelocity: any;
  
  constructor(private _taskFrequenciesService: TaskVelocitiesServiceProxy,
    private _messageService: MessageService,
     private modalService: NgbModal) { }

     ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task Velocity', active: true }];
      if (this.data) {
        this.pmtaskVelocity = this.data;
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
