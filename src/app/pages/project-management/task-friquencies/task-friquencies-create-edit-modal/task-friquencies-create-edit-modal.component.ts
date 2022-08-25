import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPMTaskFrequencyDto, PMTaskFrequenciesServiceProxy } from 'src/app/core/services/task-frequencies.service';

@Component({
  selector: 'app-task-friquencies-create-edit-modal',
  templateUrl: './task-friquencies-create-edit-modal.component.html',
  styleUrls: ['./task-friquencies-create-edit-modal.component.scss']
})
export class TaskFriquenciesCreateEditModalComponent implements OnInit {

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

  pmTaskFrequency: CreateOrEditPMTaskFrequencyDto = new CreateOrEditPMTaskFrequencyDto();

  constructor(private _taskFrequenciesService: PMTaskFrequenciesServiceProxy,
     private _messageService: MessageService,
      private modalService: NgbModal) { }

      ngOnInit() {
        this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Create Task Frequency', active: true }];
    
        if (this.data) {
          this.pmTaskFrequency = this.data;
        }
        else {
          this.pmTaskFrequency = new CreateOrEditPMTaskFrequencyDto();
        }
      }
    
    
      //#region API Methods
    
    
      save() {
        this.showCreateEditLoader();
        if (this.pmTaskFrequency) {
          this._taskFrequenciesService.createOrEdit(this.pmTaskFrequency).then(res => {
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
