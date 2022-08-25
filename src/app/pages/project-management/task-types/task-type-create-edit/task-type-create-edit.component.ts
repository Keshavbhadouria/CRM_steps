import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPMTaskTypeDto, PMTaskTypesServiceProxy } from 'src/app/core/services/task-types.service';

@Component({
  selector: 'app-task-type-create-edit',
  templateUrl: './task-type-create-edit.component.html',
  styleUrls: ['./task-type-create-edit.component.scss']
})
export class TaskTypeCreateEditComponent implements OnInit {

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

  pmTaskType: CreateOrEditPMTaskTypeDto = new CreateOrEditPMTaskTypeDto();

  constructor(private _taskTypeService: PMTaskTypesServiceProxy,
     private _messageService: MessageService,
      private modalService: NgbModal) { }

      ngOnInit() {
    
        if (this.data) {
          this.pmTaskType = this.data;
        }
        else {
          this.pmTaskType = new CreateOrEditPMTaskTypeDto();
        }
      }
    
    
      //#region API Methods
    
    
      save() {
        this.showCreateEditLoader();
        if (this.pmTaskType) {
          this._taskTypeService.createOrEdit(this.pmTaskType).then(res => {
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
