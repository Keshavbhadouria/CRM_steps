import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { BillingInfoService } from 'src/app/core/services/billing-info.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html',
  //styleUrls: ['./billings.component.scss']
})
export class BillingsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  cardNameFilter = '';
  cardNumberFilter = '';
  maxExpirationMonthFilter: number;
  maxExpirationMonthFilterEmpty: number;
  minExpirationMonthFilter: number;
  minExpirationMonthFilterEmpty: number;
  maxExpirationYearFilter: number;
  maxExpirationYearFilterEmpty: number;
  minExpirationYearFilter: number;
  minExpirationYearFilterEmpty: number;
  cvvFilter = '';
  address1Filter = '';
  address2Filter = '';
  cityFilter = '';
  stateFilter = '';
  countryFilter = '';
  zipcodeFilter = '';
  gatewayFilter = '';
  gatewayCustomerCodeFilter = '';
  gatewayTokenFilter = '';

  viewBilling: any;
  editBilling: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  billingInfoList: any;
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
      primaryKey: 'billingInfo.cardName',
      header: 'CardName',
    },
    {
      primaryKey: 'billingInfo.cardNumber',
      header: 'CardNumber',
    },
    {
      primaryKey: 'billingInfo.expirationMonth',
      header: 'ExpirationMonth',
    },
    {
      primaryKey: 'billingInfo.expirationYear',
      header: 'ExpirationYear',
    },
    {
      primaryKey: 'billingInfo.cvv',
      header: 'CVV',
    },
    {
      primaryKey: 'billingInfo.address1',
      header: 'Address1',
    },
    {
      primaryKey: 'billingInfo.address2',
      header: 'Address2',
    },
    {
      primaryKey: 'billingInfo.city',
      header: 'City',
    },
    {
      primaryKey: 'billingInfo.state',
      header: 'State',
    },
    {
      primaryKey: 'billingInfo.country',
      header: 'Country',
    },
    {
      primaryKey: 'billingInfo.zipcode',
      header: 'ZipCode',
    },
    {
      primaryKey: 'billingInfo.gateway',
      header: 'Gateway',
    },
    {
      primaryKey: 'billingInfo.gatewayCustomerCode',
      header: 'GatewayCustomerCode',
    },
    {
      primaryKey: 'billingInfo.gatewayToken',
      header: 'GatewayToken',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewBilling = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._billingInfoService.getBillingInfoForEdit(obj.billingInfo.id).then(s => {
          this.hideLoader();
          this.editBilling = s.result.billingInfo;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.billingInfo.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _billingInfoService: BillingInfoService,
    private translate: TranslateService) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Billing' }, { label: 'List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    if (event.filters != null) {
      if (Array.isArray(event.filters.cardName))
        this.cardNameFilter = event.filters.cardName[0].value;
      if (Array.isArray(event.filters.cardNumber))
        this.cardNumberFilter = event.filters.cardNumber[0].value;
      if (Array.isArray(event.filters.cvv))
        this.cvvFilter = event.filters.cvv[0].value;
      if (Array.isArray(event.filters.address1))
        this.address1Filter = event.filters.address1[0].value;
      if (Array.isArray(event.filters.address2))
        this.address2Filter = event.filters.address2[0].value;
      if (Array.isArray(event.filters.city))
        this.cityFilter = event.filters.city[0].value;
      if (Array.isArray(event.filters.state))
        this.stateFilter = event.filters.state[0].value;
      if (Array.isArray(event.filters.country))
        this.countryFilter = event.filters.country[0].value;
      if (Array.isArray(event.filters.zipcode))
        this.zipcodeFilter = event.filters.zipcode[0].value;
      if (Array.isArray(event.filters.gateway))
        this.gatewayFilter = event.filters.gateway[0].value;
      if (Array.isArray(event.filters.gatewayCustomerCode))
        this.gatewayCustomerCodeFilter = event.filters.gatewayCustomerCode[0].value;
      if (Array.isArray(event.filters.gatewayToken))
        this.gatewayTokenFilter = event.filters.gatewayToken[0].value;
    }

    this._billingInfoService.getAll(
      this.filterText,
      this.cardNameFilter,
      this.cardNumberFilter,
      this.maxExpirationMonthFilter == null ? this.maxExpirationMonthFilterEmpty : this.maxExpirationMonthFilter,
      this.minExpirationMonthFilter == null ? this.minExpirationMonthFilterEmpty : this.minExpirationMonthFilter,
      this.maxExpirationYearFilter == null ? this.maxExpirationYearFilterEmpty : this.maxExpirationYearFilter,
      this.minExpirationYearFilter == null ? this.minExpirationYearFilterEmpty : this.minExpirationYearFilter,
      this.cvvFilter,
      this.address1Filter,
      this.address2Filter,
      this.cityFilter,
      this.stateFilter,
      this.countryFilter,
      this.zipcodeFilter,
      this.gatewayFilter,
      this.gatewayCustomerCodeFilter,
      this.gatewayTokenFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      debugger;
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
    this.editBilling = null;
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

  onViewBilling(obj) {
    this.viewBilling = obj;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
  }
  onEditBilling(obj) {
    this.showLoader();
    this._billingInfoService.getBillingInfoForEdit(obj.billingInfo.id).then(s => {
      this.hideLoader();
      this.editBilling = s.result.billingInfo;
      this.modalService.open(this.createModal, this.ngbModalOptions);
    });
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
          this._billingInfoService.delete(id)
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
  clearData(event) {
    this.hideFilterPopup();
    this.minExpirationMonthFilter = undefined,
    this.maxExpirationMonthFilter = undefined
    this.getRecords(event);
  }
  applyData(event) {
    this.hideFilterPopup();
    this.getRecords(event);
  }
  clearYearData(event){
    this.hideFilterPopup();
    this.minExpirationYearFilter = undefined,
    this.maxExpirationYearFilter = undefined
    this.getRecords(event);
  }
}
