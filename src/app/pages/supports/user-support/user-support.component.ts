import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { NameValueDto, SupportsService } from 'src/app/core/services/supports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-support',
  templateUrl: './user-support.component.html',
  styleUrls: ['./user-support.component.scss']
})
export class UserSupportComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  contactNameFilter = '';
  emailFilter = '';
  subjectFilter = '';
  bodyMessageFilter = '';
  attatchmentUrlFilter = '';
  userNameFilter = '';
  helpDeskStatusStatusNameFilter = '';
  createStartDateFilter: Date;
  createEndDateFilter: Date;

  allTickets: NameValueDto = new NameValueDto();
  newTickets: NameValueDto = new NameValueDto(); statuses: any;
  ;
  inProgressTickets: NameValueDto = new NameValueDto();;
  solvedTickets: NameValueDto = new NameValueDto();;
  isStatusProgress = false;
  isStatusAll = true;
  isStatusNew = false;
  isStatusSolved = false;

  viewSupport: any;
  editSupport: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  supportList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'userName',
      header: 'UserName',
    },
    {
      primaryKey: 'helpDeskStatusStatusName',
      header: 'Status',
    },
    {
      primaryKey: 'support.contactName',
      header: 'ContactName',
    },
    {
      primaryKey: 'support.email',
      header: 'Email',
    },
    {
      primaryKey: 'support.subject',
      header: 'Subject',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    // {
    //   title: 'View',
    //   func: (obj) => {
    //     this.viewSupport = obj;
    //     this.modalService.open(this.viewModal, this.ngbModalOptions);
    //   },
    //   icon: '../../../../assets/icons/Visual.png'
    // },
    {
      title: 'Edit',
      func: (obj) => {
        const url = this._router.serializeUrl(
          this._router.createUrlTree(['helpdesk/supportTicket/', obj.support.id])
        );
        window.open(url, '_blank');
        // this.showLoader();
        // this._supportsService.getSupportForEdit(obj.support.id).then(s => {
        //   this.hideLoader();
        //   this.editSupport = s.result.support;
        //   this.modalService.open(this.createModal, this.ngbModalOptions);
        // });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.support.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _supportsService: SupportsService,
    private translate: TranslateService,
    private _router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'HelpDesk' }, { label: 'Supports', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();

    this.getSupportTiles();

    this.getRecords();
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._supportsService.getAllHelpDeskStatusForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.statuses = data[0].result;
        }
        this.hideLoader();
      });
  }

  getSupportTiles(): void {
    this._supportsService.getSupportTicketTiles().then(r => {
      this.allTickets = r.result.filter(s => s.name === "All")[0];
      this.newTickets = r.result.filter(s => s.name === "New")[0];
      this.inProgressTickets = r.result.filter(s => s.name === "In Progress")[0];
      this.solvedTickets = r.result.filter(s => s.name === "Closed" || s.name === "Fixed" || s.name === "Solved")[0];
    });
  }

  buttonFilter(type: string): void {
    this.isStatusProgress = false;
    this.isStatusAll = false;
    this.isStatusNew = false;
    this.isStatusSolved = false;
    if (type === 'all') {
      this.isStatusAll = true;
      this.helpDeskStatusStatusNameFilter = '';
      this.getRecords();
    }
    else if (type === 'new') {
      this.isStatusNew = true;
      this.helpDeskStatusStatusNameFilter = 'New';
      this.getRecords();
    }
    else if (type === 'in progress') {
      this.isStatusProgress = true;
      this.helpDeskStatusStatusNameFilter = 'InProgress';
      this.getRecords();
    }
    else if (type === 'fixed') {
      this.isStatusSolved = true;
      this.helpDeskStatusStatusNameFilter = 'Fixed';
      this.getRecords();
    }
  }
  onEditSupport(obj) {
    const url = this._router.serializeUrl(
      this._router.createUrlTree(['helpdesk/supportTicket/', obj.support.id])
    );
    window.open(url, '_blank');
  }
  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    if (event.filters != null) {
      if (Array.isArray(event.filters.userName))
        this.userNameFilter = event.filters.userName[0].value;
      if (Array.isArray(event.filters.contactName))
        this.contactNameFilter = event.filters.contactName[0].value;
      if (Array.isArray(event.filters.email))
        this.emailFilter = event.filters.email[0].value;
      if (Array.isArray(event.filters.subject))
        this.subjectFilter = event.filters.subject[0].value;
    }


    this._supportsService.getAll(
      this.filterText,
      this.contactNameFilter,
      this.emailFilter,
      this.subjectFilter,
      this.bodyMessageFilter,
      this.attatchmentUrlFilter,
      this.userNameFilter,
      this.helpDeskStatusStatusNameFilter,
      this.createStartDateFilter,
      this.createEndDateFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
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
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.editSupport = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
    this.getSupportTiles();
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
        title: this.translate.instant('Areyousure?'),
        text: this.translate.instant('RevertMsg'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('confirmButtonTextMsg'),
        cancelButtonText: this.translate.instant('cancelButtonTextMsg'),
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._supportsService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess(this.translate.instant('Deleted!'),
                  this.translate.instant('RecordDeletedSuccessfully'));
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
