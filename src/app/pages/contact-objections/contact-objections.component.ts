import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ContactObjectionService } from 'src/app/core/services/contact-objection.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-objections',
  templateUrl: './contact-objections.component.html',
  styleUrls: ['./contact-objections.component.scss']
})
export class ContactObjectionsComponent implements OnInit {
  contacts: any;
  tempratures: any;
  objections: any;



  constructor(private _contactObjectionService: ContactObjectionService, private _messageService: MessageService, public modalService: NgbModal) { }


  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();

  baseURL = environment.apiURL;
  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  activeFilter = -1;
  commentsFilter = '';
  contactCompanyFilter = '';
  objectionEntityObjectionFilter = '';
  leadTemperatureTemperatureFilter = '';

  editProject: any;
  viewProject: any;


  totalCount: number = 0;
  projectList: any;
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
      primaryKey: 'contactCompany',
      header: 'Contact Company',
    },
    {
      primaryKey: 'objectionEntityObjection',
      header: 'ContactObjection',
    },
    {
      primaryKey: 'leadTemperatureTemperature',
      header: 'Temperature',
    },
    {
      primaryKey: 'contactObjection.comments',
      header: 'Comments',
    },
    {
      primaryKey: 'contactObjection.active',
      header: 'Active',
    },

  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {

        this.viewProject = obj;
        this.modalService.open(this.viewModal, { size: 'md' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    // {
    //   title: 'Edit',
    //   func: (obj) => {
    //     this.editProject = obj;
    //     this.modalService.open(this.createModal, { size: 'md' });
    //   },
    //   icon: '../../../../assets/icons/editIcon.png'
    // },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();

  //#endregion
  yesNoLst=[{id:"0", displayName:"True"},{id:"0", displayName:"False"}]

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Objection List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.loadDropDown();
  }

  loadDropDown(){
    const allPromise = [
      this._contactObjectionService.getAllContactForDropdown(),
      this._contactObjectionService.getAllLeadTemperatureDropDown(),
      this._contactObjectionService.getAllObjectionEntityDropDown()
    ];

    Promise.all(allPromise).then(data=>{
      this.contacts = data[0].result;
      this.tempratures = data[1].result;
      this.objections = data[2].result;
    })
  }
  //#region API Methods

  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();
    if (event.filters != null) {
      if (Array.isArray(event.filters.comments))
        this.commentsFilter = event.filters.comments[0].value;
    }  


    this._contactObjectionService.getAll(
      this.filterText,
      this.activeFilter,
      this.commentsFilter,
      this.contactCompanyFilter,
      this.objectionEntityObjectionFilter,
      this.leadTemperatureTemperatureFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }

  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }
  onViewObjection(obj) {
    this.viewProject = obj;
    this.modalService.open(this.viewModal, { size: 'md' });
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
          if (this.deleteProject(pmProjectStatus.contactObjection)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.myData = this.myData.filter(obj => { return obj !== pmProjectStatus });
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }

  deleteProject(data): boolean {

    return this._contactObjectionService.delete(data.id).then(res => {
      if (res.success)
        return true;
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
    this.modalService.open(modal, { size: 'md' });
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


  onEditProject(item, modal) {
    this.editProject = item;
    this.modalService.open(modal, { size: 'md' });
  }

  onViewProject(item, modal) {
    this.viewProject = item;
    this.modalService.open(modal, { size: 'md' });
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
