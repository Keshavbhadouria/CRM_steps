import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ApplicationInfoDto, EditionPaymentType, SubscriptionPaymentType, SubscriptionStartType, TenantLoginInfoDto, UserLoginInfoDto } from 'src/app/core/models/Admin/Subscription';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { AppSessionService } from 'src/app/core/services/app-session.service';
import { AuditLogService } from 'src/app/core/services/audit-log.service';
import { MessageService } from 'src/app/core/services/message.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { NameValueDto } from 'src/app/core/services/supports.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  viewOperationLog: any;
  public dateRange: moment.Moment[] = [moment().startOf('day'), moment().endOf('day')];

  private startDate: Date = new Date();
  private endDate: Date = new Date();

  public usernameAuditLog: string;
  public usernameEntityChange: string;
  public serviceName: string;
  public methodName: string;
  public browserInfo: string;
  public hasException: boolean = undefined;
  public minExecutionDuration: number;
  public maxExecutionDuration: number;
  public entityTypeFullName: string;
  public objectTypes: NameValueDto[];
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;




  subscriptionStartType: typeof SubscriptionStartType = SubscriptionStartType;
  subscriptionPaymentType: typeof SubscriptionPaymentType = SubscriptionPaymentType;

  loading: boolean;
  user: UserLoginInfoDto = new UserLoginInfoDto();
  tenant: TenantLoginInfoDto = new TenantLoginInfoDto();
  application: ApplicationInfoDto = new ApplicationInfoDto();
  editionPaymentType: typeof EditionPaymentType = EditionPaymentType;

  filterText = '';

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };
  @ViewChild('viewModal') viewModal: ElementRef;

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'creationTime',
      header: 'ProcessTime',
    },
    {
      primaryKey: 'editionDisplayName',
      header: 'Edition',
    },
    {
      primaryKey: 'gateway',
      header: 'Gateway',
    },
    {
      primaryKey: 'amount',
      header: 'Amount',
    },
    {
      primaryKey: 'status',
      header: 'Status',
    },
    {
      primaryKey: 'paymentPeriodType',
      header: 'Period',
    },
    {
      primaryKey: 'dayCount',
      header: 'DayCount'
    },
    {
      primaryKey: 'externalPaymentId',
      header: 'PaymentId',
      },
    {
      primaryKey: 'invoiceNo',
      header: 'InvoiceNo',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    // {
    //   title: 'View',
    //   func: (obj) => {
    //     debugger;
    //     this.viewOperationLog = obj;
    //     this.modalService.open(this.viewModal, this.ngbModalOptions);
    //   },
    //   icon: '../../../../assets/icons/Visual.png'
    // },

  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  myData: any[];

  //#endregion

  constructor(private _messageService: MessageService,
    private _auditLogService: AuditLogService,
    private modalService: NgbModal,
    private _appSession: AppSessionService,
    private _subscriptionServiceProxy: SubscriptionService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Administration' }, { label: 'Subscription', active: true }];
    this.paginationSettings.getRecords = () => this.getPaymentHistory();
    this._auditLogService.getEntityHistoryObjectTypes()
    .then((result) => {
        this.objectTypes = result.result;
    });

    //this.getOperationLog();
    //this.getPaymentHistory();
    this.getSettings();
  }


  //#region Subscription

  getSettings(): void {
    this.showLoader()
    this._appSession.init().then(() => {
        this.user = this._appSession.user;
        this.tenant = this._appSession.tenant;
        this.application = this._appSession.application;
    }).finally(() => {
      this.hideLoader();
    });
  }

  hasRecurringSubscription(): boolean {
    return this.tenant.subscriptionPaymentType !== this.subscriptionPaymentType.Manual;
  }

  disableRecurringPayments() {
    this._subscriptionServiceProxy.disableRecurringPayments().subscribe(result => {
        this.tenant.subscriptionPaymentType = this.subscriptionPaymentType.RecurringManual;
    });
}

enableRecurringPayments() {
    this._subscriptionServiceProxy.enableRecurringPayments().subscribe(result => {
        this.tenant.subscriptionPaymentType = this.subscriptionPaymentType.RecurringAutomatic;
    });
}


  //#endregion

  //#region Payment History




  //#endregion

  getPaymentHistory() {
    this.showLoader();
    this._subscriptionServiceProxy.getPaymentHistory(
      null,
      this.paginationSettings.pageSize,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
    ).toPromise().then(res => {
      this.hideLoader();
      if (res.success) {
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
    this.getPaymentHistory();
  }



  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }


}
