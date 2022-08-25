import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { NameValueDto } from 'src/app/core/services/supports.service';
import { AuditLogService } from 'src/app/core/services/audit-log.service';
import { dateSelectionJoinTransformer } from '@fullcalendar/core';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {
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
      primaryKey: 'exception',
      header: 'Exception',
    },
    {
      primaryKey: 'userName',
      header: 'UserName',
    },
    {
      primaryKey: 'serviceName',
      header: 'Service',
    },
    {
      primaryKey: 'methodName',
      header: 'Action',
    },
    {
      primaryKey: 'clientIpAddress',
      header: 'IpAddress',
    },
    {
      primaryKey: 'clientName',
      header: 'Client',
    },
    {
      primaryKey: 'browserInfo',
      header: 'Browser'
    },
    {
      primaryKey: 'executionTime',
      header: 'Time',
      format: PipeFormat.DATE,
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        ;
        this.viewOperationLog = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  myData: any[];

  
  tableSettings1: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'changeTypeName',
      header: 'Action',
    },
    {
      primaryKey: 'entityTypeFullName',
      header: 'Object',
    },
    {
      primaryKey: 'userName',
      header: 'UserName',
    },
    {
      primaryKey: 'methodName',
      header: 'Action',
    },
    {
      primaryKey: 'changeTime',
      header: 'Time',
      format: PipeFormat.DATE,
    }
  ];

  buttonSettings1: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewOperationLog = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    
  ];

  paginationSettings1: PaginationSettings = new PaginationSettings();
  myData1: any[];

  loading: boolean;
  //#endregion

  constructor(private _messageService: MessageService,
    private _auditLogService: AuditLogService,
    private modalService: NgbModal,
    
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Admin' }, { label: 'AuditLog', active: true }];
    this.paginationSettings.getRecords = () => this.getAuditLog();
    this.paginationSettings1.getRecords = () => this.getOperationLog();
    this._auditLogService.getEntityHistoryObjectTypes()
    .then((result) => {
        this.objectTypes = result.result;
    });

    this.getOperationLog();
    this.getAuditLog();
  }
  getOperationLog() {
    this.showLoader();
    ;
    this._auditLogService.getEntityChanges(
      this.dateRange[0],
      this.dateRange[1].endOf('day'),
      this.usernameEntityChange,
      this.entityTypeFullName,
      null,
      this.paginationSettings.pageSize,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.myData1 = [];
        this.myData1 = res.result.items;
        this.paginationSettings1.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }
  getAuditLog() {
    this.showLoader();
    this._auditLogService.getAuditLogs(
      this.dateRange[0],
      this.dateRange[1],
      this.usernameAuditLog,
      this.serviceName,
      this.methodName,
      this.browserInfo,
      this.hasException,
      this.minExecutionDuration,
      this.maxExecutionDuration,
      null,
      this.paginationSettings.pageSize,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
    ).then(res => {
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
    this.getAuditLog();
  }

 

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }


}
