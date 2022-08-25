import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { VendorsService } from 'src/app/core/services/vendors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  //styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  firstNameFilter = '';
  lastNameFilter = '';
  companyFilter = '';
  emailFilter = '';
  phoneNoFilter = '';
  serviceFilter = '';
  payToFilter = '';
  primaryAddressFilter = '';
  secondaryAddressFilter = '';
  zipCodeFilter = '';
  quickBooksVendorIdFilter = '';
  crmCountryCountryNameFilter = '';
  crmStateStateNameFilter = '';
  crmCityCityNameFilter = '';
  crmInvoiceTermTermNameFilter = '';
  crmPaymentMethodNameFilter = '';

  viewVendor: any;
  editVendor: any;

  loading = false;
  createLoader = false;

  totalCount: number = 0;
  vendorList: any;
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
      primaryKey: 'crmCountryCountryName',
      header: 'CountryName',
    },
    {
      primaryKey: 'crmStateStateName',
      header: 'StateName',
    },
    {
      primaryKey: 'crmCityCityName',
      header: 'CityName',
    },
    {
      primaryKey: 'crmInvoiceTermTermName',
      header: 'TermName',
    },
    {
      primaryKey: 'crmPaymentMethodName',
      header: 'PaymentMethod',
    },
    {
      primaryKey: 'crmVendor.firstName',
      header: 'FirstName',
    },
    {
      primaryKey: 'crmVendor.lastName',
      header: 'LastName',
    },
    {
      primaryKey: 'crmVendor.company',
      header: 'Company',
    },
    {
      primaryKey: 'crmVendor.email',
      header: 'Email',
    },
    {
      primaryKey: 'crmVendor.phoneNo',
      header: 'PhoneNo',
    },
    {
      primaryKey: 'crmVendor.service',
      header: 'ServiceName',
    },
    {
      primaryKey: 'crmVendor.payTo',
      header: 'PayTo',
    },
    {
      primaryKey: 'crmVendor.primaryAddress',
      header: 'PrimaryAddress',
    },
    {
      primaryKey: 'crmVendor.secondaryAddress',
      header: 'SecondaryAddress',
    },
    {
      primaryKey: 'crmVendor.zipCode',
      header: 'ZipCode',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewVendor = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._vendorsService.getCRMVendorForEdit(obj.crmVendor.id).then(s => {
          this.hideLoader();
          this.editVendor = s.result.crmVendor;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.crmVendor.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _vendorsService: VendorsService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Expenses' }, { label: 'Vendors', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();

    this._vendorsService.getAll(
      this.filterText,
      this.firstNameFilter,
      this.lastNameFilter,
      this.companyFilter,
      this.emailFilter,
      this.phoneNoFilter,
      this.serviceFilter,
      this.payToFilter,
      this.primaryAddressFilter,
      this.secondaryAddressFilter,
      this.zipCodeFilter,
      this.quickBooksVendorIdFilter,
      this.crmCountryCountryNameFilter,
      this.crmStateStateNameFilter,
      this.crmCityCityNameFilter,
      this.crmInvoiceTermTermNameFilter,
      this.crmPaymentMethodNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.vendorList = res.result.items;
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
    this.editVendor = null;
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
          this._vendorsService.delete(id)
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
