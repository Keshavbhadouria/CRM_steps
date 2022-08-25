import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ColumnSetting, ButtonSettings, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { StoriesService } from 'src/app/core/services/stories.service';
import { PMTaskFrequenciesServiceProxy } from 'src/app/core/services/task-frequencies.service';
import { PMtasksServiceProxy } from 'src/app/core/services/task.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pmtask',
  templateUrl: './pmtask.component.html',
  styleUrls: ['./pmtask.component.scss']
})
export class PMtaskComponent implements OnInit {
  @Input() projectId;
  @Input() sprintId;
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();
  private lastTableLazyLoadEvent: LazyLoadEvent;
  distinctResponsibleIds: any[];

  constructor(private _taskService: PMtasksServiceProxy,
    private _messageService: MessageService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private _sprintService: SprintService,
    private _storiesService: StoriesService,
    private _pmTeamMemberService: ProjectTeamService,
    private _profileService: ProfileService
  ) { }

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('viewDetailModal') viewDetailModal: ElementRef;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('dataTable', { static: true }) dataTable: Table;

  baseURL = environment.apiURL;
  defaultProfilePic = '/assets/icons/default-user.png';
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  titleFilter = '';
  summaryFilter = '';
  acceptanceCriteriaFilter = '';
  maxDueDateFilter: moment.Moment;
  minDueDateFilter: moment.Moment;
  maxParentIDFilter: number;
  maxParentIDFilterEmpty: number;
  minParentIDFilter: number;
  minParentIDFilterEmpty: number;
  maxDependencyFilter: number;
  maxDependencyFilterEmpty: number;
  minDependencyFilter: number;
  minDependencyFilterEmpty: number;
  maxDayOnMonthFilter: number;
  maxDayOnMonthFilterEmpty: number;
  minDayOnMonthFilter: number;
  minDayOnMonthFilterEmpty: number;
  mondayFilter = -1;
  tuesdayFilter = -1;
  wednesdayFilter = -1;
  thursdayFilter = -1;
  fridayFilter = -1;
  saturdayFilter = -1;
  sundayFilter = -1;
  maxDueTimeFilter: moment.Moment;
  minDueTimeFilter: moment.Moment;
  pmProjectProjectNameFilter = '';
  pmSprintSprintFilter = '';
  pmStoryTitleFilter = '';
  userNameFilter = '';
  pmTaskPriorityPriorityFilter = '';
  taskVelocityVelocityFilter = '';
  pmTaskTypeTypeFilter = '';
  pmTaskFrequencyFrequencyFilter = '';
  pmTaskStageFilter = '';

  editProject: any;
  viewProject: any;
  viewDetail: any;
  title: string;

  sprintIntId=0;

 // sprintId: number = 0;
  totalCount: number = 0;
  projectList: any;
  myData: any = [];
  priorities = [];
  statuses = [];
  responsibles = [];
  allPMTaskPrioritys: any[];
  allPMTaskVelocities: any[];
  allPMTaskTypes: any[];
  allPMTaskFrequiencies: any[];
  allTask: any[];
  allTaskStage: any[];

  // Create

  active = false;
  saving = false;
  sprintsDetail;

