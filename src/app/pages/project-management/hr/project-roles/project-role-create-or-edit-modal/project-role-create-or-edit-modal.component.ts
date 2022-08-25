import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditPMRoleDto } from 'src/app/core/models/Project/CreateOrEditPMRoles';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectRolesService } from 'src/app/core/services/project-roles.service';

@Component({
  selector: 'app-project-role-create-or-edit-modal',
  templateUrl: './project-role-create-or-edit-modal.component.html',
  styleUrls: ['./project-role-create-or-edit-modal.component.scss']
})
export class ProjectRoleCreateOrEditModalComponent implements OnInit {

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

  pmProjectRoles: CreateOrEditPMRoleDto = new CreateOrEditPMRoleDto();

  constructor(private _projectProjectRolesService: ProjectRolesService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'ProjectRoles' }, { label: 'Create ProjectRoles', active: true }];

    if (this.data) {
      this.pmProjectRoles = this.data;
    }
    else {
      this.pmProjectRoles = new CreateOrEditPMRoleDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.pmProjectRoles) {
      this._projectProjectRolesService.createOrEdit(this.pmProjectRoles).then(res => {
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

