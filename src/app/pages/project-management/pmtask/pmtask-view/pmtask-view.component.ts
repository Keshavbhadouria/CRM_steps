import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditPMProjectDto, DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { CreateOrEditPMtaskDto, PMtasksServiceProxy } from 'src/app/core/services/task.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pmtask-view',
  templateUrl: './pmtask-view.component.html',
  styleUrls: ['./pmtask-view.component.scss']
})
export class PmtaskViewComponent implements OnInit {
  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('dueDate') dueDate: ElementRef;

  pmTask: any;
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  allPMProjects: any[];
  allPMSprints: any[];
  allPMStories: any[];
  allUsers: any[];
  allPMTaskPrioritys: any[];
  allPMTaskVelocities: any[];
  allPMTaskTypes: any[];
  allPMTaskFrequiencies: any[];
  


  
  constructor(private _taskService: PMtasksServiceProxy, private _messageService: MessageService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task View', active: true }];

    if (this.data) {
      this.pmTask = this.data;

    }
    else {
      this.pmTask = new CreateOrEditPMtaskDto();
    }
  }


  //#endregion


  //#region Helper Methods


  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  
}