  //#region Table Configurations



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
      this.sprintsDetail = { projectId: environment.emptyGuid };
  }

  getSprintDetail() {
    this._sprintService.getSprintForView(this.sprintId).then(res => {
      this.hideLoader();
      if (res.success) {
        this.sprintsDetail = res.result.pmSprint;
        this.sprintIntId = res.result.pmSprint.id;
        this.breadCrumbItems = [{ label: res.result.pmProjectProjectName }, { label: res.result.pmSprint.sprint }, { label: 'Tasks', active: true }];
        this.loadDropDown();
      } else {
        this._messageService.showServerSideError();
      }
    })
  }


  loadDropDown() {
    this.showLoader();
    const promises = [
      this._storiesService.getAllPMStoryPriorityForTableDropdown(),
      this._storiesService.getAllPMStoryStatusForTableDropdown(),
      this._pmTeamMemberService.getAllForDropdownByProject(this.sprintsDetail.project),
      this._taskService.getAllPMTaskPriorityForTableDropDown(),
      this._taskService.getAllTaskVelocityForTableDropdown(),
      this._taskService.getAllPMTaskTypeForTableDropdown(),
      this._taskService.getAllPMTaskFrequencyForTableDropdown(),
      this._taskService.getAllPMTaskStageDropDown()

    ];
    Promise.all(promises)
      .then(data => {
        this.priorities = data[0].result;
        this.statuses = data[1].result;
        this.responsibles = data[2].result;
        this.allPMTaskPrioritys = data[3].result;
        this.allPMTaskVelocities = data[4].result;
        this.allPMTaskTypes = data[5].result;
        this.allPMTaskFrequiencies = data[6].result;
        this.allTaskStage = data[7].result;
      })
  }



  getPMtasks(event?: LazyLoadEvent) {

    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }
    this.lastTableLazyLoadEvent = event;
    this.primengTableHelper.showLoadingIndicator();

    if (event.filters != null) {
      if (Array.isArray(event.filters.title))
        this.titleFilter = event.filters.title[0].value;

      if (Array.isArray(event.filters.storyTitle))
        this.pmStoryTitleFilter = event.filters.storyTitle[0].value;
    }
    this._taskService.getAll(
      this.filterText,
      this.titleFilter,
      this.summaryFilter,
      this.acceptanceCriteriaFilter,
      this.maxDueDateFilter === undefined ? this.maxDueDateFilter : moment(this.maxDueDateFilter).endOf('day'),
      this.minDueDateFilter === undefined ? this.minDueDateFilter : moment(this.minDueDateFilter).startOf('day'),
      this.maxParentIDFilter == null ? this.maxParentIDFilterEmpty : this.maxParentIDFilter,
      this.minParentIDFilter == null ? this.minParentIDFilterEmpty : this.minParentIDFilter,
      this.maxDependencyFilter == null ? this.maxDependencyFilterEmpty : this.maxDependencyFilter,
      this.minDependencyFilter == null ? this.minDependencyFilterEmpty : this.minDependencyFilter,
      this.maxDayOnMonthFilter == null ? this.maxDayOnMonthFilterEmpty : this.maxDayOnMonthFilter,
      this.minDayOnMonthFilter == null ? this.minDayOnMonthFilterEmpty : this.minDayOnMonthFilter,
      this.mondayFilter,
      this.tuesdayFilter,
      this.wednesdayFilter,
      this.thursdayFilter,
      this.fridayFilter,
      this.saturdayFilter,
      this.sundayFilter,
      this.maxDueTimeFilter === undefined ? this.maxDueTimeFilter : moment(this.maxDueTimeFilter).endOf('day'),
      this.minDueTimeFilter === undefined ? this.minDueTimeFilter : moment(this.minDueTimeFilter).startOf('day'),
      this.pmProjectProjectNameFilter,
      this.pmSprintSprintFilter,
      this.pmStoryTitleFilter,
      this.userNameFilter,
      this.pmTaskPriorityPriorityFilter,
      this.taskVelocityVelocityFilter,
      this.pmTaskTypeTypeFilter,
      this.pmTaskFrequencyFrequencyFilter,
      this.pmTaskStageFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event),
      this.sprintId
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.distinctResponsibleIds = [];
      var UserIds = [];
      this.primengTableHelper.records.forEach(function (x) {
        if (x.pMtask.responsible != null && x.pMtask.responsible != undefined)
          UserIds.push(x.pMtask.responsible)
      });
      var set = new Set(UserIds);
      this.distinctResponsibleIds = [...set];
      this.distinctResponsibleIds.forEach(x => {

        var filteredData = this.primengTableHelper.records.filter((value) => {
          return value.pMtask.responsible == x;
        });

        this._profileService.getProfilePictureByUser(x).then(res => {
          filteredData.forEach(responsible => {
            if (responsible.pMtask.responsible == x) {
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
  filterRecords() {
    this.getPMtasks(this.lastTableLazyLoadEvent);
  }
  detailTask(obj) {
    this.viewDetail = obj;
    this.modalService.open(this.viewDetailModal, { size: 'xl', windowClass: 'modal-right', backdrop: 'static', keyboard: false });
  }
  editTask(obj) {
    this._taskService.getPMtaskForEdit(obj.pMtask.id).then(s => {
      this.hideLoader();
      this.editProject = s.result;
      this.modalService.open(this.createModal, { size: 'xl' });
    });
  }

  viewTask(obj) {
    this.viewProject = obj;
    this.modalService.open(this.viewModal, { size: 'xl' });
  }

  onDelete(pmProjectStatus) {
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
          if (this.deleteProject(pmProjectStatus.pMtask)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }

  deleteProject(data): boolean {
    return this._taskService.delete(data.id).then(res => {
      if (res.success){
        this.getPMtasks(this.lastTableLazyLoadEvent);
        return true;
      }
      else
        return false;
    });
  }




  //#endregion


  //#region Helper Methods

  toArray(obj) {
    let data = Object.keys(obj).map(i => obj[i]);
    return data[0];
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

  openCreateModal(modal: any) {
    this.editProject = null;
    this.modalService.open(modal, { size: 'xl' });
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.getPMtasks(this.lastTableLazyLoadEvent);
  }

  onTaskUpdated() {
    this.getPMtasks(this.lastTableLazyLoadEvent);
  }
  onEditProject(item, modal) {

    this.editProject = item;
    this.modalService.open(modal, { size: 'xl' });
  }

  onViewProject(item, modal) {
    this.viewProject = item;
    this.modalService.open(modal, { size: 'xl' });
  }
  customFilterCallback(filter: (a) => void, value: any): void {

    filter(value);

    this.hideFilterPopup();
  }
  clearDate(event) {
    this.hideFilterPopup();
    this.maxDueDateFilter = undefined;
    this.minDueDateFilter = undefined;
    this.getPMtasks(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getPMtasks(event);
  }

  hideFilterPopup() {
    var currPopup = document.getElementsByClassName("p-column-filter-menu-button-open")[0] as HTMLElement;
    currPopup.click();
  }
}
