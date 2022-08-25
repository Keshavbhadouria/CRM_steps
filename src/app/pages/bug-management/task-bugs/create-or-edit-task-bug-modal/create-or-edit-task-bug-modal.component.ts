import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { BugsService, CreateOrEditTaskBugDto } from 'src/app/core/services/bugs.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { ProjectService } from 'src/app/core/services/project.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { PMtasksServiceProxy } from 'src/app/core/services/task.service';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-create-or-edit-task-bug-modal',
  templateUrl: './create-or-edit-task-bug-modal.component.html',
  //styleUrls: ['./create-or-edit-task-bug-modal.component.scss']
})
export class CreateOrEditTaskBugModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Input() public sprintId: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('dueDate') dueDate: ElementRef;
  taskBug: CreateOrEditTaskBugDto;
  loading = false;
  createLoader = false;

  projectNames: DropdownDto[];
  bugStatuses: DropdownDto[];
  users: DropdownDto[];
  tasks: DropdownDto[];
  sprints: DropdownDto[];
  bugSeverities: DropdownDto[];

  public editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _taskBugsService: BugsService,
    private _messageService: MessageService,
    private modalService: NgbModal,
    private _projectService: ProjectService,
    private _pmTeamMemberService: ProjectTeamService,
    private _taskService: PMtasksServiceProxy,
    private _sprintService: SprintService) { }

  ngOnInit(): void {
    if (this.data) {
      this.taskBug = this.data;
      if (this.taskBug.attachment != null && this.taskBug.attachment != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.taskBug.attachment;
      }
    }
    else {
      this.taskBug = new CreateOrEditTaskBugDto();
      this.taskBug.description = '';
      this.isAttachment = false;
      this.imageUrl = '';
      this.taskBug.sprint = this.sprintId;
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._projectService.getAllPMProjectForTableDropDown(this.sprintId),
      this._taskBugsService.getAllBugStatusForTableDropdown(),
      this._taskBugsService.getAllBugSeverityForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.projectNames = data[0].result;

          if(this.sprintId!=0)
            this.taskBug.project = this.projectNames[0].id;
          else
            this.taskBug.project=0;

          this.bugStatuses = data[1].result;
          this.bugSeverities = data[2].result;
        }
        this.hideLoader();
        this.loadDropDownForBugs();
      });
  }

  loadDropDownForBugs(){
    this.showLoader();
    const promises = [
      this._pmTeamMemberService.getAllForDropdownByProject(this.taskBug.project),
      this._taskService.getAllPMTaskDropDown(this.taskBug.project),
      this._sprintService.getAllPMSprintForTableDropDown(this.taskBug.project),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
           this.users = data[0].result;
          this.tasks = data[1].result;
          this.sprints = data[2].result;
        }
        this.hideLoader();
      });
  }

  save(): void {
    this.showCreateEditLoader();
    if (this.taskBug) {
      this._taskBugsService.createOrEdit(this.taskBug).then(res => {
        this.hideCreateEditLoader();
        if (res.success) {
          this.$modalClose.emit(true);
        } else {
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
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.taskBug.attachment = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageType");
    }
  }

  changeImage() {
    this.isAttachment = false;
  }
}
