import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPMTaskStageDto, PMTaskStagesServiceProxy } from 'src/app/core/services/task-stages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-stage-create-edit',
  templateUrl: './task-stage-create-edit.component.html',
  styleUrls: ['./task-stage-create-edit.component.scss']
})
export class TaskStageCreateEditComponent implements OnInit {

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

  pmTaskStage: CreateOrEditPMTaskStageDto = new CreateOrEditPMTaskStageDto();
  constructor(private _taskStagesService: PMTaskStagesServiceProxy,
    private _messageService: MessageService,
     private modalService: NgbModal) { }

     ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Create Task Stage', active: true }];
    
        if (this.data) {
          this.pmTaskStage = this.data;
        }
        else {
          this.pmTaskStage = new CreateOrEditPMTaskStageDto();
        }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.pmTaskStage) {
        this._taskStagesService.createOrEdit(this.pmTaskStage).then(res => {
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
