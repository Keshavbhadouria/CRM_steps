import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GetPMTaskboardForViewDto, PMTaskBoardService } from 'src/app/core/services/PMTaskBoard.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditPMtaskDto, TaskStageUpdateDto, PMtasksServiceProxy, UpdateResponsibleDto } from 'src/app/core/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from 'src/app/core/services/sprint.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/core/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pmtask-board',
  templateUrl: './pmtask-board.component.html',
  styleUrls: ['./pmtask-board.component.scss']
})
export class PMTaskBoardComponent implements OnInit {
  distinctResponsibleIds: any[] = [];
  userProfilePics: any[] = [];
  @Input() projectId;
  @Input() sprintId;

  constructor(private _tbService: PMTaskBoardService,
    public modalService: NgbModal,
    private _taskService: PMtasksServiceProxy,
    private route: ActivatedRoute,
    private _sprintService: SprintService,
    private _pmTeamMemberService: ProjectTeamService,
    private _message: MessageService,
    private _ProfileService: ProfileService) { }

  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('viewDetailModal') viewDetailModal: ElementRef;

  loading = false;
  allAvailableStages = [];
  pmTaskStagesData = [];
  ownerId = 0;
  pmProjectId :any;
  projects = [];
  owners = [];
  connectedList = [];
  editTaskData = new CreateOrEditPMtaskDto();
  viewDetail;
  stageUpdateData = new TaskStageUpdateDto();
 // sprintId = 0;
  breadCrumbItems;
  sprintsDetail;
  statusCount;
  filterText = '';
  projectMembers: any[];
  updateResponsibleDto = new UpdateResponsibleDto();
  defaultProfilePic= '/assets/icons/default-user.png';
isGlobal=true;
sprintIntId=0;

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');
    if(this.sprintId==null)
      this.sprintId = environment.emptyGuid;

    this.sprintsDetail = { projectId: environment.emptyGuid };

