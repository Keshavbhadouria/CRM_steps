import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CustomersService } from 'src/app/core/services/customers.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  firstNameFilter = '';
  emailFilter = '';
  phoneNumberFilter = '';
  companyNameFilter = '';
  websiteFilter = '';
  addressFilter = '';
  addressSeconderyFilter = '';
  zipCodeFilter = '';
  isActiveFilter = -1;
  quickbooksCutomerIdFilter = '';
  crmCountryCountryNameFilter = '';
  crmStateStateNameFilter = '';
  crmCityCityNameFilter = '';


  viewCustomer: any;
  editCustomer: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'crmCountryCountryName',
      header: 'CountryName',
    },
    {
      primaryKey: 'crmStateStateName',
      header: 'StateName',
    },
    {
      primaryKey: 'crmCityCityName',
      header: 'CityName'
    },
    {
      primaryKey: 'crmCustomer.firstName',
      header: 'FirstName'
    },
    {
      primaryKey: 'crmCustomer.email',
      header: 'Email'
    },
    {
      primaryKey: 'crmCustomer.phoneNumber',
      header: 'PhoneNumber'
    },
    {
      primaryKey: 'crmCustomer.companyName',
      header: 'CompanyName'
    },
    {
      primaryKey: 'crmCustomer.website',
      header: 'Website'
    },
    {
      primaryKey: 'crmCustomer.address',
      header: 'Address'
    },
    {
      primaryKey: 'crmCustomer.addressSecondery',
      header: 'AddressSecondery'
    },
    {
      primaryKey: 'crmCustomer.zipCode',
      header: 'ZipCode'
    },
    {
      primaryKey: 'crmCustomer.quickbooksCutomerId',
      header: 'QuickbooksCutomerId'
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewCustomer = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editCustomer = obj.crmCustomer;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.crmCustomer.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  allCountries: any;
  allStates: any;
  allCities: any;
  //#endregion


  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _customerService: CustomersService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'Customer', active: true }];
    this.loadDropdown();
  }
  yesNoLst = [{id:"1", displayName:"Yes"},{id:"0", displayName:"No"}]
  loadDropdown() {
    const allPromises = [
      this._customerService.getAllCRMCountryForTableDropdown(),
      this._customerService.getAllCRMStates(),
      this._customerService.getAllCRMCities()
    ];

    Promise.all(allPromises).then(data => {
      this.allCountries = data[0].result;
      this.allStates = data[1].result;
      this.allCities = data[2].result;
    });
  }
  getRecords(event?: LazyLoadEvent) {

    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    if (event.filters != null) {
      if (Array.isArray(event.filters.firstName))
        this.firstNameFilter = event.filters.firstName[0].value;
      if (Array.isArray(event.filters.email))
        this.emailFilter = event.filters.email[0].value;
      if (Array.isArray(event.filters.phoneNumber))
        this.phoneNumberFilter = event.filters.phoneNumber[0].value;
      if (Array.isArray(event.filters.companyName))
        this.companyNameFilter = event.filters.companyName[0].value;
      if (Array.isArray(event.filters.website))
        this.websiteFilter = event.filters.website[0].value;
      if (Array.isArray(event.filters.address))
        this.addressFilter = event.filters.address[0].value;
      if (Array.isArray(event.filters.addressSecondery))
        this.addressSeconderyFilter = event.filters.addressSecondery[0].value;
      if (Array.isArray(event.filters.zipCode))
        this.zipCodeFilter = event.filters.zipCode[0].value;
      if (Array.isArray(event.filters.quickbooksCutomerId))
        this.quickbooksCutomerIdFilter = event.filters.quickbooksCutomerId[0].value;

    }

    this._customerService.getAll(
      this.filterText,
      this.firstNameFilter,
      this.emailFilter,
      this.phoneNumberFilter,
      this.companyNameFilter,
      this.websiteFilter,
      this.addressFilter,
      this.addressSeconderyFilter,
      this.zipCodeFilter,
      this.isActiveFilter,
      this.quickbooksCutomerIdFilter,
      this.crmCountryCountryNameFilter,
      this.crmStateStateNameFilter,
      this.crmCityCityNameFilter,
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
    this.editCustomer = null;
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
  }
  viewCustomers(obj) {
    this.viewCustomer = obj;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
  }
  editCustomers(obj) {
    this.editCustomer = obj.crmCustomer;
    this.modalService.open(this.createModal, this.ngbModalOptions);
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
          this._customerService.delete(id)
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
