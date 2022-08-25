import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BugStatusUpdateDto, BugsService, CreateOrEditTaskBugDto, UpdateResponsibleDto } from 'src/app/core/services/bugs.service';
import { MessageService } from 'src/app/core/services/message.service';
import { PMBugsboardService } from 'src/app/core/services/pmbugsboard.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bugs-board',
  templateUrl: './bugs-board.component.html',
  styleUrls: ['./bugs-board.component.scss']
})
export class BugsBoardComponent implements OnInit {
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
  
  constructor(private _bbService: PMBugsboardService,
    public modalService: NgbModal,
    public _bugsService: BugsService,
    private route: ActivatedRoute,
    private _sprintService: SprintService,
    private _pmTeamMemberService: ProjectTeamService,
    private _messageService: MessageService,
    private _ProfileService: ProfileService,
    private _authService: AuthenticationService
    ) { }

  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('viewDetailModal') viewDetailModal: ElementRef;

  loading = false;
  allAvailableStatuses = [];
  pmBugsStatusData = [];
  ownerId = 0;
  pmProjectId:any;
  projects = [];
  owners = [];
  connectedList = [];
  editBugData = new CreateOrEditTaskBugDto();
  viewBug;

  statusUpdateData = new BugStatusUpdateDto();
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
      this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'Bugsboard', active: true }];
      this.getSprintDetail();
    }
    else
      this.breadCrumbItems = [{ label: 'Bugsboard', active: true }];

    this.loadPickListData();

    this.displayRoleName = this._authService.getUserRoleName().toLowerCase();

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
      this._bbService.getAllUserByProjectIdForBugsboard(this.pmProjectId, this.sprintId),
      this._bbService.getAllPMProjectByUserIdForBugsboard(this.ownerId),
      this._bbService.getAll(this.ownerId, this.pmProjectId, this.sprintId, this.filterText, this.getSelectedStatuses())
    ];

    if (this.sprintId != environment.emptyGuid){
      this.isGlobal=false;
      promises.push(this._sprintService.getSprintForView(this.sprintId));
    }

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.owners = this.bindListWithDefault(data[0].result);

          this.projects = this.bindListWithDefault(data[1].result);

          var statuesData = data[2];
          statuesData.result.forEach(element => {
            this.connectedList.push("status" + element.statusId);
          });
          this.statusCount = (statuesData.result.length * 290) + 55;

          var tempData = statuesData.result;

          tempData.forEach(element => {
            element.isChecked = true;
            element.connectedTo = this.getConnectedList("status" + element.statusId)
          })

          this.allAvailableStatuses = tempData;
          this.pmBugsStatusData = tempData;
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
    this.loadBugStatusesData();
  }

  loadBugStatusesData() {
    this.showLoader();

    const promises = [
      this._bbService.getAll(this.ownerId, this.pmProjectId, this.sprintId, this.filterText, this.getSelectedStatuses()),
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

          this.pmBugsStatusData = tempData;
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

  owner_loadBugStatusesData() {

    if (this.ownerId == null)
      this.ownerId = 0;

    if (this.pmProjectId == environment.emptyGuid && this.sprintId == 0) {
      this.showLoader();
      const promises = [
        this._bbService.getAllPMProjectByUserIdForBugsboard(this.ownerId)
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.projects = this.bindListWithDefault(data[0].result);
          }
          this.hideLoader();
        });
    }

    this.loadBugStatusesData();
  }

  project_loadBugStatusesData() {
    if (this.pmProjectId == null)
      this.pmProjectId = environment.emptyGuid;

    if (this.ownerId == 0) {
      this.showLoader();
      const promises = [
        this._bbService.getAllUserByProjectIdForBugsboard(this.pmProjectId, this.sprintId)
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.owners = this.bindListWithDefault(data[0].result);
          }
          this.hideLoader();
        });
    }

    this.loadBugStatusesData();
  }

  responsibleChanged(bug) {

    this.updateResponsibleDto.id = bug.bugId;
    this.updateResponsibleDto.responsible = bug.responsibleId;

    this._bugsService.updateResponsible(this.updateResponsibleDto).then(res => {
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
      var bugId = event.previousContainer.data[event.previousIndex].bugId;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.statusUpdateData.bugId = bugId;
      this.statusUpdateData.statusId = parseInt(newStatusId)

      this.saveBugStatus(this.statusUpdateData);
    }
  }

  saveBugStatus(data) {
    this.showLoader();
    const promises = [
      this._bugsService.saveBugStatus(data)
    ];
    Promise.all(promises)
      .then(data => {

        this.hideLoader();
      });
  }

  showBugDetail(bug: any) {

    this.viewBug = bug;
    this.viewBug.taskBug = {};
    this.viewBug.taskBug.id = bug.bugId;
    this.viewBug.taskBug.title = "";
    this.modalService.open(this.viewDetailModal, { size: 'xl', windowClass: 'modal-right', backdrop: 'static', keyboard: false });

  }
  saveBugEmitEvent() {
    this.modalService.dismissAll();
    this.loadBugStatusesData();
  }

  onBugUpdated() {
    this.loadBugStatusesData();
  }
  updateDueDate(newDate: any, id: number): void {

    let updateDueDateObj = Object.assign({ id: id, dueDate: newDate }, null);
    this._bugsService.updateDueDate(updateDueDateObj).then(res => {
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
          this._bugsService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.loadBugStatusesData();
                this._messageService.showSuccess('Deleted!', 'Business KPI deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }

  openCreateModal(modal: any) {
    this.editBugData = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  loadProfilePic(){
    this.pmBugsStatusData.forEach(status => {
      var UserIds = [];
      status.bugsData.forEach(function (x) {
        if (x.responsibleId != null && x.responsibleId != undefined)
          UserIds.push(x.responsibleId)
      });
      var set = new Set(UserIds);
      this.distinctResponsibleIds = [...set];

      this.distinctResponsibleIds.forEach(x => {

        var userProfileExists =  this.userProfilePics.filter(user => {
            return user.userId == x;
        });

        var filteredData = status.bugsData.filter((value) => {
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
                if (res.result && res.result.profilePicture) {
                  responsible.profilePic = 'data:image/jpeg;base64,' + res.result.profilePicture;
                } else {
                  responsible.profilePic = '/assets/icons/default-user.png';
                }
                this.userProfilePics.push({
                  userId: x,
                  profilePic: responsible.profilePic
                });
            });
          });
        }
      });
    });
   
  }
}
