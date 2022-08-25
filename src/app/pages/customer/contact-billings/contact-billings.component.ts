import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ContactBillingService } from 'src/app/core/services/contact-billing.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-billings',
  templateUrl: './contact-billings.component.html',
  //styleUrls: ['./contact-billings.component.scss']
})
export class ContactBillingsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  cardNameFilter = '';
  cardNumberFilter = '';
  maxExpirationYearFilter: number;
  maxExpirationYearFilterEmpty: number;
  minExpirationYearFilter: number;
  minExpirationYearFilterEmpty: number;
  maxExpirationMonthFilter: number;
  maxExpirationMonthFilterEmpty: number;
  minExpirationMonthFilter: number;
  minExpirationMonthFilterEmpty: number;
  primaryCCFilter = -1;
  address1Filter = '';
  address2Filter = '';
  cityFilter = '';
  stateFilter = '';
  countryFilter = '';
  zipcodeFilter = '';
  gatewayFilter = '';
  gatewayCustomerCodeFilter = '';
  gatewayTokenFilter = '';
  contactCompanyFilter = '';

  viewContactBilling: any;
  editContactBilling: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  contactBillingList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

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
      primaryKey: 'contactCompany',
      header: 'Company',
    },
    {
      primaryKey: 'contactBilling.cardName',
      header: 'CardName',
    },
    {
      primaryKey: 'contactBilling.cardNumber',
      header: 'CardNumber',
    },
    {
      primaryKey: 'contactBilling.expirationYear',
      header: 'ExpirationYear',
    },
    {
      primaryKey: 'contactBilling.expirationMonth',
      header: 'ExpirationMonth',
    },
    {
      primaryKey: 'contactBilling.primaryCC',
      header: 'PrimaryCC',
    },
    {
      primaryKey: 'contactBilling.address1',
      header: 'Address1',
    },
    {
      primaryKey: 'contactBilling.address2',
      header: 'Address2',
    },
    {
      primaryKey: 'contactBilling.city',
      header: 'City',
    },
    {
      primaryKey: 'contactBilling.state',
      header: 'State',
    },
    {
      primaryKey: 'contactBilling.country',
      header: 'Country',
    },
    {
      primaryKey: 'contactBilling.zipcode',
      header: 'ZipCode',
    },
    {
      primaryKey: 'contactBilling.gateway',
      header: 'Gateway',
    },
    {
      primaryKey: 'contactBilling.gatewayCustomerCode',
      header: 'GatewayCustomerCode',
    },
    {
      primaryKey: 'contactBilling.gatewayToken',
      header: 'GatewayToken',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewContactBilling = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._contactBillingService.getContactBillingForEdit(obj.contactBilling.id).then(s => {
          this.hideLoader();
          this.editContactBilling = s.result.contactBilling;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.contactBilling.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _contactBillingService: ContactBillingService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'ContactBillings' }, { label: 'List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();

    this._contactBillingService.getAll(
      this.filterText,
      this.cardNameFilter,
      this.cardNumberFilter,
      this.maxExpirationYearFilter == null ? this.maxExpirationYearFilterEmpty : this.maxExpirationYearFilter,
      this.minExpirationYearFilter == null ? this.minExpirationYearFilterEmpty : this.minExpirationYearFilter,
      this.maxExpirationMonthFilter == null ? this.maxExpirationMonthFilterEmpty : this.maxExpirationMonthFilter,
      this.minExpirationMonthFilter == null ? this.minExpirationMonthFilterEmpty : this.minExpirationMonthFilter,
      this.primaryCCFilter,
      this.address1Filter,
      this.address2Filter,
      this.cityFilter,
      this.stateFilter,
      this.countryFilter,
      this.zipcodeFilter,
      this.gatewayFilter,
      this.gatewayCustomerCodeFilter,
      this.gatewayTokenFilter,
      this.contactCompanyFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.contactBillingList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
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
    this.editContactBilling = null;
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
          this._contactBillingService.delete(id)
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
}
