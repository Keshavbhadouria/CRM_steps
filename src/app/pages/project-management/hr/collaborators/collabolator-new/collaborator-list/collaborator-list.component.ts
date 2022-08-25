import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CollaboratorsService } from 'src/app/core/services/collaborators.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss']
})
export class CollaboratorListComponent implements OnInit {


  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  paginationSettings: PaginationSettings = new PaginationSettings();
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
      primaryKey: 'collaboratorNew.fullname',
      header: 'Name',
    },
    {
      primaryKey: 'userName',
      header: 'Username',
    },
    {
      primaryKey: 'jobDescriptionTitle',
      header: 'JobTitle',
    },
    {
      primaryKey: 'collaboratorNew.timezone',
      header: 'timezone',
    },
    {
      primaryKey: 'collaboratorNew.weeklyHoursAvailabilty',
      header: 'weeklyHoursAvailabilty',
    },
    {
      primaryKey: 'collaboratorNew.workingTimeFromToEstTime',
      header: 'workingTimeFromToEstTime',
    },
    {
      primaryKey: 'collaboratorNew.active',
      header: 'active',
    },

  ];

  buttonSettings: ButtonSettings[] = [
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
  userNameFilter: string;
  allRoles: any;
  allJobDescriptions: any;
  jobDescriptionTitleFilter: string;
  workingTimeFromToEstTimeFilter: string;
  activeFilter: number;
  maxVelocityFilter: any;
  maxVelocityFilterEmpty: number;
  minVelocityFilter: any;
  minVelocityFilterEmpty: number;
  maxPerformanceFilter: any;
  maxPerformanceFilterEmpty: number;
  minPerformanceFilter: any;
  minPerformanceFilterEmpty: number;
  yesNolst = [{id:1, displayName: "Yes"},{id:0, displayName: "No"}]

  //#endregion

  constructor(
    private _collaboratorService: CollaboratorsService, private _messageService: MessageService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Collaborators' }, { label: 'Collaborators List', active: true }];
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._collaboratorService.getRoles(),
      this._collaboratorService.getAllJobDescriptionForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allRoles = data[0].result;
          this.allJobDescriptions = data[1].result;
        }
        this.hideLoader();
      });
  }


  //#region API Methods

  getRecords(event?: LazyLoadEvent) {

    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }
    if (event.filters != null) {
      if (Array.isArray(event.filters.userName))
        this.userNameFilter = event.filters.userName[0].value;
      if (Array.isArray(event.filters.timezone))
        this.timezoneFilter = event.filters.timezone[0].value;
      if (Array.isArray(event.filters.fullname))
        this.fullnameFilter = event.filters.fullname[0].value;

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
    return this._collaboratorService.delete(data.collaboratorNew.id).then(res => {
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


  onEditCollaborator(obj) {
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
            this.myData = this.myData.filter(obj => { return obj !== pmCollaborator });
          } else {
            this._messageService.showServerSideError();
          }
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


  //#endregion

}

