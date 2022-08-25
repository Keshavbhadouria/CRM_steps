import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPMTaskFrequencyDto, PMTaskFrequenciesServiceProxy } from 'src/app/core/services/task-frequencies.service';
import { CreateOrEditPMTaskPriorityDto, PMTaskPrioritiesServiceProxy } from 'src/app/core/services/task-priorities.service';


@Component({
  selector: 'app-task-priority-create-edit',
  templateUrl: './task-priority-create-edit.component.html',
  styleUrls: ['./task-priority-create-edit.component.scss']
})
export class TaskPriorityCreateEditComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  
  totalCount: number = 0;
  projectList: any;

  active = false;
  saving = false;

  pmTaskPriority: CreateOrEditPMTaskPriorityDto = new CreateOrEditPMTaskPriorityDto();

  constructor(private _taskPriorityService: PMTaskPrioritiesServiceProxy,
     private _messageService: MessageService,
      private modalService: NgbModal) { }

      ngOnInit() {
        if (this.data) {
          this.pmTaskPriority = this.data;
        }
        else {
          this.pmTaskPriority = new CreateOrEditPMTaskPriorityDto();
        }
      }
    
    
      //#region API Methods
    
    
      save() {
        this.showCreateEditLoader();
        if (this.pmTaskPriority) {
          this._taskPriorityService.createOrEdit(this.pmTaskPriority).then(res => {
            if (res.success) {
              this.hideCreateEditLoader();
              this.$modalClose.emit(true);
            } else {
              this.hideCreateEditLoader();
              this._messageService.showError("Common.Title.Error", "Messages.ServerError");
            }
          });
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
    
      closeCreateModal(reason?: any) {
        if (reason) {
          this.modalService.dismissAll(reason);
        } else {
          this.modalService.dismissAll();
        }
      }

}
