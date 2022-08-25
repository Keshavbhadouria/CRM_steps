import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { ContactPaymentPlanService } from 'src/app/core/services/contact-payment-plan.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'contact-payment-plan',
  templateUrl: './contact-payment-plan.component.html',
  //styleUrls: ['./contact-payment-plan.component.scss']
})
export class ContactPaymentPlanComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  maxBalanceFilter: number;
  maxBalanceFilterEmpty: number;
  minBalanceFilter: number;
  minBalanceFilterEmpty: number;
  maxDownpaymentFilter: number;
  maxDownpaymentFilterEmpty: number;
  minDownpaymentFilter: number;
  minDownpaymentFilterEmpty: number;
  maxPaymentsFilter: number;
  maxPaymentsFilterEmpty: number;
  minPaymentsFilter: number;
  minPaymentsFilterEmpty: number;
  maxPaymentsAmountFilter: number;
  maxPaymentsAmountFilterEmpty: number;
  minPaymentsAmountFilter: number;
  minPaymentsAmountFilterEmpty: number;
  maxFirstQuotaDateFilter: Date;
  minFirstQuotaDateFilter: Date;
  paymentPlanNumberFilter = '';
  paymentPlanQRCodeFilter = '';
  contactInvoiceHeaderGatewayFilter = '';
  contactCompanyFilter = '';
  userNameFilter = '';
  contactId: number;

  viewPhoneCall: any;
  editPaymentPlan: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  phoneCallList: any;
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
      primaryKey: 'contactCompany',
      header: 'Contact Name',
    },
    {
      primaryKey: 'paymentPlanHeader.balance',
      header: 'Balance',
    },
    {
      primaryKey: 'paymentPlanHeader.downpayment',
      header: 'downpayment',
    },
    {
      primaryKey: 'paymentPlanHeader.paymentsAmount',
      header: 'Pending',
    },
    {
      primaryKey: 'paymentPlanHeader.payments',
      header: 'payments',
    },
    {
      primaryKey: 'paymentPlanHeader.firstQuotaDate',
      header: 'FirstQuotaDate',
      format: PipeFormat.DATE
    },

  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewPhoneCall = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    // {
    //   title: 'Edit',
    //   func: (obj) => {
    //     this.showLoader();
    //     this._contactPaymentPlanService.getcontactProductQuestionForEdit(obj.contactPhoneCallHistory.id).then(s => {
    //       this.hideLoader();
    //       this.editPhoneCall = s.result.contactProductQuestion;
    //       this.modalService.open(this.createModal, this.ngbModalOptions);
    //     });
    //   },
    //   icon: '../../../../assets/icons/editIcon.png'
    // },
    // {
    //   title: 'Delete',
    //   func: (obj) => {
    //     this.onDelete(obj.contactProductQuestion.id);
    //   },
    //   icon: '../../../../assets/icons/deleteIcon.png'
    // },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService, private route: ActivatedRoute,
    private modalService: NgbModal,
    private _contactPaymentPlanService: ContactPaymentPlanService,
    private translate: TranslateService) {


  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'PaymentPlan', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.paginationSettings.getRecords = () => this.getRecords();

    if (!this.contactId) {
      this.buttonSettings.push({
        title: 'Edit',
        func: (obj) => {
          this.showLoader();
          this._contactPaymentPlanService.getPaymentPlanHeaderForEdit(obj.paymentPlanHeader.id).then(s => {
            this.hideLoader();
            this.editPaymentPlan = s.result.paymentPlanHeader;
            this.modalService.open(this.createModal, this.ngbModalOptions);
          });
        },
        icon: '../../../../assets/icons/editIcon.png'
      });

      this.buttonSettings.push({
        title: 'Delete',
        func: (obj) => {
          this.onDelete(obj.paymentPlanHeader.id);
        },
        icon: '../../../../assets/icons/deleteIcon.png'
      });
    }
  }

  onEditPayment(obj){
    this.showLoader();
    this._contactPaymentPlanService.getPaymentPlanHeaderForEdit(obj.paymentPlanHeader.id).then(s => {
      this.hideLoader();
      this.editPaymentPlan = s.result.paymentPlanHeader;
      this.modalService.open(this.createModal, this.ngbModalOptions);
    });
  }
  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();
    if (event.filters != null) {
      if (Array.isArray(event.filters.contact))
        this.contactCompanyFilter = event.filters.contact[0].value;
     
    }  

    this._contactPaymentPlanService.getAllByFilters(
      this.filterText,
      this.contactId,
      this.maxBalanceFilter == null ? this.maxBalanceFilterEmpty : this.maxBalanceFilter,
      this.minBalanceFilter == null ? this.minBalanceFilterEmpty : this.minBalanceFilter,
      this.maxDownpaymentFilter == null ? this.maxDownpaymentFilterEmpty : this.maxDownpaymentFilter,
      this.minDownpaymentFilter == null ? this.minDownpaymentFilterEmpty : this.minDownpaymentFilter,
      this.maxPaymentsFilter == null ? this.maxPaymentsFilterEmpty : this.maxPaymentsFilter,
      this.minPaymentsFilter == null ? this.minPaymentsFilterEmpty : this.minPaymentsFilter,
      this.maxPaymentsAmountFilter == null ? this.maxPaymentsAmountFilterEmpty : this.maxPaymentsAmountFilter,
      this.minPaymentsAmountFilter == null ? this.minPaymentsAmountFilterEmpty : this.minPaymentsAmountFilter,
      this.maxFirstQuotaDateFilter,
      this.minFirstQuotaDateFilter,
      this.paymentPlanNumberFilter,
      this.paymentPlanQRCodeFilter,
      this.contactInvoiceHeaderGatewayFilter,
      this.contactCompanyFilter,
      this.userNameFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }

  // loadDropDown() {
  //   this.showLoader();
  //   const promises = [
  //     this._contactPaymentPlanService.getAllPaymentStatusForLookupTable(),
  //   ];
  //   Promise.all(promises)
  //     .then(data => {
  //       if (data.length > 0) {
  //         this.paymentStatuses = data[0].result;
  //       }
  //       this.hideLoader();
  //     });
  // }


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
    this.editPaymentPlan = null;
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
          this._contactPaymentPlanService.delete(id)
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

  clearForm() {
    this.filterText = "";
    this.maxBalanceFilter = null;
    this.minBalanceFilter = null;
    this.maxDownpaymentFilter = null;
    this.minDownpaymentFilter = null;
    this.maxPaymentsFilter = null;
    this.minPaymentsFilter = null;
    this.maxPaymentsAmountFilter = null;
    this.minPaymentsAmountFilter = null;
    this.maxFirstQuotaDateFilter = undefined;
    this.minFirstQuotaDateFilter = undefined;
    this.paymentPlanNumberFilter = "";
    this.paymentPlanQRCodeFilter = "";
    this.contactInvoiceHeaderGatewayFilter = "";
    this.contactCompanyFilter = "";
    this.userNameFilter = "";
    this.getRecords();
  }

  customFilterCallback(filter: (a) => void, value: any): void {

    filter(value);
    this.hideFilterPopup();
  }
  hideFilterPopup() {
    var currPopup = document.getElementsByClassName("p-column-filter-menu-button-open")[0] as HTMLElement;
    currPopup.click();
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getRecords(event);
  }
  clearQuotaDate(event) {
    this.hideFilterPopup();
    this.maxFirstQuotaDateFilter = undefined;
    this.minFirstQuotaDateFilter = undefined;
    this.getRecords(event);
  }
  clearPending(event) {
    this.hideFilterPopup();
    this.minPaymentsAmountFilter = undefined;
    this.maxPaymentsAmountFilter = undefined;
    this.getRecords(event);
  }
  clearDownPayment(event){
    this.hideFilterPopup();
    this.minDownpaymentFilter = undefined;
    this.maxDownpaymentFilter = undefined;
    this.getRecords(event);
  }
  clearBalance(event){
    this.hideFilterPopup();
    this.minBalanceFilter = undefined;
    this.maxBalanceFilter = undefined;
    this.getRecords(event);
  }
}
