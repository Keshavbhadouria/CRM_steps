import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { PMTaskStagesServiceProxy } from 'src/app/core/services/task-stages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-stage-view',
  templateUrl: './task-stage-view.component.html',
  styleUrls: ['./task-stage-view.component.scss']
})
export class TaskStageViewComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  pmTaskStage: any;
  
  constructor(private _taskStagesService: PMTaskStagesServiceProxy,
    private _messageService: MessageService,
     private modalService: NgbModal) { }

     ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task Stage', active: true }];
      if (this.data) {
        this.pmTaskStage = this.data;
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
