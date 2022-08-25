import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BugsService } from 'src/app/core/services/bugs.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-bugs',
  templateUrl: './task-bugs.component.html',
  //styleUrls: ['./task-bugs.component.scss']
})
export class TaskBugsComponent implements OnInit {
  @Input() projectId;
  @Input() sprintId;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  titleFilter = '';
  descriptionFilter = '';
  attachmentFilter = '';
  pmProjectProjectNameFilter = '';
  bugStatusStatusFilter = '';
  userNameFilter = '';
  pMtaskTitleFilter = '';
  pmSprintSprintFilter = '';
  severityFilter = '';
  bugScreenFilter = ''

  viewTaskBug: any;
  editTaskBug: any;
  viewDetail: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  taskBugList: any;
  myData: any = [];
  sprintIntId = 0;
  sprintsDetail;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('viewDetailModal') viewDetailModal: ElementRef;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('dataTable', { static: true }) dataTable: Table;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();
  private lastTableLazyLoadEvent: LazyLoadEvent;

  distinctResponsibleIds: any[];
  defaultProfilePic = '/assets/icons/default-user.png';
  projectNames: any;
  bugStatuses: any;
  bugSeverities: any;
  users: any;
  taskBug: any;
  displayRoleName: any;

  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _taskBugService: BugsService,
    private route: ActivatedRoute,
    private _sprintService: SprintService,
    private _profileService: ProfileService,
    private _projectService: ProjectService,
    private _pmTeamMemberService: ProjectTeamService,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');

    this.sprintsDetail = { projectId: environment.emptyGuid };

    if (this.sprintId != environment.emptyGuid)
      this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'Tasks', active: true }];
    else
      this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Tasks', active: true }];


    if (this.sprintId != environment.emptyGuid)
      this.getSprintDetail();
    else
      this.sprintsDetail = { projectId: 0 };

    this.loadDropDown();
    this.displayRoleName = this._authService.getUserRoleName().toLowerCase();


  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      //this._projectService.getAllPMProjectForTableDropDown(this.sprintId),
      this._taskBugService.getAllBugStatusForTableDropdown(),
      this._taskBugService.getAllBugSeverityForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          //this.projectNames = data[0].result;
          this.bugStatuses = data[0].result;
          this.bugSeverities = data[1].result;
        }
        this.hideLoader();
        this.loadDropDownForBugs();
      });
  }
  loadDropDownForBugs() {
    this.showLoader();
    const promises = [
      this._pmTeamMemberService.getAllForDropdownByProject(this.sprintsDetail.project),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.users = data[0].result;
        }
        this.hideLoader();
      });
  }
  detailBug(obj) {
    this.viewDetail = obj;
    this.modalService.open(this.viewDetailModal, { size: 'xl', windowClass: 'modal-right', backdrop: 'static', keyboard: false });
  }
  viewBug(obj) {
    this.viewTaskBug = obj;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
  }
  editBug(obj) {
    this._taskBugService.getTaskBugForEdit(obj.taskBug.id).then(s => {
      this.hideLoader();
      this.editTaskBug = s.result.taskBug;
      this.modalService.open(this.createModal, this.ngbModalOptions);
    });
  }

  getSprintDetail() {
    this._sprintService.getSprintForView(this.sprintId).then(res => {
      this.hideLoader();
      if (res.success) {
        this.sprintsDetail = res.result.pmSprint;
        this.sprintIntId = res.result.pmSprint.id;
        this.breadCrumbItems = [{ label: res.result.pmProjectProjectName }, { label: res.result.pmSprint.sprint }, { label: 'Bugs', active: true }];

      } else {
        this._messageService.showServerSideError();
      }
    })
  }
  getTaskBugs(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.lastTableLazyLoadEvent = event;

    if (event.filters !== undefined) {
      if (Array.isArray(event.filters.title))
        this.titleFilter = event.filters.title[0].value;

      if (Array.isArray(event.filters.taskTitle))
        this.pMtaskTitleFilter = event.filters.taskTitle[0].value;

      if (Array.isArray(event.filters.screen))
        this.bugScreenFilter = event.filters.screen[0].value;
    }



    this.primengTableHelper.showLoadingIndicator();

    this._taskBugService.getAll(
      this.filterText,
      this.titleFilter,
      this.descriptionFilter,
      this.attachmentFilter,
      this.pmProjectProjectNameFilter,
      this.bugStatusStatusFilter,
      this.userNameFilter,
      this.pMtaskTitleFilter,
      this.pmSprintSprintFilter,
      this.severityFilter,
      this.bugScreenFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event),
      this.sprintId
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      var UserIds = [];
      this.primengTableHelper.records.forEach(function (x) {
        if (x.taskBug.responsible != null && x.taskBug.responsible != undefined)
          UserIds.push(x.taskBug.responsible)
      });
      var set = new Set(UserIds);
      this.distinctResponsibleIds = [...set];
      this.distinctResponsibleIds.forEach(x => {
        var filteredData = this.primengTableHelper.records.filter((value) => {
          return value.taskBug.responsible == x;
        });
        this._profileService.getProfilePictureByUser(x).then(res => {
          filteredData.forEach(responsible => {
            if (responsible.taskBug.responsible == x) {
              if (res.result && res.result.profilePicture) {
                responsible.profilePic = 'data:image/jpeg;base64,' + res.result.profilePicture;
              } else {
                responsible.profilePic = '/assets/icons/default-user.png';
              }
            }
          });
        });
      });
      this.primengTableHelper.hideLoadingIndicator();
    });
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  filterRecords() {
    this.getTaskBugs(this.lastTableLazyLoadEvent);
  }

  openCreateModal(modal: any) {
    this.editTaskBug = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.getTaskBugs(this.lastTableLazyLoadEvent);
  }
  onBugUpdated() {
    this.getTaskBugs(this.lastTableLazyLoadEvent);
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
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
          this._taskBugService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getTaskBugs(this.lastTableLazyLoadEvent);
                this._messageService.showSuccess('Deleted!', 'deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }

  customFilterCallback(filter: (a) => void, value: any): void {

    filter(value);
    this.hideFilterPopup();
  }
  hideFilterPopup() {
    var currPopup = document.getElementsByClassName("p-column-filter-menu-button-open")[0] as HTMLElement;
    currPopup.click();
  }
}
