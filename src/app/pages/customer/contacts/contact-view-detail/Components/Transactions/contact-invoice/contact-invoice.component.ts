import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { ContactInvoiceService } from 'src/app/core/services/contact-invoice.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'contact-invoice',
  templateUrl: './contact-invoice.component.html',
  //styleUrls: ['./contact-invoice.component.scss']
})
export class ContactInvoiceComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  reteinerCodeFilter = '';
  maxSubTotalFilter: number;
  maxSubTotalFilterEmpty: number;
  minSubTotalFilter: number;
  minSubTotalFilterEmpty: number;
  maxTaxFilter: number;
  maxTaxFilterEmpty: number;
  minTaxFilter: number;
  minTaxFilterEmpty: number;
  maxTotalFilter: number;
  maxTotalFilterEmpty: number;
  minTotalFilter: number;
  minTotalFilterEmpty: number;
  paidFilter = -1;
  gatewayFilter = '';
  transactionIDFilter = '';
  gatewayResponseFilter = '';
  refundedFilter = -1;
  maxRefundedDateFilter: moment.Moment;
  minRefundedDateFilter: moment.Moment;
  maxRefundedAmountFilter: number;
  maxRefundedAmountFilterEmpty: number;
  minRefundedAmountFilter: number;
  minRefundedAmountFilterEmpty: number;
  refundedReasonFilter = '';
  refundedByFilter = '';
  voidedFilter = -1;
  voidedByFilter = '';
  maxVoidedDateFilter: moment.Moment;
  minVoidedDateFilter: moment.Moment;
  quickBookTransactionIDFilter = '';
  postedQuickBookFilter = -1;
  invoiceCodeFilter = '';
  contactQuoteHeaderTotalFilter: number;
  maxCreatedDateFilter: moment.Moment;
  minCreatedDateFilter: moment.Moment;
  paymentStatuses: DropdownDto[] = [];
  PaymentStatusFilter: number = -1;
  contactId: number;

  viewPhoneCall: any;
  editInvoiceHeader: any;
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
  contactNameFilter: string;
  contactEmailFilter: string;
  yesNoLst = [{id:"1", displayName:"True"},{id:"0", displayName:"False"}]
  //#region Table Configurations

  //#endregion

  constructor(private _messageService: MessageService, private route: ActivatedRoute,
    private modalService: NgbModal,
    private _contactInvoiceService: ContactInvoiceService,
    private translate: TranslateService) {

    this.loadDropDown();

  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Invoices', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
  }

  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }
    if( this.PaymentStatusFilter == null){
      this.PaymentStatusFilter = 0;
    }

    if (event.filters != null) {
      if (Array.isArray(event.filters.invoiceCode))
        this.invoiceCodeFilter = event.filters.invoiceCode[0].value;
      if (Array.isArray(event.filters.contactName))
        this.contactNameFilter = event.filters.contactName[0].value;
      if (Array.isArray(event.filters.contactEmail))
        this.contactEmailFilter = event.filters.contactEmail[0].value;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._contactInvoiceService.getAll(
      this.filterText,
      this.reteinerCodeFilter,
      this.maxSubTotalFilter == null ? this.maxSubTotalFilterEmpty : this.maxSubTotalFilter,
      this.minSubTotalFilter == null ? this.minSubTotalFilterEmpty : this.minSubTotalFilter,
      this.maxTaxFilter == null ? this.maxTaxFilterEmpty : this.maxTaxFilter,
      this.minTaxFilter == null ? this.minTaxFilterEmpty : this.minTaxFilter,
      this.minTotalFilter == null ? this.minTotalFilterEmpty : this.minTotalFilter,
      this.minTotalFilter == null ? this.minTotalFilterEmpty : this.minTotalFilter,
      this.paidFilter,
      this.gatewayFilter,
      this.transactionIDFilter,
      this.gatewayResponseFilter,
      this.refundedFilter,
      this.maxRefundedDateFilter === undefined ? this.maxRefundedDateFilter : moment(this.maxRefundedDateFilter).endOf('day'),
      this.minRefundedDateFilter === undefined ? this.minRefundedDateFilter : moment(this.minRefundedDateFilter).startOf('day'),
      this.maxRefundedAmountFilter == null ? this.maxRefundedAmountFilterEmpty : this.maxRefundedAmountFilter,
      this.minRefundedAmountFilter == null ? this.minRefundedAmountFilterEmpty : this.minRefundedAmountFilter,
      this.refundedReasonFilter,
      this.refundedByFilter,
      this.voidedFilter,
      this.voidedByFilter,
      this.maxVoidedDateFilter === undefined ? this.maxVoidedDateFilter : moment(this.maxVoidedDateFilter).endOf('day'),
      this.minVoidedDateFilter === undefined ? this.minVoidedDateFilter : moment(this.minVoidedDateFilter).startOf('day'),
      this.quickBookTransactionIDFilter,
      this.postedQuickBookFilter,
      this.invoiceCodeFilter,
      this.contactQuoteHeaderTotalFilter,
      this.maxCreatedDateFilter === undefined ? this.maxCreatedDateFilter : moment(this.maxCreatedDateFilter).endOf('day'),
      this.minCreatedDateFilter === undefined ? this.minCreatedDateFilter : moment(this.minCreatedDateFilter).startOf('day'),
      this.PaymentStatusFilter,
      this.contactNameFilter,
      this.contactEmailFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactInvoiceService.getAllPaymentStatusForLookupTable(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.paymentStatuses = data[0].result;
        }
        this.hideLoader();
      });
  }


  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  filterRecords() {
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.editInvoiceHeader = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.getRecords();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }
  viewInvoice(obj) {
    this.viewPhoneCall = obj;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
  }
  editInvoice() {

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
          this._contactInvoiceService.delete(id)
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
    this.reteinerCodeFilter = "";
    this.maxSubTotalFilter = null;
    this.minSubTotalFilter = null;
    this.maxTaxFilter = null;
    this.minTaxFilter = null;
    this.minTotalFilter = null;
    this.minTotalFilter = null;
    this.paidFilter = -1;
    this.gatewayFilter = "";
    this.transactionIDFilter = "";
    this.gatewayResponseFilter = "";
    this.refundedFilter = -1;

    this.maxRefundedDateFilter = undefined;
    this.minRefundedDateFilter = undefined;
    this.maxRefundedAmountFilter = null;
    this.minRefundedAmountFilter = null;
    this.refundedReasonFilter = "";
    this.refundedByFilter = "";
    this.voidedFilter = -1;
    this.voidedByFilter = "";
    this.maxVoidedDateFilter = undefined;
    this.minVoidedDateFilter = undefined;
    this.quickBookTransactionIDFilter = "";
    this.postedQuickBookFilter = -1;
    this.invoiceCodeFilter = "";
    this.contactQuoteHeaderTotalFilter = null;
    this.maxCreatedDateFilter = undefined;
    this.minCreatedDateFilter = undefined;
    this.PaymentStatusFilter = -1;
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
  clearDate(event) {
    this.hideFilterPopup();
    this.minCreatedDateFilter = undefined;
    this.maxCreatedDateFilter = undefined;

    this.getRecords(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getRecords(event);
  }


}
