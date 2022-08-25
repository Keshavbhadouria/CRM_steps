import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CampaignsServiceProxy } from 'src/app/core/services/campaigns.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  campaignNameFilter = '';
  maxStartDateFilter: moment.Moment;
  minStartDateFilter: moment.Moment;
  maxEndDateFilter: moment.Moment;
  minEndDateFilter: moment.Moment;
  maxBudgetFilter: number;
  maxBudgetFilterEmpty: number;
  minBudgetFilter: number;
  minBudgetFilterEmpty: number;
  specialCodeFilter = '';
  maxExpectedOutcomeFilter: number;
  maxExpectedOutcomeFilterEmpty: number;
  minExpectedOutcomeFilter: number;
  minExpectedOutcomeFilterEmpty: number;
  campaignObjetiveObjetiveFilter = '';
  leadSourceSourceNameFilter = '';

  viewCampaign: any;
  editCampaign: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  campaignList: any;
  myData: any = [];

  affiliateId: any;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();


  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'campaignObjetiveObjetive',
      header: 'Objective',
    },
    {
      primaryKey: 'leadSourceSourceName',
      header: 'SourceName',
    },
    {
      primaryKey: 'campaign.campaignName',
      header: 'CampaignName',
    },
    {
      primaryKey: 'campaign.startDate',
      header: 'StartDate',
    },
    {
      primaryKey: 'campaign.endDate',
      header: 'EndDate',
    },
    {
      primaryKey: 'campaign.budget',
      header: 'Budget',
    },
    {
      primaryKey: 'campaign.specialCode',
      header: 'SpecialCode',
    },
    {
      primaryKey: 'campaign.expectedOutcome',
      header: 'ExpectedOutcome',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewCampaign = obj;
        this.modalService.open(this.viewModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editCampaign = obj.campaign;
        this.modalService.open(this.createModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.campaign.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  objectives: any;
  leads: any;
  //#endregion
  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _campaignService: CampaignsServiceProxy,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.affiliateId = this.route.snapshot.paramMap.get('sprintId');
    if (this.affiliateId == null)
      this.affiliateId = environment.emptyGuid;

    this.breadCrumbItems = [{ label: 'Marketing' }, { label: 'Campaigns', active: true }];
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._campaignService.getAllCampaignObjectiveForTableDropdown(),
      this._campaignService.getAllLeadSourceForTableDropdown()
    ];

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.objectives = data[0].result;
          this.leads = data[1].result;
        }
        this.hideLoader();
      });
  }

  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }
    if (event.filters != null) {
      if (Array.isArray(event.filters.campaignName))
        this.campaignNameFilter = event.filters.campaignName[0].value;
      if (Array.isArray(event.filters.specialCode))
        this.specialCodeFilter = event.filters.campaignName[0].value;
    }



    this.primengTableHelper.showLoadingIndicator();

    this._campaignService.getAll(
      this.filterText,
      this.campaignNameFilter,
      this.maxStartDateFilter === undefined ? this.maxStartDateFilter : moment(this.maxStartDateFilter).endOf('day'),
      this.minStartDateFilter === undefined ? this.minStartDateFilter : moment(this.minStartDateFilter).startOf('day'),
      this.maxEndDateFilter === undefined ? this.maxEndDateFilter : moment(this.maxEndDateFilter).endOf('day'),
      this.minEndDateFilter === undefined ? this.minEndDateFilter : moment(this.minEndDateFilter).startOf('day'),
      this.maxBudgetFilter == null ? this.maxBudgetFilterEmpty : this.maxBudgetFilter,
      this.minBudgetFilter == null ? this.minBudgetFilterEmpty : this.minBudgetFilter,
      this.specialCodeFilter,
      this.maxExpectedOutcomeFilter == null ? this.maxExpectedOutcomeFilterEmpty : this.maxExpectedOutcomeFilter,
      this.minExpectedOutcomeFilter == null ? this.minExpectedOutcomeFilterEmpty : this.minExpectedOutcomeFilter,
      this.campaignObjetiveObjetiveFilter,
      this.leadSourceSourceNameFilter,
      this.affiliateId,
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
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.editCampaign = null;
    this.modalService.open(modal, { size: 'xl' });
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

  onViewCampaign(obj) {
    this.viewCampaign = obj;
    this.modalService.open(this.viewModal, { size: 'xl' });
  }
  onEditCampaign(obj) {
    this.editCampaign = obj.campaign;
    this.modalService.open(this.createModal, { size: 'xl' });
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
          this._campaignService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess('Deleted!', 'Story status deleted successfully.');
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
  clearDate(event) {
    this.hideFilterPopup();
    this.maxEndDateFilter = undefined;
    this.minEndDateFilter = undefined;

    this.getRecords(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getRecords(event);
  }
  clearStartDate(event) {
    this.hideFilterPopup();
    this.minStartDateFilter = undefined;
    this.maxStartDateFilter = undefined;
    this.getRecords(event);
  }
  clearBudget(event) {
    this.hideFilterPopup();
    this.minBudgetFilter = undefined;
    this.maxBudgetFilter = undefined;
    this.getRecords(event);
  }
  clearOutcome(event){
    this.hideFilterPopup();
    this.minExpectedOutcomeFilter = undefined;
    this.maxExpectedOutcomeFilter = undefined;
    this.getRecords(event);
  }
}
