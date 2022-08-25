import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ContactReviewService } from 'src/app/core/services/contact-review.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-revieew',
  templateUrl: './contact-revieew.component.html',
  styleUrls: ['./contact-revieew.component.scss']
})
export class ContactRevieewComponent implements OnInit {

  constructor(private _contactReviewService: ContactReviewService, private _messageService: MessageService, public modalService: NgbModal, private _router: Router) { }

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'md'
  };

  baseURL = environment.apiURL;
  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  maxTransparencyFilter: number;
  maxTransparencyFilterEmpty: number;
  minTransparencyFilter: number;
  minTransparencyFilterEmpty: number;
  maxCommunicationFilter: number;
  maxCommunicationFilterEmpty: number;
  minCommunicationFilter: number;
  minCommunicationFilterEmpty: number;
  maxProfessionalismFilter: number;
  maxProfessionalismFilterEmpty: number;
  minProfessionalismFilter: number;
  minProfessionalismFilterEmpty: number;
  maxRecommendedFilter: number;
  maxRecommendedFilterEmpty: number;
  minRecommendedFilter: number;
  minRecommendedFilterEmpty: number;
  maxAverageRatingFilter: number;
  maxAverageRatingFilterEmpty: number;
  minAverageRatingFilter: number;
  minAverageRatingFilterEmpty: number;
  commentsFilter = '';
  contactInvoiceHeaderInvoiceCodeFilter = '';
  paymentPlanDetailTransactionIDFilter = '';
  contactFirstnameFilter = '';

  editProject: any;
  viewProject: any;


  totalCount: number = 0;
  projectList: any;
  myData: any = [];

  // Create

  active = false;
  saving = false;


  paginationSettings: PaginationSettings = new PaginationSettings();

  //#endregion


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Review', active: true }];

  }

  //#region API Methods

  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    if (event.filters != null) {
      if (Array.isArray(event.filters.contactInvoiceHeaderInvoiceCode))
        this.contactInvoiceHeaderInvoiceCodeFilter = event.filters.contactInvoiceHeaderInvoiceCode[0].value;
      if (Array.isArray(event.filters.paymentPlanDetailTransactionID))
        this.paymentPlanDetailTransactionIDFilter = event.filters.paymentPlanDetailTransactionID[0].value;
      if (Array.isArray(event.filters.contactFirstname))
        this.contactFirstnameFilter = event.filters.contactFirstname[0].value;
      if (Array.isArray(event.filters.comments))
        this.commentsFilter = event.filters.comments[0].value;
    }

    this._contactReviewService.getAll(
      this.filterText,
      this.maxTransparencyFilter == null ? this.maxTransparencyFilterEmpty : this.maxTransparencyFilter,
      this.minTransparencyFilter == null ? this.minTransparencyFilterEmpty : this.minTransparencyFilter,
      this.maxCommunicationFilter == null ? this.maxCommunicationFilterEmpty : this.maxCommunicationFilter,
      this.minCommunicationFilter == null ? this.minCommunicationFilterEmpty : this.minCommunicationFilter,
      this.maxProfessionalismFilter == null ? this.maxProfessionalismFilterEmpty : this.maxProfessionalismFilter,
      this.minProfessionalismFilter == null ? this.minProfessionalismFilterEmpty : this.minProfessionalismFilter,
      this.maxRecommendedFilter == null ? this.maxRecommendedFilterEmpty : this.maxRecommendedFilter,
      this.minRecommendedFilter == null ? this.minRecommendedFilterEmpty : this.minRecommendedFilter,
      this.maxAverageRatingFilter == null ? this.maxAverageRatingFilterEmpty : this.maxAverageRatingFilter,
      this.minAverageRatingFilter == null ? this.minAverageRatingFilterEmpty : this.minAverageRatingFilter,
      this.commentsFilter,
      this.contactInvoiceHeaderInvoiceCodeFilter,
      this.paymentPlanDetailTransactionIDFilter,
      this.contactFirstnameFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }



  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  // onDelete(pmProjectStatus) {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger ms-2'
  //     },
  //     buttonsStyling: false
  //   });

  //   swalWithBootstrapButtons
  //     .fire({
  //       title: 'Are you sure?',
  //       text: 'You won\'t be able to revert this!',
  //       icon: 'warning',
  //       confirmButtonText: 'Yes, delete it!',
  //       cancelButtonText: 'No, cancel!',
  //       showCancelButton: true
  //     })
  //     .then(result => {
  //       if (result.value) {
  //         if (this.deleteProject(pmProjectStatus.contact)) {
  //           swalWithBootstrapButtons.fire(
  //             'Deleted!',
  //             'Record has been deleted.',
  //             'success'
  //           );
  //           this.myData = this.myData.filter(obj => { return obj !== pmProjectStatus });
  //         } else {
  //           this._messageService.showServerSideError();
  //         }
  //       }
  //     });
  // }

  // deleteProject(data): boolean {
  //   return this._contactReviewService.delete(data.id).then(res => {
  //     if (res.success)
  //       return true;
  //     else
  //       return false;
  //   });
  // }


  clearForm() {
    this.filterText = "";
    this.maxTransparencyFilter = null;
    this.minTransparencyFilter = null;
    this.maxCommunicationFilter = null;
    this.minCommunicationFilter = null;
    this.maxProfessionalismFilter = null
    this.minProfessionalismFilter = null;
    this.maxRecommendedFilter = null;
    this.minRecommendedFilter = null;
    this.maxAverageRatingFilter = null;
    this.minAverageRatingFilter = null;
    this.commentsFilter = "";
    this.contactInvoiceHeaderInvoiceCodeFilter = "";
    this.paymentPlanDetailTransactionIDFilter = " ";
    this.contactFirstnameFilter = "";
    this.getRecords();
  }




  //#endregion


  //#region Helper Methods

  toArray(obj) {
    let data = Object.keys(obj).map(i => obj[i]);
    return data[0];
  }

  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  openCreateModal(modal: any) {
    this.editProject = null;
    this.modalService.open(modal, { size: 'xl' });
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.paginationSettings.pageIndex = 0;
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
  clearTransparency(event) {
    this.hideFilterPopup();
    this.minTransparencyFilter = undefined;
    this.maxTransparencyFilter = undefined;
    this.getRecords(event);
  }
  clearCommunication(event) {
    this.hideFilterPopup();
    this.minCommunicationFilter = undefined;
    this.maxCommunicationFilter = undefined;
    this.getRecords(event);
  }
  clearRating(event) {
    this.hideFilterPopup();
    this.maxAverageRatingFilter = undefined;
    this.minAverageRatingFilter = undefined;
    this.getRecords(event);
  }
  clearRecommended(event) {
    this.hideFilterPopup();
    this.maxRecommendedFilter = undefined;
    this.minRecommendedFilter = undefined;
    this.getRecords(event);
  }
  clearProfessionalism(event) {
    this.hideFilterPopup();
    this.maxProfessionalismFilter = undefined;
    this.minProfessionalismFilter = undefined;
    this.getRecords(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getRecords(event);
  }
  
  //#endregion
}
