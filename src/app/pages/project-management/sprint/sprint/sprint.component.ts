import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { env } from 'process';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {

  @Input() projectId;
  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;

  projectIntId=0;

  filterText = '';
  sprintFilter = '';
  descriptionFilter = '';
  maxStartDateFilter: moment.Moment;
  minStartDateFilter: moment.Moment;
  maxEndDateFilter: moment.Moment;
  minEndDateFilter: moment.Moment;
  maxReleaseDateFilter: moment.Moment;
  minReleaseDateFilter: moment.Moment;
  maxStoryPointsFilter: number;
  maxStoryPointsFilterEmpty: number;
  minStoryPointsFilter: number;
  minStoryPointsFilterEmpty: number;
  sprintProjectNameFilter = '';
  pmSprintStatusStatusFilter = '';
  pmProjectProjectNameFilter = '';


  editSprint: any;
  viewSprint: any;


  totalCount: number = 0;
  projectList: any;
  myData: any = [];

  // Create

  active = false;
  saving = false;


  contactCompany = '';
  pmIndustryIndustry = '';
  userName = '';
  pmTaskPriorityPriority = '';
  sprintStatusStatus = '';
  projectDetail;
  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'pmProjectProjectName',
      header: 'Project Name',
    },
    {
      primaryKey: 'pmSprint.sprint',
      header: 'sprint',
    },
    {
      primaryKey: 'pmSprint.description',
      header: 'Description',
    },
    {
      primaryKey: 'pmSprint.startDate',
      header: 'Start Date',
      format: PipeFormat.DATE,
    },
    {
      primaryKey: 'pmSprint.endDate',
      header: 'End Date',
      format: PipeFormat.DATE,
    },
    {
      primaryKey: 'pmSprint.releaseDate',
      header: 'Release Date',
      format: PipeFormat.DATE,
    },

    {
      primaryKey: 'pmSprint.storyPoints',
      header: 'StoryPoints',
    },
    {
      primaryKey: 'pmSprintStatusStatus',
      header: 'Status',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewSprint = obj;
        this.modalService.open(this.viewModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editSprint = obj;
        this.modalService.open(this.createModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        
        this.onDelete(obj);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  displayRoleName: any;
  //#endregion

  constructor(private _pmSprintsServiceProxy: SprintService,
    private route: ActivatedRoute,
    private _messageService: MessageService, private modalService: NgbModal,
    private _projectService: ProjectService,
    private _authService: AuthenticationService) { }

  ngOnInit() {

    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectDetail={id:0};
    if(this.projectId!=environment.emptyGuid)
      this.breadCrumbItems = [{ label: 'Project' }, { label: 'Sprints', active: true }];
    else
      this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'Sprint List', active: true }];

    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
    this.loadProjectDetail();
    this.displayRoleName = this._authService.getUserRoleName().toLowerCase();
  }

  loadProjectDetail(){
    this._projectService.getPMProjectForView(this.projectId)
    .then(res=>{
      if(res.success){
        this.breadCrumbItems = [{ label: res.result.pmProject.projectName }, { label: 'Sprint List', active: true }];
        this.projectDetail=res.result.pmProject;
        this.projectIntId=res.result.pmProject.id;
      }
    });
  }

  //#region API Methods

  getRecords() {
    this.showLoader();
    this._pmSprintsServiceProxy.getAll(
      this.filterText,
      this.sprintFilter,
      this.descriptionFilter,
      this.maxStartDateFilter === undefined ? this.maxStartDateFilter : moment(this.maxStartDateFilter).endOf('day'),
      this.minStartDateFilter === undefined ? this.minStartDateFilter : moment(this.minStartDateFilter).startOf('day'),
      this.maxEndDateFilter === undefined ? this.maxEndDateFilter : moment(this.maxEndDateFilter).endOf('day'),
      this.minEndDateFilter === undefined ? this.minEndDateFilter : moment(this.minEndDateFilter).startOf('day'),
      this.maxReleaseDateFilter === undefined ? this.maxReleaseDateFilter : moment(this.maxReleaseDateFilter).endOf('day'),
      this.minReleaseDateFilter === undefined ? this.minReleaseDateFilter : moment(this.minReleaseDateFilter).startOf('day'),
      this.maxStoryPointsFilter == null ? this.maxStoryPointsFilterEmpty : this.maxStoryPointsFilter,
      this.minStoryPointsFilter == null ? this.minStoryPointsFilterEmpty : this.minStoryPointsFilter,
      this.sprintProjectNameFilter,
      this.pmSprintStatusStatusFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize,
      this.projectId
    ).then(res => {
      this.hideLoader();
      if (res.success) {

        this.projectList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        // res.result.items.forEach(element => {
        //   this.myData.push(this.toArray(element));
        // });
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  onDelete(sprint) {
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
          this._pmSprintsServiceProxy.delete(sprint.pmSprint.id).then(res => {
            if (res.success) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your record has been deleted.',
                'success'
              );
              this.myData = this.myData.filter(obj => { return obj !== sprint });
              return true;
            }
            else
              this._messageService.showServerSideError();
          });
        }
      });
  }

  deleteProject(data): boolean {
    return
  }

  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  //#endregion API

  //#region Helper Methods




  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  openCreateModal(modal: any) {
    this.editSprint = null;
    this.modalService.open(modal, { size: 'xl' });
  }

  editSprintFun(data, modal){
    this.editSprint = data;
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
this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }


  toArray(obj) {
    let data = Object.keys(obj).map(i => obj[i]);
    return data[0];
  }


  //#endregion

}
