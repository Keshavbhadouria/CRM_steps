import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { StoriesService } from 'src/app/core/services/stories.service';
import Swal from 'sweetalert2';
import { Paginator } from 'primeng/paginator';
import { FilterService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ColumnFilterFormElement } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html'
  //styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  @Input() sprintId;
  @Input() projectId;

  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('dataTable', { static: true }) dataTable: Table;

  private lastTableLazyLoadEvent: LazyLoadEvent;

  defaultProfilePic = '/assets/icons/default-user.png';
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  idFilter = '';
  titleFilter = '';
  maxDependencyFilter: number;
  maxDependencyFilterEmpty: number;
  minDependencyFilter: number;
  minDependencyFilterEmpty: number;
  descriptionFilter = '';
  acceptanceCriteriaFilter = '';
  maxStartDateFilter: Date;
  minStartDateFilter: Date;
  maxEndDateFilter: Date;
  minEndDateFilter: Date;
  attachmentFilter = '';
  epicNameFilter = '';
  pmProjectProjectNameFilter = '';
  pmSprintSprintFilter = '';
  pmStoryPriorityPriorityFilter = '';
  userNameFilter = '';
  pmStoryStatusStatusFilter = '';
  userName2Filter = '';

  sprintIntId = 0;

  viewStory: any;
  editStory: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  storyList: any;
  myData: any = [];
  sprintsDetail;
  priorities = [];
  statuses = [];
  responsibles = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('storyDetailModal') storyDetailModal: ElementRef;


  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();
  distinctResponsibleIds: any[];
  displayRoleName: any;


  //#endregion
  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private _sprintService: SprintService,
    private _storiesService: StoriesService,
    private _pmTeamMemberService: ProjectTeamService,
    private _profileService: ProfileService,
    private _filterService: FilterService,
    private _authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');

    this.sprintsDetail = { projectId: environment.emptyGuid };

    if (this.sprintId !=environment.emptyGuid)
      this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'Stories', active: true }];
    else
      this.breadCrumbItems = [{ label: 'Story Management' }, { label: 'Stories', active: true }];

    if (this.sprintId != environment.emptyGuid)
      this.getSprintDetail();
    else
      this.sprintsDetail = { projectId: environment.emptyGuid };

    this.primengTableHelper;

    this.displayRoleName = this._authService.getUserRoleName().toLowerCase();
  }

  detailStories(obj) {
    this.viewStory = obj;
    this.modalService.open(this.storyDetailModal, { size: 'xl', windowClass: 'modal-right', backdrop: 'static', keyboard: false });
  }

  viewStories(obj) {
    this.viewStory = obj;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
  }

  editStories(obj) {
    this.showLoader();
    this._storiesService.getPMStoryForEdit(obj.pmStory.id).then(s => {
      this.hideLoader();
      this.editStory = s.result.pmStory;
      this.modalService.open(this.createModal, this.ngbModalOptions);
    });
  }

  getSprintDetail() {
    this._sprintService.getSprintForView(this.sprintId).then(res => {
      this.hideLoader();
      if (res.success) {
        this.sprintIntId = res.result.pmSprint.id;
        this.breadCrumbItems = [{ label: res.result.pmProjectProjectName }, { label: res.result.pmSprint.sprint }, { label: 'Stories', active: true }];
        this.sprintsDetail = res.result.pmSprint;
        this.loadDropdown();
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  getPMStories(event?: LazyLoadEvent) {

    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.lastTableLazyLoadEvent = event;

    if (event.filters != null) {
    if (Array.isArray(event.filters.title))
      this.titleFilter = event.filters.title[0].value;
    if (Array.isArray(event.filters.epic))
      this.epicNameFilter = event.filters.epic[0].value;
    if (Array.isArray(event.filters.owner))
      this.userNameFilter = event.filters.owner[0].value;
    }




    this.primengTableHelper.showLoadingIndicator();
    this._storiesService.getAll(
      this.filterText,
      this.titleFilter,
      this.maxDependencyFilter == null ? this.maxDependencyFilterEmpty : this.maxDependencyFilter,
      this.minDependencyFilter == null ? this.minDependencyFilterEmpty : this.minDependencyFilter,
      this.descriptionFilter,
      this.acceptanceCriteriaFilter,
      this.maxStartDateFilter,
      this.minStartDateFilter,
      this.maxEndDateFilter,
      this.minEndDateFilter,
      this.attachmentFilter,
      this.epicNameFilter,
      this.pmProjectProjectNameFilter,
      this.pmSprintSprintFilter,
      this.pmStoryPriorityPriorityFilter,
      this.userNameFilter,
      this.pmStoryStatusStatusFilter,
      this.userName2Filter,
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
        if (x.pmStory.initialResponsible != null && x.pmStory.initialResponsible != undefined)
          UserIds.push(x.pmStory.initialResponsible)
      });
      var set = new Set(UserIds);
      this.distinctResponsibleIds = [...set];
      this.distinctResponsibleIds.forEach(x => {
        var filteredData = this.primengTableHelper.records.filter((value) => {
          return value.pmStory.initialResponsible == x;
        });

        this._profileService.getProfilePictureByUser(x).then(res => {
          filteredData.forEach(responsible => {
            if (responsible.pmStory.initialResponsible == x) {
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

  loadDropdown() {
    this.showLoader();
    const promises = [
      this._storiesService.getAllPMStoryPriorityForTableDropdown(),
      this._storiesService.getAllPMStoryStatusForTableDropdown(),
      this._pmTeamMemberService.getAllForDropdownByProject(this.sprintsDetail.project)
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.priorities = data[0].result;
          this.statuses = data[1].result;
          this.responsibles = data[2].result;
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
  filterRecords() {
    this.getPMStories(this.lastTableLazyLoadEvent);
  }

  openCreateModal(modal: any) {
    this.editStory = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.getPMStories(this.lastTableLazyLoadEvent);
  }
  onStoryUpdated() {
    this.getPMStories(this.lastTableLazyLoadEvent);
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
    this.editStory = null;
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
                this.getPMStories(this.lastTableLazyLoadEvent);
                this._messageService.showSuccess('Deleted!', 'Story deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
  getResponsibleProfilePic() {
    this.showLoader();

  }
  customFilterCallback(filter: (a) => void, value: any): void {

    filter(value);
    this.hideFilterPopup();
  }
  clearDate(event) {
    this.hideFilterPopup();
    this.maxEndDateFilter = undefined;
    this.minEndDateFilter = undefined;
    this.getPMStories(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getPMStories(event);
  }

  hideFilterPopup() {
    var currPopup = document.getElementsByClassName("p-column-filter-menu-button-open")[0] as HTMLElement;
    currPopup.click();
  }
}
