import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { TenantService } from 'src/app/core/services/tenant.service';

@Component({
  selector: 'app-subscription-payments',
  templateUrl: './subscription-payments.component.html',
  styleUrls: ['./subscription-payments.component.scss']
})
export class SubscriptionPaymentsComponent implements OnInit {

  isLoading = false;
  breadCrumbItems: Array<{}>;
  tenantList = [];

  advancedFiltersAreShown = false;
  subscriptionPayment: any;

  tenancyName: string = '';
  paymentPeriodId: number;
  statusId: number;
  PaymentGatewayId: number;
  filterText: string;
  creationDateRangeActive: boolean;
  subscriptionEndDateRangeActive: boolean;
  selectedEditionId: number;
  subscriptionDateRange: Date[] = [moment().startOf('day').toDate(), moment().add(30, 'days').endOf('day').toDate()];
  creationDateRange: Date[] = [moment().startOf('day').toDate(), moment().endOf('day').toDate()];
  @ViewChild('refundModal') refundModal: ElementRef;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();


  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'md'
  };
  //#region Table Configurations


 
  //#endregion

  myData: any[];

  paymentMethods: any = [{ id: 1, displayName: 'Paypal' }, { id: 2, displayName: 'Stripe' }]

  paymentPeriodList: any = [{ id: 1, displayName: 'Daily' }, { id: 7, displayName: 'Weekly' }, { id: 30, displayName: 'Monthly' }, { id: 365, displayName: 'Annually' }];

  paymentStatusList: any = [{ id: 1, displayName: 'NotPaid' }, { id: 2, displayName: 'Paid' }, { id: 3, displayName: 'Failed' }, { id: 4, displayName: 'Cancelled' }, { id: 5, displayName: 'Completed' }, { id: 6, displayName: 'Refund' }];
  creationStartDate: Date;
  creationEndDate: Date;
  subscriptionStartDate: Date;
  SubscriptionEndDate: Date;
  subscriptionEndDate: Date;
  editionLists: any;

  constructor(private _subscriptionServiceProxy: SubscriptionService, private modalService: NgbModal, private _tenantService: TenantService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Administration' }, { label: 'Subscription Payments', active: true }];
    this.loadDropdown();
    this._tenantService.getEditionsForCombobox(false).then(editionsResult => {
      this.editionLists = editionsResult.result.items;
    });
  }

  view(obj){
    this.subscriptionPayment = obj;
    this.modalService.open(this.refundModal, this.ngbModalOptions);
  }

  //#region Get


  loadDropdown() {
    this.showLoader();
    this._tenantService.getAllTenants().subscribe(res => {
      if (res.success) {
        this.tenantList = [];
        this.tenantList = res.result;
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  filterRecords() {
    this.getRecords();
  }


  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }
    if (event.filters != null) {
      if (Array.isArray(event.filters.tenancyName))
        this.tenancyName = event.filters.tenancyName[0].value;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._subscriptionServiceProxy.getAllPaymentHistory(
      this.tenancyName,
      this.paymentPeriodId,
      this.statusId,
      this.PaymentGatewayId,
      this.selectedEditionId,
      this.creationStartDate,
      this.creationEndDate,
      this.subscriptionStartDate,
      this.subscriptionEndDate,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getMaxResultCount(this.paginator, event),
      this.primengTableHelper.getSkipCount(this.paginator, event)
    ).toPromise().then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }


  //#endregion

  //#region Modal Callback

  modalEmitEvent() {
    this.closeModal();
  }

  closeModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


  //#region  Helper Methods

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
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
  clearDate(event) {
    this.hideFilterPopup();
    this.subscriptionEndDate = undefined;
    this.subscriptionStartDate = undefined;
    this.getRecords(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getRecords(event);
  }
  clearCreationDate(event) {
    this.hideFilterPopup();
    this.creationEndDate = undefined;
    this.creationStartDate = undefined;
    this.getRecords(event);
  }
}
