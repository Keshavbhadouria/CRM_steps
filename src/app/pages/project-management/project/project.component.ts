import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CreateOrEditPMProjectDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {


  baseURL = environment.apiURL + "\\";

  defaultProjectPic = '/assets/CRMSteps/default-proj-icon.png';

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('teamMemberModal') teamMemberModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  projectNameFilter = '';
  goalFilter = '';
  maxStartDateFilter: moment.Moment;
  minStartDateFilter: moment.Moment;
  maxTargetDateFilter: moment.Moment;
  minTargetDateFilter: moment.Moment;
  maxBaselineVelocityFilter: number;
  maxBaselineVelocityFilterEmpty: number;
  minBaselineVelocityFilter: number;
  minBaselineVelocityFilterEmpty: number;
  maxActualVelocityFilter: number;
  maxActualVelocityFilterEmpty: number;
  minActualVelocityFilter: number;
  minActualVelocityFilterEmpty: number;
  teamChannelFilter = '';
  logoFilter = '';
  contactCompanyFilter = '';
  pmIndustryIndustryFilter = '';
  userNameFilter = '';
  pmTaskPriorityPriorityFilter = '';
  pmProjectStatusStatusFilter = '';
  editProject: any;
  viewProject: any;


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
  pmProjectStatusStatus = '';
  manageTeam;
  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'contactCompany',
      header: 'Comapany',
    },
    {
      primaryKey: 'pmIndustryIndustry',
      header: 'Industry',
    },
    {
      primaryKey: 'userName',
      header: 'Username',
    },
    {
      primaryKey: 'pmTaskPriorityPriority',
      header: 'Task Priority',
    },
    {
      primaryKey: 'pmProjectStatusStatus',
      header: 'Status',
    },
    {
      primaryKey: "pmProject.projectName",
      header: 'Project Name',
    },
    {
      primaryKey: "pmProject.startDate",
      header: 'Start Date',
      format: PipeFormat.DATE,
    },
    {
      primaryKey: "pmProject.targetDate",
      header: 'Target Date',
      format: PipeFormat.DATE,
    },
    {
      primaryKey: "pmProject.baselineVelocity",
      header: 'Baseline Velocity',
    },
    {
      primaryKey: "pmProject.actualVelocity",
      header: 'Actual Velocity',
    },
    {
      primaryKey: "pmProject.teamChannel",
      header: 'Team Channel',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewProject = obj;
        this.modalService.open(this.viewModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editProject = obj;
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

  constructor(
    private _projectService: ProjectService, private _messageService: MessageService, private modalService: NgbModal
    , private toastr: ToastrService,
    private _authService: AuthenticationService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
    this.displayRoleName = this._authService.getUserRoleName().toLowerCase();
  }



  //#region API Methods

  getRecords() {
    this.showLoader();
    this._projectService.getAll(
      this.filterText,
      this.projectNameFilter,
      this.goalFilter,
      this.maxStartDateFilter === undefined ? this.maxStartDateFilter : moment(this.maxStartDateFilter).endOf('day'),
      this.minStartDateFilter === undefined ? this.minStartDateFilter : moment(this.minStartDateFilter).startOf('day'),
      this.maxTargetDateFilter === undefined ? this.maxTargetDateFilter : moment(this.maxTargetDateFilter).endOf('day'),
      this.minTargetDateFilter === undefined ? this.minTargetDateFilter : moment(this.minTargetDateFilter).startOf('day'),
      this.maxBaselineVelocityFilter == null ? this.maxBaselineVelocityFilterEmpty : this.maxBaselineVelocityFilter,
      this.minBaselineVelocityFilter == null ? this.minBaselineVelocityFilterEmpty : this.minBaselineVelocityFilter,
      this.maxActualVelocityFilter == null ? this.maxActualVelocityFilterEmpty : this.maxActualVelocityFilter,
      this.minActualVelocityFilter == null ? this.minActualVelocityFilterEmpty : this.minActualVelocityFilter,
      this.teamChannelFilter,
      this.logoFilter,
      this.contactCompanyFilter,
      this.pmIndustryIndustryFilter,
      this.userNameFilter,
      this.pmTaskPriorityPriorityFilter,
      this.pmProjectStatusStatusFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
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



  deleteProject(data): boolean {
    return this._projectService.delete(data.pmProject.publicId).then(res => {
      if (res.success)
        return true;
      else
        return false;
    });
  }

  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }


  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  editProjectFun(data, modal) {
    this.editProject = data;
    this.modalService.open(modal, { size: 'xl', backdrop: 'static', keyboard: false });
  }

  openCreateModal(modal: any) {
    this.editProject = null;
    this.modalService.open(modal, { size: 'xl', backdrop: 'static', keyboard: false });
  }

  openTeamMemberModal(data, modal) {
    this.manageTeam = data;
    this.modalService.open(modal, { size: 'xl', backdrop: 'static', keyboard: false });
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

  onViewProject(item, modal) {
    this.viewProject = item;
    this.modalService.open(modal, { size: 'xl', windowClass: 'modal-right', backdrop: 'static', keyboard: false });
  }

  onDelete(pmProject) {

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
          if (this.deleteProject(pmProject)) {
            this.toastr.error("Your record has been deleted." || "Some thing went wrong.", 'Deleted');

            this.myData = this.myData.filter(obj => { return obj.pmProject.id !== pmProject.pmProject.id });
          } else {
            this._messageService.showServerSideError();
          }

        }
      });
  }
}
