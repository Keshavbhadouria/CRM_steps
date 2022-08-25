import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CreateOrEditPMtaskDto, PMtasksServiceProxy } from 'src/app/core/services/task.service';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { PMTaskFrequenciesServiceProxy } from 'src/app/core/services/task-frequencies.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { StoriesService } from 'src/app/core/services/stories.service';

@Component({
  selector: 'app-pmtask-create-edit',
  templateUrl: './pmtask-create-edit.component.html',
  styleUrls: ['./pmtask-create-edit.component.scss']
})
export class PmtaskCreateEditComponent implements OnInit {
  @Input() public modal: any
  @Input() public data: any
  @Input() public sprintId: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('dueDate') dueDate: ElementRef;

  baseUrl = environment.apiURL + "\\";
  pmTask: CreateOrEditPMtaskDto = new CreateOrEditPMtaskDto();
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  allPMProjects: any[];
  allPMSprints: any[];
  allPMStories: any[];
  allUsers: any[];
  allPMTaskPrioritys: any[];
  allPMTaskVelocities: any[];
  allPMTaskTypes: any[];
  allPMTaskFrequiencies: any[];
  allTask:any[];
  allTaskStage: any [];
  isAttachment:boolean=false;
  dueTimeStr:any;
  projectId: number;
  isMontlyRecurrentTask = false;
  isWeeklyRecurrentTask = false;
  allDays = [];

  public Editor = ClassicEditor;

  constructor(private _taskService: PMtasksServiceProxy, private _messageService: MessageService, private modalService: NgbModal,
    private _pmTeamMemberService: ProjectTeamService, private _projectService:ProjectService,
    private _sprintService: SprintService,
    private _storyService: StoriesService) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task List', active: true }];

    for(var i=1; i<=30; i++){
      var data = {
        id: i,
        displayName:i
      }
      this.allDays.push(data);
    }
    var isNew=false;
    if (this.data) {

      this.pmTask = this.data.pMtask;
    }
    else {
      isNew=true;
      this.pmTask = new CreateOrEditPMtaskDto();
      this.isAttachment = false;
      this.pmTask.acceptanceCriteria = '';
      this.pmTask.summary = '';
      this.pmTask.sprint = this.sprintId;
    }

    this.loadDropDown();

    if (!isNew) {
      this.dueTimeStr = this.pmTask.dueTime.toString();
      this.pmTask.dueTimeStr = this.dueTimeStr.split("T")[1];
      if(this.pmTask.attachment !=null && this.pmTask.attachment != '')
          this.isAttachment = true

      if(this.data.pmTaskFrequencyFrequency.indexOf("Monthly") > -1){
        this.isMontlyRecurrentTask = true;
        this.isWeeklyRecurrentTask = false;
      }
      if(this.data.pmTaskFrequencyFrequency.indexOf("Weekly") > -1){
        this.isWeeklyRecurrentTask = true
        this.isMontlyRecurrentTask = false;
      }

    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.pmTask) {
      // var dateString = "0001-01-01 "+this.dueTimeStr;
      // var createdDate = new Date(dateString);
     // this.pmTask.dueTime = createdDate;
      this._taskService.createOrEdit(this.pmTask).then(res => {
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

  loadDropDown(){
    this.showLoader();
    const promises = [
      this._projectService.getAllPMProjectForTableDropDown(this.sprintId),
      this._taskService.getAllPMTaskPriorityForTableDropDown(),
      this._taskService.getAllTaskVelocityForTableDropdown(),
      this._taskService.getAllPMTaskTypeForTableDropdown(),
      this._taskService.getAllPMTaskFrequencyForTableDropdown(),
      this._taskService.getAllPMTaskStageDropDown()

    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allPMProjects = data[0].result;
          if(this.sprintId!=0)
            this.pmTask.project = this.allPMProjects[0].id;
          else
            this.pmTask.project=0;
          this.allPMTaskPrioritys = data[1].result;
          this.allPMTaskVelocities = data[2].result;
          this.allPMTaskTypes = data[3].result;
          this.allPMTaskFrequiencies = data[4].result;
          this.allTaskStage = data[5].result;
        }
        this.loadDropDownStorySprint();
      });
  }

  loadDropDownStorySprint(){
    this.showLoader();
    const promises = [
      this._sprintService.getAllPMSprintForTableDropDown(this.pmTask.project),
       this._storyService.getAllPMStoryForTableDropDown(this.pmTask.project),
       this._taskService.getAllPMTaskDropDown(this.pmTask.project),
       this._pmTeamMemberService.getAllForDropdownByProject(this.pmTask.project)
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
           this.allPMSprints = data[0].result;
           this.allPMStories = data[1].result;
           this.allTask = data[2].result;
           this.allUsers = data[3].result;
        }
        this.hideLoader();
      });
  }
  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image') || event.target.files[0].type.includes('pdf') || event.target.files[0].type.includes('xlx') || event.target.files[0].type.includes('xlsx')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pmTask.attachment = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImagePDFExcelType");
    }
  }

  changeImage(){
    this.isAttachment = false;
  }
  changeProject(event){
    this.projectId = parseInt(event.id);
    this.loadDropDownStorySprint();
  }
  changeFrequency(event){
    if(event.displayName.indexOf("Weekly") > -1){
      this.isWeeklyRecurrentTask = true;
      this.isMontlyRecurrentTask = false;

    }
    if(event.displayName.indexOf("Monthly") > -1){
      this.isMontlyRecurrentTask = true;
      this.isWeeklyRecurrentTask = false;
    }

  }
}
