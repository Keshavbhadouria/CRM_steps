import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPMStoryDto, StoriesService } from 'src/app/core/services/stories.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { EpicService } from 'src/app/core/services/epic.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-or-edit-story-modal',
  templateUrl: './create-or-edit-story-modal.component.html'
  //styleUrls: ['./create-or-edit-story-modal.component.scss']
})
export class CreateOrEditStoryModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Input() public sprintId: any;
  @Output() $modalClose = new EventEmitter();
  story: CreateOrEditPMStoryDto;
  loading = false;
  createLoader = false;

  epics: DropdownDto[];
  projects: DropdownDto[];
  sprints: DropdownDto[];
  priorities: DropdownDto[];
  owners: DropdownDto[];
  statuses: DropdownDto[];
  responsibles: DropdownDto[];
  dependentStories: DropdownDto[];

  public description_editor = ClassicEditor;
  public acceptanceCriteria_editor = ClassicEditor;
  @ViewChild('startDate') startDate: ElementRef;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  isAllowToChangeHrAndMin: boolean = false;
  minutesValiMsg = '';

  constructor(private _storiesService: StoriesService,
    private _messageService: MessageService,
    private modalService: NgbModal,
    private _pmTeamMemberService: ProjectTeamService,
    private _projectService: ProjectService,
    private _sprintService: SprintService,
    private _epicService: EpicService,
    private _authService: AuthenticationService) { }

  ngOnInit(): void {
    let userTypeId = this._authService.getLoggedInUser().usertypeId;
    if (userTypeId === 1) { this.isAllowToChangeHrAndMin = true; }
    if (this.data) {
      this.story = this.data;
      if (this.story.attachment != null && this.story.attachment != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.story.attachment;
      }
    }
    else {
      this.story = new CreateOrEditPMStoryDto();
      this.isAttachment = false;
      this.story.description = '';
      this.story.acceptanceCriteria = '';
      this.imageUrl = '';
      this.story.pmSprintId = this.sprintId;
    }
    this.loadDropdownForStory();
  }

  loadDropdownForStory() {
    this.showLoader();
    const promises = [
      this._projectService.getAllPMProjectForTableDropDown(this.story.pmSprintId),
      this._storiesService.getAllPMStoryPriorityForTableDropdown(),
      this._storiesService.getAllPMStoryStatusForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.projects = data[0].result;
          if (this.sprintId != 0)
            this.story.pmProjectId = this.projects[0].id;
          else {
            this.story.pmProjectId = 0;
            this.story.description = '';
            this.story.acceptanceCriteria = '';
          }

          this.priorities = data[1].result;
          this.statuses = data[2].result;
          this.loadDropDownForProject();
        }

        //this.hideLoader();
      });
  }

  loadDropDownForProject() {
    this.showLoader();
    const promises = [
      this._epicService.getAllEpicForTableDropdown(this.story.pmProjectId),
      this._sprintService.getAllPMSprintForTableDropDown(this.story.pmProjectId),
      this._storiesService.getAllPMStoriesForTableDropdown(this.story.pmProjectId, this.story.id),
      this._pmTeamMemberService.getAllForDropdownByProject(this.story.pmProjectId)
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.epics = data[0].result;
          this.sprints = data[1].result;
          this.dependentStories = data[2].result;
          this.owners = data[3].result;
          this.responsibles = data[3].result;
        }
        this.hideLoader();
      });
  }

  onChangeProject(event): void {
    let id = event?.id ?? undefined;

    this.showLoader();
    const promises = [
      this._epicService.getAllEpicForTableDropdown(id),
      this._sprintService.getAllPMSprintForTableDropDown(id),
      this._storiesService.getAllPMStoriesForTableDropdown(this.story.pmProjectId, this.story.id),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.epics = data[0].result;
          this.sprints = data[1].result;
          this.dependentStories = data[2].result;

          this.story.epicId = undefined;
          this.story.pmSprintId = undefined;
          this.story.dependency = undefined;
        }
        this.hideLoader();
      });

  }

  save(): void {
    this.showCreateEditLoader();
    if (this.story) {
      this._storiesService.createOrEdit(this.story).then(res => {
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
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }
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
  handleUpload(event) {
    debugger;
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image') || event.target.files[0].type.includes('pdf') || event.target.files[0].type.includes('xlx') || event.target.files[0].type.includes('xlsx')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.story.attachment = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImagePDFExcelType");
    }
  }

  changeImage() {
    this.isAttachment = false;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  checkMinutesValue(currValue, maxValue: number, form: NgForm, prop : string) {

    if (parseInt(currValue) > maxValue) {
      this.minutesValiMsg = `Minutes can not be greater than ${maxValue}`;
      form.controls[prop].setErrors({ 'incorrect': true });
    }
    else {
      form.controls[prop].setErrors(null);
    }
  }
}
