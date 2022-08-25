import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CollaboratorsService } from 'src/app/core/services/collaborators.service';
import { CreateOrEditCollaboratorDto } from 'src/app/core/models/Project/CreateOrEditCollaborator';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { PasswordComplexitySetting, UserEditDto, UserRoleDto, UsersService, CreateOrUpdateUserInput } from 'src/app/core/services/users.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-collaborators-create-or-edit-modal',
  templateUrl: './collaborators-create-or-edit-modal.component.html',
  styleUrls: ['./collaborators-create-or-edit-modal.component.scss']
})
export class CollaboratorsCreateOrEditModalComponent implements OnInit {

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
  CollaboratorList: any;

  // Create

  active = false;
  saving = false;

  collaborator: CreateOrEditCollaboratorDto = new CreateOrEditCollaboratorDto();
  allRoles: DropdownDto[];
  public Editor = ClassicEditor;
  allJobDescriptions: any;



  constructor(private _collaboratorService: CollaboratorsService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Collaborators' }, { label: 'Collaborators List', active: true }];
    this.loadDropDown();
    if (this.data) {
      this.collaborator = this.data.collaborator;
    }
    else {
      this.collaborator = new CreateOrEditCollaboratorDto();
    }
  }


  //#region API Methods




  save() {
    this.showCreateEditLoader();
    if (this.collaborator) {
      this._collaboratorService.createOrEdit(this.collaborator).then(res => {
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

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._collaboratorService.getRoles(),
      this._collaboratorService.getAllJobDescriptionForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allRoles = data[0].result;
          this.allJobDescriptions = data[1].result;
        }
        this.hideLoader();
      });
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
