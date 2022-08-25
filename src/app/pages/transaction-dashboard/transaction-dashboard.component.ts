import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { MessageService } from 'src/app/core/services/message.service';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.scss']
})
export class TransactionDashboardComponent implements OnInit {

  paymentPlanData: any;
  paymentPlanLoading: boolean = false;

  successfulData: any;
  successfulDataLoading: boolean = false;

  failureData: any;
  failureDataLoading: boolean = false;

  refundData: any;
  refundDataLoading: boolean = false;

  primengTableHelperReasonFailure: PrimengTableHelper = new PrimengTableHelper();
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  primengTableHelperGatewayBehaviour: PrimengTableHelper = new PrimengTableHelper();
  @ViewChild('dataTable1', { static: true }) dataTable1: Table;
  @ViewChild('paginator1', { static: true }) paginator1: Paginator;
  breadCrumbItems: ({ label: string; active?: undefined; } | { label: string; active: boolean; })[];

  constructor(private _tenantDashboardService: TenantDashboardService,
    private _messageService: MessageService) {
      this.getPaymentPlanByDayWeekMonth();
      this.getSuccessfulPayments();
      this.getFailurePayments();
      this.getRefundByDayWeekMonth();
      this.breadCrumbItems = [{ label: 'TransactionDashboard' }, { label: 'TrainingVideos', active: true }];
     }

  ngOnInit(): void {
   

  }

  getPaymentPlanByDayWeekMonth(): void {
    this.paymentPlanLoading = true;
    this._tenantDashboardService.getPaymentPlanByDayWeekMonth()
      .then((response: any) => {
        this.paymentPlanLoading = false;
        if (response.success) {
          this.paymentPlanData = response.result;
        }
        else {
          this._messageService.showError("Payment Plan", "Something went wrong");
        }
      });
  }

  getSuccessfulPayments(): void {
    this.successfulDataLoading = true;
    this._tenantDashboardService.getSuccessfulPayments()
      .then((response: any) => {
        this.successfulDataLoading = false;
        if (response.success) {
          this.successfulData = response.result;
        }
        else {
          this._messageService.showError("Payment Plan", "Something went wrong");
        }
      });
  }

  getFailurePayments(): void {
    this.failureDataLoading = true;
    this._tenantDashboardService.getFailurePayments()
      .then((response: any) => {
        this.failureDataLoading = false;
        if (response.success) {
          this.failureData = response.result;
        }
        else {
          this._messageService.showError("Payment Plan", "Something went wrong");
        }
      });
  }

  getReasonToFailures(event?: LazyLoadEvent) {

    if (this.primengTableHelperReasonFailure.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelperReasonFailure.showLoadingIndicator();

    this._tenantDashboardService.getReasonToFailures(
      this.primengTableHelperReasonFailure.getSkipCount(this.paginator, event),
      this.primengTableHelperReasonFailure.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelperReasonFailure.totalRecordsCount = result.result.totalCount;
      this.primengTableHelperReasonFailure.records = result.result.items;
      this.primengTableHelperReasonFailure.hideLoadingIndicator();
    });
  }

  getGatewayBehaviours(event?: LazyLoadEvent) {

    if (this.primengTableHelperGatewayBehaviour.shouldResetPaging(event)) {
      this.paginator1.changePage(0);
      return;
    }

    this.primengTableHelperGatewayBehaviour.showLoadingIndicator();

    this._tenantDashboardService.getGatewayBehaviours(
      this.primengTableHelperGatewayBehaviour.getSkipCount(this.paginator1, event),
      this.primengTableHelperGatewayBehaviour.getMaxResultCount(this.paginator1, event)
    ).then(result => {
      this.primengTableHelperGatewayBehaviour.totalRecordsCount = result.result.totalCount;
      this.primengTableHelperGatewayBehaviour.records = result.result.items;
      this.primengTableHelperGatewayBehaviour.hideLoadingIndicator();
    });
  }

  getRefundByDayWeekMonth(): void {
    this.refundDataLoading = true;
    this._tenantDashboardService.getRefundByDayWeekMonth()
      .then((response: any) => {
        this.refundDataLoading = false;
        if (response.success) {
          this.refundData = response.result;
        }
        else {
          this._messageService.showError("Refunds", "Something went wrong");
        }
      });
  }

}
