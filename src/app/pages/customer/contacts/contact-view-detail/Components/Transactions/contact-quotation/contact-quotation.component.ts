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
import { ContactQuotationService } from 'src/app/core/services/contact-quotation.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'contact-quotation',
  templateUrl: './contact-quotation.component.html',
  //styleUrls: ['./contact-quotation.component.scss']
})
export class ContactQuotationComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  maxExpirationDateFilter: moment.Moment;
  minExpirationDateFilter: moment.Moment;
  maxSubTotalFilter: number;
  maxSubTotalFilterEmpty: number;
  minSubTotalFilter: number;
  minSubTotalFilterEmpty: number;
  maxTaxFilter: number;
  maxTaxFilterEmpty: number;
  minTaxFilter: number;
  minTaxFilterEmpty: number;
  totalFilter: number;
  commentsFilter = '';
  contactCompanyFilter = '';
  userNameFilter = '';
  statusFilter = '';
  quoteNoFilter: number;
  contactId: number;

  viewPhoneCall: any;
  editContactQuotation: any;
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
  contacts: any;
  users: any;
  minTotalFilter: number;

  //#region Table Configurations


  //#endregion

  constructor(private _messageService: MessageService, private route: ActivatedRoute,
    private modalService: NgbModal,
    private _contactQuotationService: ContactQuotationService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Estimate', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactQuotationService.getAllContactForTableDropdown(),
      this._contactQuotationService.getAllUserForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contacts = data[0].result;
          this.users = data[1].result;
        }
        this.hideLoader();
      });
  }
  onViewEstimate(obj) {
    this.viewPhoneCall = obj;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
  }
  onEditEstimate(obj) {
    this.showLoader();
    this._contactQuotationService.getContactQuoteHeaderForEdit(obj.contactQuoteHeader.id).then(s => {
      this.hideLoader();
      this.editContactQuotation = s.result.contactQuoteHeader;
      this.modalService.open(this.createModal, this.ngbModalOptions);
    });
  }
  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }
    if (event.filters != null) {
      if (Array.isArray(event.filters.quoteNo))
        this.quoteNoFilter = event.filters.quoteNo[0].value;
      if (Array.isArray(event.filters.status))
        this.statusFilter = event.filters.status[0].value;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._contactQuotationService.GetAllByFilters(
      this.filterText,
      this.contactId,
      this.maxExpirationDateFilter === undefined ? this.maxExpirationDateFilter : moment(this.maxExpirationDateFilter).endOf('day'),
      this.minExpirationDateFilter === undefined ? this.minExpirationDateFilter : moment(this.minExpirationDateFilter).startOf('day'),
      this.maxSubTotalFilter == null ? this.maxSubTotalFilterEmpty : this.maxSubTotalFilter,
      this.minSubTotalFilter == null ? this.minSubTotalFilterEmpty : this.minSubTotalFilter,
      this.maxTaxFilter == null ? this.maxTaxFilterEmpty : this.maxTaxFilter,
      this.minTaxFilter == null ? this.minTaxFilterEmpty : this.minTaxFilter,
      this.minTotalFilter,
      this.totalFilter,
      this.commentsFilter,
      this.contactCompanyFilter,
      this.userNameFilter,
      this.statusFilter,
      this.quoteNoFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
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
    this.editContactQuotation = null;
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
          this._contactQuotationService.delete(id)
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
    this.maxExpirationDateFilter = undefined;
    this.minExpirationDateFilter = undefined;
    this.maxSubTotalFilter = null;
    this.minSubTotalFilter = null
    this.maxTaxFilter = null
    this.minTaxFilter = null
    this.totalFilter = null
    this.commentsFilter = "";
    this.contactCompanyFilter = "";
    this.userNameFilter = "";
    this.statusFilter = "";
    this.quoteNoFilter = null;
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
    this.maxExpirationDateFilter = undefined;
    this.minExpirationDateFilter = undefined;
    this.getRecords(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getRecords(event);
  }
  clearTotalData(event){
    this.hideFilterPopup();
    this.minTotalFilter = undefined;
    this.totalFilter = undefined;
    this.getRecords(event);
  }

}
