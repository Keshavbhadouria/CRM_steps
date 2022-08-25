import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditCollaboratorSkillDto } from 'src/app/core/models/Project/CreateOrEditCollaboratorSkills';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CollaboratorSkillsService } from 'src/app/core/services/collaborator-skills.service';

@Component({
  selector: 'app-collaborators-skills-create-or-edit-modal',
  templateUrl: './collaborators-skills-create-or-edit-modal.component.html',
  styleUrls: ['./collaborators-skills-create-or-edit-modal.component.scss']
})
export class CollaboratorsSkillsCreateOrEditModalComponent implements OnInit {

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

  collaborator: CreateOrEditCollaboratorSkillDto = new CreateOrEditCollaboratorSkillDto();
  allSkills: DropdownDto[];
  allCollaborators: DropdownDto[];
  public Editor = ClassicEditor;



  constructor(private _collaboratorSkillService: CollaboratorSkillsService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Collaborators' }, { label: 'Collaborators List', active: true }];
    this.loadDropDown();

    if (this.data) {
      this.collaborator = this.data.collaboratorSkill;
    }
    else {
      this.collaborator = new CreateOrEditCollaboratorSkillDto();
    }
  }


  //#region API Methods




  save() {
    this.showCreateEditLoader();
    if (this.collaborator) {
      this._collaboratorSkillService.createOrEdit(this.collaborator).then(res => {
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
      this._collaboratorSkillService.getAllCollaboratorForLookupTable(null,null,0,2000),
      this._collaboratorSkillService.getAllSkillForLookupTable(null,null,0,2000),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allCollaborators = data[0]?.result?.items;
          this.allSkills = data[1]?.result.items;
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
