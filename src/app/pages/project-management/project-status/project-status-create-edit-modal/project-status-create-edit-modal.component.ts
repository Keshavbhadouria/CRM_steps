import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditPMProjectStatusDto } from 'src/app/core/models/Project/CreateOrEditPMProjectStatus';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectStatusService } from 'src/app/core/services/project-status.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-status-create-edit-modal',
  templateUrl: './project-status-create-edit-modal.component.html',
  styleUrls: ['./project-status-create-edit-modal.component.scss']
})
export class ProjectStatusCreateEditModalComponent implements OnInit {

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

  pmProjectStatus: CreateOrEditPMProjectStatusDto = new CreateOrEditPMProjectStatusDto();

  constructor(private _projectStatusService: ProjectStatusService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Create Projects Status', active: true }];

    if (this.data) {
      this.pmProjectStatus = this.data;
    }
    else {
      this.pmProjectStatus = new CreateOrEditPMProjectStatusDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.pmProjectStatus) {
      this._projectStatusService.createOrEdit(this.pmProjectStatus).then(res => {
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
