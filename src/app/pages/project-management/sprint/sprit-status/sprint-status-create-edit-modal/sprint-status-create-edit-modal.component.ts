import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SprintStatusService } from 'src/app/core/services/Sprint-status.service';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPMSprintStatusDto } from 'src/app/core/models/Project/Sprint';

@Component({
  selector: 'app-sprint-status-create-edit-modal',
  templateUrl: './sprint-status-create-edit-modal.component.html',
  styleUrls: ['./sprint-status-create-edit-modal.component.scss']
})
export class SprintStatusCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;



  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  SprintStatus: CreateOrEditPMSprintStatusDto = new CreateOrEditPMSprintStatusDto();

  constructor(private _SprintStatusService: SprintStatusService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'Create Sprint Status', active: true }];

    if (this.data) {
      this.SprintStatus = this.data;
    }
    else {
      this.SprintStatus = new CreateOrEditPMSprintStatusDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.SprintStatus) {
      this._SprintStatusService.createOrEdit(this.SprintStatus).then(res => {
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

  //#endregion


}
