import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ContactService } from 'src/app/core/services/contact.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  allLeadSources: any;
  allLeadStages: any;
  allLeadStatuss: any;
  allLeadTemperatures: any;
  allTargetTitles: any;



  constructor(private _ContactService: ContactService, private _messageService: MessageService, public modalService: NgbModal, private _router: Router) { }


  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('dataTable', { static: true }) dataTable: Table;

  baseURL = environment.apiURL;
  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  companyFilter = '';
  firstnameFilter = '';
  lastnameFilter = '';
  emailFilter = '';
  phoneFilter = '';
  extensionFilter = '';
  maxPreferredTime1Filter: moment.Moment;
  minPreferredTime1Filter: moment.Moment;
  maxPreferredTime2Filter: moment.Moment;
  minPreferredTime2Filter: moment.Moment;
  address1Filter = '';
  address2Filter = '';
  cityFilter = '';
  stateFilter = '';
  countryFilter = '';
  zipcodeFilter = '';
  maxScoreFilter: number;
  maxScoreFilterEmpty: number;
  minScoreFilter: number;
  minScoreFilterEmpty: number;
  maxActionTypeIdFilter: number;
  maxActionTypeIdFilterEmpty: number;
  minActionTypeIdFilter: number;
  minActionTypeIdFilterEmpty: number;
  webURLFilter = '';
  targetTitleTitleFilter = '';
  leadTemperatureTemperatureFilter = '';
  leadSourceSourceNameFilter = '';
  leadStageStageNameFilter = '';
  leadStatusStatusNameFilter = '';
  fromDate: moment.Moment;
  toDate: moment.Moment;
  paralegalId: number;

  editProject: any;
  viewProject: any;

  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();
  totalCount: number = 0;
  projectList: any;
  myData: any = [];

  // Create

  active = false;
  saving = false;

  //#region Table Configurations



  //#endregion


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customer' }, { label: 'Contact List', active: true }];
    this.loadDropDown();
  } 

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._ContactService.getAllLeadSourceForTableDropdown(),
      this._ContactService.getAllLeadStageForTableDropdown(),
      this._ContactService.getAllLeadStatusForTableDropdown(),
      this._ContactService.getAllLeadTemperatureForTableDropdown(),
      this._ContactService.getAllTargetTitleForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allLeadSources = data[0].result;
          this.allLeadStages = data[1].result;
          this.allLeadStatuss = data[2].result;
          this.allLeadTemperatures = data[3].result;
          this.allTargetTitles = data[4].result;
        }
        this.hideLoader();
      });
  }
  //#region API Methods

  getContacts(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    if (event.filters != null) {
      if (Array.isArray(event.filters.company))
        this.companyFilter = event.filters.company[0].value;
      if (Array.isArray(event.filters.firstname))
        this.firstnameFilter = event.filters.firstname[0].value;
      if (Array.isArray(event.filters.lastname))
        this.lastnameFilter = event.filters.lastname[0].value;
      if (Array.isArray(event.filters.email))
        this.emailFilter = event.filters.email[0].value;
      if (Array.isArray(event.filters.phone))
        this.phoneFilter = event.filters.phone[0].value;
    }
    this.primengTableHelper.showLoadingIndicator();

    this._ContactService.getAll(
      this.filterText,
      this.companyFilter,
      this.firstnameFilter,
      this.lastnameFilter,
      this.emailFilter,
      this.phoneFilter,
      this.extensionFilter,
      this.maxPreferredTime1Filter === undefined ? this.maxPreferredTime1Filter?.toString() : moment(this.maxPreferredTime1Filter).endOf('day').toString(),
      this.minPreferredTime1Filter === undefined ? this.minPreferredTime1Filter?.toString() : moment(this.minPreferredTime1Filter).startOf('day').toString(),
      this.maxPreferredTime2Filter === undefined ? this.maxPreferredTime2Filter?.toString() : moment(this.maxPreferredTime2Filter).endOf('day').toString(),
      this.minPreferredTime2Filter === undefined ? this.minPreferredTime2Filter?.toString() : moment(this.minPreferredTime2Filter).startOf('day').toString(),
      this.address1Filter,
      this.address2Filter,
      this.cityFilter,
      this.stateFilter,
      this.countryFilter,
      this.zipcodeFilter,
      this.maxScoreFilter == null ? this.maxScoreFilterEmpty : this.maxScoreFilter,
      this.minScoreFilter == null ? this.minScoreFilterEmpty : this.minScoreFilter,
      this.maxActionTypeIdFilter == null ? this.maxActionTypeIdFilterEmpty : this.maxActionTypeIdFilter,
      this.minActionTypeIdFilter == null ? this.minActionTypeIdFilterEmpty : this.minActionTypeIdFilter,
      this.webURLFilter,
      this.targetTitleTitleFilter,
      this.leadTemperatureTemperatureFilter,
      this.leadSourceSourceNameFilter,
      this.leadStageStageNameFilter,
      this.leadStatusStatusNameFilter,
      this.fromDate,
      this.toDate,
      this.paralegalId,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }

  viewContact(obj) {
    this._router.navigate(['/customer/contacts/contactdetail', obj.contact.id, obj.contact.userId, obj.contact.firstname + ' ' + obj.contact.lastname, obj.contact.phone])
    this._ContactService.editObj = obj;
  }

  editContact(obj) {
    this.editProject = obj;
    this.modalService.open(this.createModal, { size: 'xl' });
  }


  filterRecords() {
    this.getContacts();
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
          if (this.deleteProject(pmProjectStatus.contact)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Record has been deleted.',
              'success'
            );
            location.reload();
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }

  deleteProject(data): boolean {
    return this._ContactService.delete(data.id).then(res => {
      if (res.success)
        return true;
      else
        return false;
    });
  }


  clearForm() {
    this.filterText = "";
    this.companyFilter = "";
    this.firstnameFilter = "";
    this.lastnameFilter = "";
    this.emailFilter = "";
    this.phoneFilter = "";
    this.extensionFilter = "";
    this.maxPreferredTime1Filter = undefined
    this.minPreferredTime1Filter = undefined
    this.maxPreferredTime2Filter = undefined
    this.minPreferredTime2Filter = undefined
    this.address1Filter = "";
    this.address2Filter = "";
    this.cityFilter = "";
    this.stateFilter = "";
    this.countryFilter = "";
    this.zipcodeFilter = "";
    this.maxScoreFilter = null;
    this.minScoreFilter = null;
    this.maxActionTypeIdFilter = null;
    this.minActionTypeIdFilter = null;
    this.webURLFilter = "";
    this.targetTitleTitleFilter = "";
    this.leadTemperatureTemperatureFilter = "";
    this.leadSourceSourceNameFilter = "";
    this.leadStageStageNameFilter = "";
    this.leadStatusStatusNameFilter = "";
    this.fromDate = undefined;
    this.toDate = undefined;
    this.getContacts();
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
    this.getContacts();
  }

  //#endregion
  customFilterCallback(filter: (a) => void, value: any): void {

    filter(value);
    this.hideFilterPopup();
  }
  hideFilterPopup() {
    var currPopup = document.getElementsByClassName("p-column-filter-menu-button-open")[0] as HTMLElement;
    currPopup.click();
  }

}
