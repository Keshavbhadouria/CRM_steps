import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { BusinessKpiService } from 'src/app/core/services/business-kpi.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-business-kpi',
  templateUrl: './business-kpi.component.html',
  //styleUrls: ['./business-kpi.component.scss']
})
export class BusinessKpiComponent implements OnInit {
  primengTableHelper:PrimengTableHelper = new PrimengTableHelper();
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  kpiNameFilter = '';

  maxWeeklyTargetFilter: number;
  maxWeeklyTargetFilterEmpty: number;
  minWeeklyTargetFilter: number;
  minWeeklyTargetFilterEmpty: number;

  maxMonthlyTargetFilter: number;
  maxMonthlyTargetFilterEmpty: number;
  minMonthlyTargetFilter: number;
  minMonthlyTargetFilterEmpty: number;

  maxQuarterlyFilter: number;
  maxQuarterlyFilterEmpty: number;
  minQuarterlyFilter: number;
  minQuarterlyFilterEmpty: number;

  maxSemesterFilter: number;
  maxSemesterFilterEmpty: number;
  minSemesterFilter: number;
  minSemesterFilterEmpty: number;

  maxYearlyFilter: number;
  maxYearlyFilterEmpty: number;
  minYearlyFilter: number;
  minYearlyFilterEmpty: number;

  kpiCategoryKPIFilter = '';

  viewBusinessKPI: any;
  editBusinessKPI: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  businessKPIList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };
  kpiCategories: any;


  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _businessKPIService: BusinessKpiService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'KPI Management' }, { label: 'Business KPIs', active: true }];
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._businessKPIService.getAllKPICategoryForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.kpiCategories = data[0].result;
        }
        this.hideLoader();
      });
  }
  getBusinessKPIs(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
        this.paginator.changePage(0);
        return;
    }

    this.primengTableHelper.showLoadingIndicator();
    if (event.filters != null) {
      if (Array.isArray(event.filters.kpiName))
        this.kpiNameFilter = event.filters.kpiName[0].value;
    }


    this._businessKPIService.getAll(
        this.filterText,
        this.kpiNameFilter,
        this.maxWeeklyTargetFilter == null ? this.maxWeeklyTargetFilterEmpty: this.maxWeeklyTargetFilter,
        this.minWeeklyTargetFilter == null ? this.minWeeklyTargetFilterEmpty: this.minWeeklyTargetFilter,
        this.maxMonthlyTargetFilter == null ? this.maxMonthlyTargetFilterEmpty: this.maxMonthlyTargetFilter,
        this.minMonthlyTargetFilter == null ? this.minMonthlyTargetFilterEmpty: this.minMonthlyTargetFilter,
        this.maxQuarterlyFilter == null ? this.maxQuarterlyFilterEmpty: this.maxQuarterlyFilter,
        this.minQuarterlyFilter == null ? this.minQuarterlyFilterEmpty: this.minQuarterlyFilter,
        this.maxSemesterFilter == null ? this.maxSemesterFilterEmpty: this.maxSemesterFilter,
        this.minSemesterFilter == null ? this.minSemesterFilterEmpty: this.minSemesterFilter,
        this.maxYearlyFilter == null ? this.maxYearlyFilterEmpty: this.maxYearlyFilter,
        this.minYearlyFilter == null ? this.minYearlyFilterEmpty: this.minYearlyFilter,
        this.kpiCategoryKPIFilter,
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
    this.getBusinessKPIs();
  }

  openCreateModal(modal: any) {
    this.editBusinessKPI = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.getBusinessKPIs();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  editKpi(obj){
    this.editBusinessKPI = obj.businessKPI;
    this.modalService.open(this.createModal, this.ngbModalOptions);
  }

  viewKpi(obj){
    this.viewBusinessKPI = obj;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
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
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._businessKPIService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getBusinessKPIs();
                this._messageService.showSuccess('Deleted!', 'Business KPI deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
  customFilterCallback(filter: (a) => void, value: any): void {

    filter(value);
    this.hideFilterPopup();
  }
  hideFilterPopup() {
    var currPopup = document.getElementsByClassName("p-column-filter-menu-button-open")[0] as HTMLElement;
    currPopup.click();
  }
  clearYearlyFilter(event){
    this.hideFilterPopup();
    this.minYearlyFilter = undefined;
    this.maxYearlyFilter = undefined;
    this.getBusinessKPIs(event);
  }

  clearSemesterFilter(event){
    this.hideFilterPopup();
    this.minSemesterFilter = undefined;
    this.maxSemesterFilter = undefined;
    this.getBusinessKPIs(event);
  }
  clearQuarterlyFilter(event){
    this.hideFilterPopup();
    this.minQuarterlyFilter = undefined;
    this.maxQuarterlyFilter = undefined;
    this.getBusinessKPIs(event);
  }
  clearMonthlyFilter(event) {
    this.hideFilterPopup();
    this.minMonthlyTargetFilter = undefined;
    this.maxMonthlyTargetFilter = undefined;
    this.getBusinessKPIs(event);
  }

  clearWeeklyFilter(event) {
    this.hideFilterPopup();
    this.minWeeklyTargetFilter = undefined;
    this.maxWeeklyTargetFilter = undefined;

    this.getBusinessKPIs(event);
  }
  applyfilter(event) {
    this.hideFilterPopup();
    this.getBusinessKPIs(event);
  }
}
