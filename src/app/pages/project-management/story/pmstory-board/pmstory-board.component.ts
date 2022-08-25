import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GetPMStoryboardForViewDto, PMStoryBoardService } from 'src/app/core/services/PMStoryBoard.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { StoryStatusUpdateDto, CreateOrEditPMStoryDto, StoriesService, UpdateResponsibleDto } from 'src/app/core/services/stories.service';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from 'src/app/core/services/sprint.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/core/services/profile.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-pmstory-board',
  templateUrl: './pmstory-board.component.html',
  styleUrls: ['./pmstory-board.component.scss']
})
export class PMStoryBoardComponent implements OnInit {

  @Input() projectId;
  @Input() sprintId;

  distinctResponsibleIds: any[] = [];
  userProfilePics: any[] = [];
  defaultProfilePic = '/assets/icons/default-user.png';

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };
  displayRoleName: any;
  
  constructor(private _sbService: PMStoryBoardService,
    public modalService: NgbModal,
    public _storiesService: StoriesService,
    private route: ActivatedRoute,
    private _sprintService: SprintService,
    private _pmTeamMemberService: ProjectTeamService,
    private _messageService: MessageService,
    private _ProfileService: ProfileService,
    private _authService:AuthenticationService
    ) { }

  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('storyDetailModal') storyDetailModal: ElementRef;

  loading = false;
  allAvailableStatuses = [];
  pmTaskStatusData = [];
  ownerId = 0;
  pmProjectId :any;
  projects = [];
  owners = [];
  connectedList = [];
  editStoryData = new CreateOrEditPMStoryDto();
  viewStory;

  statusUpdateData = new StoryStatusUpdateDto();
 // sprintId = 0;
  sprintsDetail;
  breadCrumbItems;
  statusCount = 0;
  filterText = '';
  projectMembers: any[];
  updateResponsibleDto = new UpdateResponsibleDto();

    isGlobal=true;
    sprintIntId=0;

  ngOnInit(): void {
    
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');
    if(this.sprintId==null)
      this.sprintId = environment.emptyGuid;

    this.sprintsDetail = { projectId: environment.emptyGuid };

    if (this.sprintId != environment.emptyGuid){
      this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'Storyboard', active: true }];
      this.getSprintDetail();
    }
    else{
      this.breadCrumbItems = [{ label: 'Storyboard', active: true }];

    this.loadPickListData();

    }
    this.displayRoleName = this._authService.getUserRoleName().toLowerCase();
  }

  getSprintDetail() {
    this._sprintService.getSprintForView(this.sprintId).then(res => {
      this.hideLoader();
      if (res.success) {
        this.sprintIntId = res.result.pmSprint.id;
        this.sprintsDetail = res.result.pmSprint;
        this.loadPickListData();
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  loadPickListData() {
    this.showLoader();
    const promises = [
      this._sbService.getAllUserByProjectIdForStoryboard(this.pmProjectId, this.sprintId),
      this._sbService.getAllPMProjectByUserIdForStoryboard(this.ownerId),
      this._sbService.getAll(this.ownerId, this.pmProjectId, this.sprintId, this.filterText, this.getSelectedStatuses())
    ];

    if (this.sprintId != environment.emptyGuid){
      promises.push(this._sprintService.getSprintForView(this.sprintId));

      this.isGlobal=false;
    }

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.owners = this.bindListWithDefault(data[0].result);

          this.projects = this.bindListWithDefault(data[1].result);

          var boardStatusData = data[2];

          boardStatusData.result.forEach(element => {
            this.connectedList.push("status" + element.statusId);
          });
          this.statusCount = (boardStatusData.result.length * 290) + 55;


          var tempData = boardStatusData.result;

          tempData.forEach(element => {
            element.isChecked = true;
            element.connectedTo = this.getConnectedList("status" + element.statusId)
          })

          this.allAvailableStatuses = tempData;
          this.pmTaskStatusData = tempData;
          this.loadProfilePic();
          if (this.sprintId != environment.emptyGuid) {
            this.breadCrumbItems = [{ label: data[3].result.pmProjectProjectName }, { label: data[3].result.pmSprint.sprint }, { label: 'Storyboard', active: true }];

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

  getSelectedStatuses() {
    var selectedStatuses = [];
    this.allAvailableStatuses.forEach(element => {
      if (element.isChecked)
        selectedStatuses.push(element.statusId);
    });
    return selectedStatuses;
  }

  filterRecords() {
    this.loadStoryStatusesData();
  }

  loadStoryStatusesData() {
    this.showLoader();

    const promises = [
      this._sbService.getAll(this.ownerId, this.pmProjectId, this.sprintId, this.filterText, this.getSelectedStatuses()),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          data[0].result.forEach(element => {
            this.connectedList.push("status" + element.statusId);
          });

          var tempData = data[0].result;

          tempData.forEach(element => {
            element.isChecked = true;
            element.connectedTo = this.getConnectedList("status" + element.statusId)
          })

          this.pmTaskStatusData = tempData;
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

  owner_loadStoryStatusesData() {

    if (this.ownerId == null)
      this.ownerId = 0;

    if (this.pmProjectId == environment.emptyGuid && this.sprintId==environment.emptyGuid) {
      this.showLoader();
      const promises = [
        this._sbService.getAllPMProjectByUserIdForStoryboard(this.ownerId)
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.projects = this.bindListWithDefault(data[0].result);
          }
          this.hideLoader();
        });
    }

    this.loadStoryStatusesData();
  }

  project_loadStoryStatusesData() {

    if (this.pmProjectId == null)
      this.pmProjectId = 0;

    if (this.ownerId == 0) {
      this.showLoader();
      const promises = [
        this._sbService.getAllUserByProjectIdForStoryboard(this.pmProjectId, this.sprintId)
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.owners = this.bindListWithDefault(data[0].result);
          }
          this.hideLoader();
        });
    }

    this.loadStoryStatusesData();
  }

  responsibleChanged(task) {

    this.updateResponsibleDto.id = task.storyId;
    this.updateResponsibleDto.responsible = task.responsibleId;

    this._storiesService.updateResponsible(this.updateResponsibleDto).then(res => {
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

      var newStatusId = event.container.id.replace("status", "");
      var storyId = event.previousContainer.data[event.previousIndex].storyId;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.statusUpdateData.storyId = storyId;
      this.statusUpdateData.statusId = parseInt(newStatusId)

      this.saveStoryStatus(this.statusUpdateData);
    }
  }

  saveStoryStatus(data) {
    this.showLoader();
    const promises = [
      this._storiesService.saveStoryStatus(data)
    ];
    Promise.all(promises)
      .then(data => {

        this.hideLoader();
      });
  }

  showStoryDetail(story: any) {

    this.viewStory = story;
    this.viewStory.pmStory = {};
    this.viewStory.pmStory.id = story.storyId;
    this.viewStory.pmStory.title = "";
    this.modalService.open(this.storyDetailModal, { size: 'xl', windowClass: 'modal-right', backdrop: 'static', keyboard: false });
  }

  saveStoryEmitEvent() {
    this.modalService.dismissAll();
    this.loadStoryStatusesData();
  }


  onStoryUpdated() {
    this.loadStoryStatusesData();
  }

  updateDueDate(newDate: any, id: number): void {

    let updateDueDateObj = Object.assign({ id: id, dueDate: newDate }, null);
    this._storiesService.updateDueDate(updateDueDateObj).then(res => {
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
          this._storiesService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.loadStoryStatusesData();
                this._messageService.showSuccess('Deleted!', 'Deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }

  openCreateModal(modal: any) {
    this.editStoryData = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  loadProfilePic(){
    this.pmTaskStatusData.forEach(status => {
      var UserIds = [];
      status.storiesData.forEach(function (x) {
        if (x.responsibleId != null && x.responsibleId != undefined)
          UserIds.push(x.responsibleId)
      });
      var set = new Set(UserIds);
      this.distinctResponsibleIds = [...set];

      this.distinctResponsibleIds.forEach(x => {
        var userProfileExists =  this.userProfilePics.filter(user => {
            return user.userId == x;
        });
        var filteredData = status.storiesData.filter((value) => {
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
