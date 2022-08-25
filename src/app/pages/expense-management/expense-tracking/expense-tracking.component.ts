import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ExpenseTrackingService } from 'src/app/core/services/expense-tracking.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-tracking',
  templateUrl: './expense-tracking.component.html',
  //styleUrls: ['./expense-tracking.component.scss']
})
export class ExpenseTrackingComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  attatchmentFilter = '';
  descriptionFilter = '';
  quickBookVendorIdFilter = '';
  maxStartDateFilter: Date;
  minStartDateFilter: Date;
  maxEndDateFilter: Date;
  minEndDateFilter: Date;
  lawfirmServiceServicesNameFilter = '';
  serviceExpenseTypeSpentTypeFilter = '';
  contactFirstnameFilter = '';
  crmVendorFirstNameFilter = '';

  viewExpenseTracking: any;
  editExpenseTracking: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  expenseTrackingList: any;
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
      primaryKey: 'serviceExpenseTypeSpentType',
      header: 'SpentType',
    },
    {
      primaryKey: 'contactFirstname',
      header: 'Contact',
    },
    {
      primaryKey: 'crmVendorFirstName',
      header: 'Vendor',
    },
    {
      primaryKey: 'expenseTracking.startDate',
      header: 'StartDate',
    },
    {
      primaryKey: 'expenseTracking.endDate',
      header: 'EndDate',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewExpenseTracking = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._expenseTrackingService.getExpenseTrackingForEdit(obj.expenseTracking.id).then(s => {
          this.hideLoader();
          this.editExpenseTracking = s.result.expenseTracking;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.expenseTracking.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _expenseTrackingService: ExpenseTrackingService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Expenses' }, { label: 'ExpenseManager', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();

    this._expenseTrackingService.getAll(
      this.filterText,
      this.attatchmentFilter,
      this.descriptionFilter,
      this.quickBookVendorIdFilter,
      this.maxStartDateFilter,
      this.minStartDateFilter,
      this.maxEndDateFilter,
      this.minEndDateFilter,
      this.lawfirmServiceServicesNameFilter,
      this.serviceExpenseTypeSpentTypeFilter,
      this.contactFirstnameFilter,
      this.crmVendorFirstNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.expenseTrackingList = res.result.items;
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
    this.editExpenseTracking = null;
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
          this._expenseTrackingService.delete(id)
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
