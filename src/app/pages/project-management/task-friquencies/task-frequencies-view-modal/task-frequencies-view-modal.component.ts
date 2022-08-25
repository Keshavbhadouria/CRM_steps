import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { PMTaskFrequenciesServiceProxy } from 'src/app/core/services/task-frequencies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-frequencies-view-modal',
  templateUrl: './task-frequencies-view-modal.component.html',
  styleUrls: ['./task-frequencies-view-modal.component.scss']
})
export class TaskFrequenciesViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  pmtaskFrequency: any;
  
  constructor(private _taskFrequenciesService: PMTaskFrequenciesServiceProxy,
    private _messageService: MessageService,
     private modalService: NgbModal) { }

     ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task Frequency', active: true }];
      if (this.data) {
        this.pmtaskFrequency = this.data;
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
