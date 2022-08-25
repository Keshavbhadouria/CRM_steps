import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { ContactPaymentHistoriesService } from 'src/app/core/services/contact-payment-histories.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'contact-payment-history',
  templateUrl: './contact-payment-history.component.html',
  //styleUrls: ['./contact-payment-history.component.scss']
})
export class ContactPaymentHistoryComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  maxPaymentAmountFilter: number;
  maxPaymentAmountFilterEmpty: number;
  minPaymentAmountFilter: number;
  minPaymentAmountFilterEmpty: number;
  maxPaymentDateFilter: Date;
  minPaymentDateFilter: Date;
  commentFilter = '';
  gatewayNameFilter = '';
  gatewayResponseFilter = '';
  refundedFilter = -1;
  maxRefundDateFilter: Date;
  contactId: number;
  minRefundDateFilter: Date;
  voidFilter = -1;
  maxVoidedDateFilter: Date;
  minVoidedDateFilter: Date;
  contactFirstnameFilter = '';
  userNameFilter = '';
  userName2Filter = '';
  contactPaymentHistoryGatewayNameFilter = '';
  crmPaymentMethodNameFilter = '';


  viewPhoneCall: any;
  contactPaymentRefund: any;
  editPaymentHistory: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  phoneCallList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('refundModal') refundModal: ElementRef;
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
      primaryKey: 'contactFirstname',
      header: 'Contact Name',
    },
    {
      primaryKey: 'contactPaymentHistory.paymentDate',
      header: 'paymentDate',
      format: PipeFormat.DATE
    },
    {
      primaryKey: 'contactPaymentHistory.refundDate',
      header: 'refundDate',
      format: PipeFormat.DATE
    },
    {
      primaryKey: 'contactPaymentHistory.voidedDate',
      header: 'voidedDate',
      format: PipeFormat.DATE
    },
    {
      primaryKey: 'contactPaymentHistory.paymentAmount',
      header: 'paymentAmount',
      format: PipeFormat.CURRENCY
    },

    {
      primaryKey: 'contactPaymentHistory.refunded',
      header: 'refunded',
    },
    {
      primaryKey: 'contactPaymentHistory.void',
      header: 'void',
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
    {
      title: 'Refund',
      func: (obj) => {
        if (!obj.contactPaymentHistory.externalPaymentId)
           return this._messageService.showError('Error', 'Amount is not paid yet, you cannot refund!');

        this.contactPaymentRefund = obj;
        this.modalService.open(this.refundModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Refund_Payments_color.svg'
    }
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService, private route: ActivatedRoute,
    private modalService: NgbModal,
    private _contactPaymentHistoriesService: ContactPaymentHistoriesService,
    private translate: TranslateService) {


  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Payment History', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.paginationSettings.getRecords = () => this.getRecords();

    if (!this.contactId) {
      this.buttonSettings.push({
        title: 'Edit',
        func: (obj) => {
          this.showLoader();
          this._contactPaymentHistoriesService.getContactPaymentHistoryForEdit(obj.contactPaymentHistory.id).then(s => {
            this.hideLoader();
            this.editPaymentHistory = s.result.contactPaymentHistory;
            this.modalService.open(this.createModal, this.ngbModalOptions);
          });
        },
        icon: '../../../../assets/icons/editIcon.svg'
      });
      this.buttonSettings.push({
        title: 'Delete',
        func: (obj) => {
          this.onDelete(obj.contactPaymentHistory.id);
        },
        icon: '../../../../assets/icons/deleteIcon.svg'
      });

    }


  }

  getRecords() {
    this.showLoader();
    this._contactPaymentHistoriesService.getAll(
      this.filterText,
      this.maxPaymentAmountFilter == null ? this.maxPaymentAmountFilterEmpty : this.maxPaymentAmountFilter,
      this.minPaymentAmountFilter == null ? this.minPaymentAmountFilterEmpty : this.minPaymentAmountFilter,
      this.maxPaymentDateFilter,
      this.minPaymentDateFilter,
      this.commentFilter,
      this.gatewayNameFilter,
      this.gatewayResponseFilter,
      this.refundedFilter,
      this.contactId,
      this.maxRefundDateFilter,
      this.minRefundDateFilter,
      this.voidFilter,
      this.maxVoidedDateFilter,
      this.minVoidedDateFilter,
      this.contactFirstnameFilter,
      this.userNameFilter,
      this.userName2Filter,
      this.contactPaymentHistoryGatewayNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
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

  // loadDropDown() {
  //   this.showLoader();
  //   const promises = [
  //     this._contactPaymentHistoriesService.getAllPaymentStatusForLookupTable(),
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
    this.editPaymentHistory = null;
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
          this._contactPaymentHistoriesService.delete(id)
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
