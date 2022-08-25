import { Component, DebugElement, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CreateOrEditPMProjectDto, DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-project-create-edit-modal',
  templateUrl: './project-create-edit-modal.component.html',
  styleUrls: ['./project-create-edit-modal.component.scss']
})
export class ProjectCreateEditModalComponent implements OnInit {

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

  pmProject: CreateOrEditPMProjectDto = new CreateOrEditPMProjectDto();

  allPMIndustrys: DropdownDto[];
  allUsers: DropdownDto[];
  allPMTaskPrioritys: DropdownDto[];
  allPMProjectStatuss: DropdownDto[];
  allContact: DropdownDto[];
  public Editor = ClassicEditor;



  constructor(private _projectService: ProjectService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects List', active: true }];
    this.loadDropDown();

    if (this.data) {
      
      this.pmProject = this.data.pmProject;
    }
    else {
      this.pmProject = new CreateOrEditPMProjectDto();
    }
  }


  //#region API Methods




  save() {
    this.showCreateEditLoader();
    if (this.pmProject) {
      this._projectService.createOrEdit(this.pmProject).then(res => {
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
      this._projectService.getAllPMIndustryForTableDropdown(),
      this._projectService.getAllPMProjectStatusForTableDropdown(),
      this._projectService.getAllPMTaskPriorityForTableDropdown(),
      this._projectService.getAllUserForTableDropdown(),
      this._projectService.getAllContactForLookupTable(null, null, 0, 2000),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allPMIndustrys = data[0].result;
          this.allPMProjectStatuss = data[1].result;
          this.allPMTaskPrioritys = data[2].result;
          this.allUsers = data[3].result;
          this.allContact = data[4].result.items;
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

  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pmProject.logo = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageType");
    }
  }


  //#endregion


}
