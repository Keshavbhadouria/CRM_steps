import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditTaskVelocityDto, TaskVelocitiesServiceProxy } from 'src/app/core/services/task-velocity.service';


@Component({
  selector: 'app-task-velocity-create-edit',
  templateUrl: './task-velocity-create-edit.component.html',
  styleUrls: ['./task-velocity-create-edit.component.scss']
})
export class TaskVelocityCreateEditComponent implements OnInit {

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

  pmTaskVelocity: CreateOrEditTaskVelocityDto = new CreateOrEditTaskVelocityDto();

  constructor(private _taskVelocityService: TaskVelocitiesServiceProxy,
     private _messageService: MessageService,
      private modalService: NgbModal) { }

      ngOnInit() {
        this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Create Task Frequency', active: true }];
    
        if (this.data) {
          this.pmTaskVelocity = this.data;
        }
        else {
          this.pmTaskVelocity = new CreateOrEditTaskVelocityDto();
        }
      }
    
    
      //#region API Methods
    
    
      save() {
        this.showCreateEditLoader();
        if (this.pmTaskVelocity) {
          this._taskVelocityService.createOrEdit(this.pmTaskVelocity).then(res => {
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
