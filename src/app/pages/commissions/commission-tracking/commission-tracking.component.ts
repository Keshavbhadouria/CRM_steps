import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CommissionTrackingService } from 'src/app/core/services/commission-tracking.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commission-tracking',
  templateUrl: './commission-tracking.component.html',
  //styleUrls: ['./commission-tracking.component.scss']
})
export class CommissionTrackingComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  maxEarnedAmountFilter: number;
  maxEarnedAmountFilterEmpty: number;
  minEarnedAmountFilter: number;
  minEarnedAmountFilterEmpty: number;
  maxPaymentDateFilter: Date;
  minPaymentDateFilter: Date;
  campaignCampaignNameFilter = '';
  invoiceInvoiceNoFilter = '';
  commissionStatusStatusFilter = '';

  viewCommissionTracking: any;
  editCommissionTracking: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  commissionTrackingList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'md'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'campaignCampaignName',
      header: 'CampaignName',
    },
    {
      primaryKey: 'invoiceInvoiceNo',
      header: 'InvoiceNo',
    },
    {
      primaryKey: 'commissionStatusStatus',
      header: 'Status',
    },
    {
      primaryKey: 'commissionTracking.earnedAmount',
      header: 'EarnedAmount',
    },
    {
      primaryKey: 'commissionTracking.paymentDate',
      header: 'PaymentDate',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewCommissionTracking = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._commissionTrackingService.getCommissionTrackingForEdit(obj.commissionTracking.id).then(s => {
          this.hideLoader();
          this.editCommissionTracking = s.result.commissionTracking;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.commissionTracking.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _commissionTrackingService: CommissionTrackingService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Commissions' }, { label: 'CommissionTrackings', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._commissionTrackingService.getAll(
      this.filterText,
      this.maxEarnedAmountFilter == null ? this.maxEarnedAmountFilterEmpty : this.maxEarnedAmountFilter,
      this.minEarnedAmountFilter == null ? this.minEarnedAmountFilterEmpty : this.minEarnedAmountFilter,
      this.maxPaymentDateFilter,
      this.minPaymentDateFilter,
      this.campaignCampaignNameFilter,
      this.invoiceInvoiceNoFilter,
      this.commissionStatusStatusFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.commissionTrackingList = res.result.items;
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
    this.editCommissionTracking = null;
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
          this._commissionTrackingService.delete(id)
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
