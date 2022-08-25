import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { CollaboratorsService } from 'src/app/core/services/collaborators.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {


  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();


  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  fullnameFilter = '';
  phoneFilter = '';
  timezoneFilter = '';
  maxWeeklyHoursAvailabiltyFilter: number;
  maxWeeklyHoursAvailabiltyFilterEmpty: number;
  minWeeklyHoursAvailabiltyFilter: number;
  minWeeklyHoursAvailabiltyFilterEmpty: number;
  pmRoleRoleFilter = '';


  editCollaborator: any;
  viewCollaborator: any;


  totalCount: number = 0;
  CollaboratorList: any;
  myData: any = [];

  // Create

  active = false;
  saving = false;

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'pmRoleRole',
      header: 'Role',
    },
    {
      primaryKey: 'jobDescription',
      header: 'Job',
    },
    {
      primaryKey: 'collaborator.fullname',
      header: 'Fullname',
    },
    {
      primaryKey: 'collaborator.phone',
      header: 'phone',
    },
    {
      primaryKey: 'collaborator.country',
      header: 'country',
    },
    {
      primaryKey: 'collaborator.timezone',
      header: 'timezone',
    },
    {
      primaryKey: 'collaborator.weeklyHoursAvailabilty',
      header: 'weeklyHoursAvailabilty',
    },
    {
      primaryKey: 'collaborator.workingTimeFromToEstTime',
      header: 'workingTimeFromToEstTime',
    },
    {
      primaryKey: 'collaborator.active',
      header: 'active',
    },

  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewCollaborator = obj;
        this.modalService.open(this.viewModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editCollaborator = obj;
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
  userNameFilter: string;
  jobDescriptionTitleFilter: string;
  workingTimeFromToEstTimeFilter: string;
  activeFilter: number;
  maxVelocityFilter: any;
  minVelocityFilter: any;
  maxVelocityFilterEmpty: number;
  maxPerformanceFilter: any;
  maxPerformanceFilterEmpty: number;
  minVelocityFilterEmpty: number;
  minPerformanceFilterEmpty: number;
  minPerformanceFilter: number;
  //#endregion
  constructor(
    private _collaboratorService: CollaboratorsService, private _messageService: MessageService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Collaborators' }, { label: 'Collaborators List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }


  //#region API Methods

  getRecords(event?: LazyLoadEvent) {

    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

   

    this.primengTableHelper.showLoadingIndicator();

    this._collaboratorService.getAll(
      this.filterText,
      this.timezoneFilter,
      this.maxWeeklyHoursAvailabiltyFilter == null ? this.maxWeeklyHoursAvailabiltyFilterEmpty : this.maxWeeklyHoursAvailabiltyFilter,
      this.minWeeklyHoursAvailabiltyFilter == null ? this.minWeeklyHoursAvailabiltyFilterEmpty : this.minWeeklyHoursAvailabiltyFilter,
      this.workingTimeFromToEstTimeFilter,
      this.activeFilter,
      this.maxVelocityFilter == null ? this.maxVelocityFilterEmpty : this.maxVelocityFilter,
      this.minVelocityFilter == null ? this.minVelocityFilterEmpty : this.minVelocityFilter,
      this.maxPerformanceFilter == null ? this.maxPerformanceFilterEmpty : this.maxPerformanceFilter,
      this.minPerformanceFilter == null ? this.minPerformanceFilterEmpty : this.minPerformanceFilter,
      this.fullnameFilter,
      this.userNameFilter,
      this.jobDescriptionTitleFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }



  deleteCollaborator(data): boolean {
    return this._collaboratorService.delete(data.collaborator.id).then(res => {
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

  //#endregion API

  //#region Helper Methods


  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  openCreateModal(modal: any) {
    this.editCollaborator = null;
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

  onViewCollaborator(obj) {
    this.viewCollaborator = obj;
    this.modalService.open(this.viewModal, { size: 'xl' });
  }
  onEditCollaborator(obj){
    this.editCollaborator = obj;
    this.modalService.open(this.createModal, { size: 'xl' });
  }

  onDelete(pmCollaborator) {
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
          if (this.deleteCollaborator(pmCollaborator)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
            this.getRecords();
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }

  //#endregion

}

