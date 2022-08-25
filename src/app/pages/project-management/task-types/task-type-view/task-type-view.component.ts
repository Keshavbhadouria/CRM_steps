import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { PMTaskTypesServiceProxy } from 'src/app/core/services/task-types.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-type-view',
  templateUrl: './task-type-view.component.html',
  styleUrls: ['./task-type-view.component.scss']
})
export class TaskTypeViewComponent implements OnInit {
  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  pmtaskType: any;
  
  constructor(private _taskTypeService: PMTaskTypesServiceProxy,
    private _messageService: MessageService,
     private modalService: NgbModal) { }

     ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task Type', active: true }];
      if (this.data) {
        this.pmtaskType = this.data;
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
