import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EpicService } from 'src/app/core/services/epic.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { CreateOrEditPMSprintDto } from 'src/app/core/models/Project/Sprint';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';

@Component({
  selector: 'app-sprint-create-edit-modal',
  templateUrl: './sprint-create-edit-modal.component.html',
  styleUrls: ['./sprint-create-edit-modal.component.scss']
})
export class SprintCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Input() public projectId: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  showMoveToNewStory=false;

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  pmSprint: CreateOrEditPMSprintDto = new CreateOrEditPMSprintDto();

  allOpenSprints:any[];
  allSprintStatus: DropdownDto[];
  allProjects: DropdownDto[];

  public Editor = ClassicEditor;

isEdit=false;

  constructor(private _sprintService: SprintService,  private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Sprint', active: true }];
    if (this.data) {
      this.pmSprint = this.data.pmSprint;
      this.isEdit=true;
    }
    else {
      this.pmSprint = new CreateOrEditPMSprintDto();
      this.pmSprint.project = this.projectId;
      this.pmSprint.description = "";
    }

    this.loadDropDown();
  }

  loadOpenSprints(){

  }

  //#region API Methods




  save() {
    this.showCreateEditLoader();
    if (this.pmSprint) {
if(this.showMoveToNewStory==false)
  this.pmSprint.moveToSprintId=null;

      this._sprintService.createOrEdit(this.pmSprint).then(res => {
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

  sprintStatusChanged(){
    var statusSelected = this.allSprintStatus.filter(element => element.id == this.pmSprint.stage)[0];
    if(statusSelected.displayName=="Close")
      this.showMoveToNewStory=true;
    else
      this.showMoveToNewStory=false;
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._sprintService.getAllPMProjectForLookupTable(null,null,0,2000),
      this._sprintService.getAllPMSprintStatusForTableDropdown(),
    ];

    if(this.isEdit){
      promises.push(this._sprintService.getOpenSprints(this.pmSprint.id));
    }

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          
          this.allProjects = data[0].result.items;
          this.allSprintStatus = data[1].result;

          if(this.isEdit){
            this.allOpenSprints = data[2].result
          }

          if (!this.data){
            this.pmSprint.stage = this.allSprintStatus[0].id;
          }
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