    if (this.sprintId != environment.emptyGuid){
      this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'Taskboard', active: true }];
      this.getSprintDetail();
    }
    else{
      this.breadCrumbItems = [{ label: 'Taskboard', active: true }];

    this.loadPickListData();
    }
  }

  getSprintDetail() {
    this._sprintService.getSprintForView(this.sprintId).then(res => {
      this.hideLoader();
      if (res.success) {
        this.sprintsDetail = res.result.pmSprint;
        this.sprintIntId = res.result.pmSprint.id;
        this.loadPickListData();
      } else {
        
      }
    })
  }

  loadPickListData() {
    this.showLoader();
    const promises = [
      this._tbService.getAllUserByProjectIdForTaskboard(this.pmProjectId, this.sprintId),
      this._tbService.getAllPMProjectByUserIdForTaskboard(this.ownerId),
      this._tbService.getAll(this.ownerId, this.pmProjectId, this.sprintId, this.filterText, this.getSelectedStages()),
    ];

    if (this.sprintId != environment.emptyGuid){
      promises.push(this._sprintService.getSprintForView(this.sprintId));
      this.isGlobal=false;
    }

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.owners = this.bindListWithDefault(data[0].result);

          this.projects = this.bindListWithDefault(data[1].result)

          var stagesData = data[2];
          stagesData.result.forEach(element => {
            this.connectedList.push("stage" + element.stageId);
          });

          this.statusCount = (stagesData.result.length * 290) + 50;

          var tempData = stagesData.result;

          tempData.forEach(element => {
            element.isChecked = true;
            element.connectedTo = this.getConnectedList("stage" + element.stageId)
          })

          this.allAvailableStages = tempData;
          this.pmTaskStagesData = tempData;

          this.loadProfilePic();
          if (this.sprintId != environment.emptyGuid) {
            this.breadCrumbItems = [{ label: data[3].result.pmProjectProjectName }, { label: data[3].result.pmSprint.sprint }, { label: 'Taskboard', active: true }];

            this.sprintsDetail = data[3].result.pmSprint;

            this.loadResponsiblesData();
          }
          else
            this.sprintsDetail = { projectId: environment.emptyGuid };
        }
        this.hideLoader();
      });
  }

  loadResponsiblesData() {
    this.showLoader();

    const promises = [
      this._pmTeamMemberService.getAllForDropdownByProject(this.sprintsDetail.project),
    ];
    Promise.all(promises)
      .then(data => {
        this.projectMembers = this.bindListWithDefault(data[0].result)

        this.hideLoader();
      });
  }

  bindListWithDefault(source) {
    var items = [];
    items.push({ id: 0, displayName: "-Select-" });
    source.forEach(element => {
      items.push(element);
    });
    return items;
  }

  getSelectedStages() {
    var selectedStages = [];
    this.allAvailableStages.forEach(element => {
      if (element.isChecked)
        selectedStages.push(element.stageId);
    });
    return selectedStages;
  }

  filterRecords() {
    this.loadTaskStagesData();
  }
  loadTaskStagesData() {
    this.showLoader();

    const promises = [
      this._tbService.getAll(this.ownerId, this.pmProjectId, this.sprintId, this.filterText, this.getSelectedStages()),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          data[0].result.forEach(element => {
            this.connectedList.push("stage" + element.stageId);
          });

          var tempData = data[0].result;

          tempData.forEach(element => {
            element.isChecked = true;
            element.connectedTo = this.getConnectedList("stage" + element.stageId)
          })

          this.pmTaskStagesData = tempData;
          this.loadProfilePic();
        }
        this.hideLoader();
      });
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  owner_loadTaskStageData() {
    
    if (this.ownerId == null)
      this.ownerId = 0;

    if (this.pmProjectId == environment.emptyGuid && this.sprintId==0) {
      this.showLoader();
      const promises = [
        this._tbService.getAllPMProjectByUserIdForTaskboard(this.ownerId)
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.projects = this.bindListWithDefault(data[0].result);
          }
          this.hideLoader();
        });
    }

    this.loadTaskStagesData();
  }

  project_loadTaskStageData() {
    if (this.pmProjectId == null)
      this.pmProjectId = 0;

    if (this.ownerId == 0) {
      this.showLoader();
      const promises = [
        this._tbService.getAllUserByProjectIdForTaskboard(this.pmProjectId, this.sprintId)
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.owners = this.bindListWithDefault(data[0].result);
          }
          this.hideLoader();
        });
    }

    this.loadTaskStagesData();
  }

  responsibleChanged(task) {
    this.updateResponsibleDto.id = task.taskId;
    this.updateResponsibleDto.responsible = task.responsibleId;

    this._taskService.updateResponsible(this.updateResponsibleDto).then(res => {
      if (res.success) {

      } else {

      }
    });

  }

  getConnectedList(eleId: string) {
    var listDroppable = this.connectedList.filter(element => element != eleId);
    return listDroppable;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      var newStageId = event.container.id.replace("stage", "");
      var taskId = event.previousContainer.data[event.previousIndex].taskId;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.stageUpdateData.taskId = taskId;
      this.stageUpdateData.stageId = parseInt(newStageId)

      this.saveTaskStage(this.stageUpdateData);
    }
  }

  saveTaskStage(data) {
    this.showLoader();
    const promises = [
      this._taskService.saveTaskStage(data)
    ];
    Promise.all(promises)
      .then(data => {

        this.hideLoader();
      });
  }

  showTaskDetail(task: any) {
    this.viewDetail = task;
    this.viewDetail.pMtask = {};
    this.viewDetail.pMtask.id = task.taskId;
    this.viewDetail.pMtask.title = "";

    this.modalService.open(this.viewDetailModal, { size: 'xl', windowClass: 'modal-right', backdrop: 'static', keyboard: false });
    // this.showLoader();
    // const promises = [
    //   this._taskService.getPMtaskForEdit(taskId)
    // ];
    // Promise.all(promises)
    // .then(data => {

    //   this.editTaskData = data[0].result;
    //   this.modalService.open(this.createModal, { size: 'xl' });
    //   this.hideLoader();
    // });

  }
  saveTaskEmitEvent() {
    this.modalService.dismissAll();
    this.loadTaskStagesData();
  }

  onTaskUpdated() {
    this.loadTaskStagesData();
  }
  updateDueDate(newDate: any, id: number): void {

    let updateDueDateObj = Object.assign({ id: id, dueDate: newDate }, null);
    this._taskService.updateDueDate(updateDueDateObj).then(res => {
      if (res.success) {

      } else {

      }
    });
  }
  onDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._taskService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.loadTaskStagesData();
                this._message.showSuccess('Deleted!', 'Deleted successfully.');
              }
              else {
                this._message.showServerSideError();
              }
            });
        }
      });
  }

  openCreateModal(modal: any) {
    this.editTaskData = null;
    this.modalService.open(modal, { size: 'xl' });
  }

  loadProfilePic(){
    this.pmTaskStagesData.forEach(status => {
      var UserIds = [];
      status.tasksData.forEach(function (x) {
        if (x.responsibleId != null && x.responsibleId != undefined)
          UserIds.push(x.responsibleId)
      });
      var set = new Set(UserIds);
      this.distinctResponsibleIds = [...set];

      this.distinctResponsibleIds.forEach(x => {
        var userProfileExists =  this.userProfilePics.filter(user => {
            return user.userId == x;
        });
        var filteredData = status.tasksData.filter((value) => {
          return value.responsibleId == x;
        });

        if(userProfileExists.length > 0){
             filteredData.forEach(responsible => {
            responsible.profilePic = userProfileExists[0].profilePic;
          });
        }
        else{
          this._ProfileService.getProfilePictureByUser(x).then(res => {
            filteredData.forEach(responsible => {
              if (responsible.responsibleId == x) {
                if (res.result && res.result.profilePicture) {
                  responsible.profilePic = 'data:image/jpeg;base64,' + res.result.profilePicture;
                } else {
                  responsible.profilePic = '/assets/icons/default-user.png';
                }
                this.userProfilePics.push({
                  userId: x,
                  profilePic: responsible.profilePic
                });
              }
            });
          });
        }
      });
    });
   
  }
}
