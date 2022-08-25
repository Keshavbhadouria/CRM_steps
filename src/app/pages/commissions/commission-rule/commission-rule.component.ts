import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CommissionRuleService } from 'src/app/core/services/commission-rule.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commission-rule',
  templateUrl: './commission-rule.component.html',
  //styleUrls: ['./commission-rule.component.scss']
})
export class CommissionRuleComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  maxSalesAmountFilter: number;
  maxSalesAmountFilterEmpty: number;
  minSalesAmountFilter: number;
  minSalesAmountFilterEmpty: number;

  maxPercentageFilter: number;
  maxPercentageFilterEmpty: number;
  minPercentageFilter: number;
  minPercentageFilterEmpty: number;

  maxAffiliateCommissionFilter: number;
  maxAffiliateCommissionFilterEmpty: number;
  minAffiliateCommissionFilter: number;
  minAffiliateCommissionFilterEmpty: number;

  maxPayAfterDaysFilter: number;
  maxPayAfterDaysFilterEmpty: number;
  minPayAfterDaysFilter: number;
  minPayAfterDaysFilterEmpty: number;
  activeFilter = -1;
  affiliateTierTierNameFilter = '';

  viewCommissionRule: any;
  editCommissionRule: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  commissionRuleList: any;
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
      primaryKey: 'affiliateTierTierName',
      header: 'TierName',
    },
    {
      primaryKey: 'commissionRule.salesAmount',
      header: 'SalesAmount',
    },
    {
      primaryKey: 'commissionRule.percentage',
      header: 'ProjectName',
    },
    {
      primaryKey: 'commissionRule.affiliateCommission',
      header: 'AffiliateCommission',
    },
    {
      primaryKey: 'commissionRule.payAfterDays',
      header: 'PayAfterDays',
    },
    {
      primaryKey: 'commissionRule.active',
      header: 'Active',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewCommissionRule = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._commissionRuleService.getCommissionRuleForEdit(obj.commissionRule.id).then(s => {
          this.hideLoader();
          this.editCommissionRule = s.result.commissionRule;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.commissionRule.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _commissionRuleService: CommissionRuleService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Commissions' }, { label: 'CommissionRules', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._commissionRuleService.getAll(
      this.filterText,
      this.maxSalesAmountFilter == null ? this.maxSalesAmountFilterEmpty : this.maxSalesAmountFilter,
      this.minSalesAmountFilter == null ? this.minSalesAmountFilterEmpty : this.minSalesAmountFilter,
      this.maxPercentageFilter == null ? this.maxPercentageFilterEmpty : this.maxPercentageFilter,
      this.minPercentageFilter == null ? this.minPercentageFilterEmpty : this.minPercentageFilter,
      this.maxAffiliateCommissionFilter == null ? this.maxAffiliateCommissionFilterEmpty : this.maxAffiliateCommissionFilter,
      this.minAffiliateCommissionFilter == null ? this.minAffiliateCommissionFilterEmpty : this.minAffiliateCommissionFilter,
      this.maxPayAfterDaysFilter == null ? this.maxPayAfterDaysFilterEmpty : this.maxPayAfterDaysFilter,
      this.minPayAfterDaysFilter == null ? this.minPayAfterDaysFilterEmpty : this.minPayAfterDaysFilter,
      this.activeFilter,
      this.affiliateTierTierNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.commissionRuleList = res.result.items;
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
    this.editCommissionRule = null;
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
          this._commissionRuleService.delete(id)
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
