import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditSkillDto } from 'src/app/core/models/Project/CreateOrEditSkills';
import { MessageService } from 'src/app/core/services/message.service';
import { SkillsService } from 'src/app/core/services/skills.service';

@Component({
  selector: 'app-skills-create-edit-modal',
  templateUrl: './skills-create-edit-modal.component.html',
  styleUrls: ['./skills-create-edit-modal.component.scss']
})
export class SkillsCreateEditModalComponent implements OnInit {

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

  pmProjectSkills: CreateOrEditSkillDto = new CreateOrEditSkillDto();

  constructor(private _projectSkillsService: SkillsService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Skills' }, { label: 'Create Skills', active: true }];

    if (this.data) {
      this.pmProjectSkills = this.data;
    }
    else {
      this.pmProjectSkills = new CreateOrEditSkillDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.pmProjectSkills) {
      this._projectSkillsService.createOrEdit(this.pmProjectSkills).then(res => {
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

