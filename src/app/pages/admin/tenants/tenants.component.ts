import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {
  subscriptionDateRange: Date[] = [moment().startOf('day').toDate(), moment().add(30, 'days').endOf('day').toDate()];
  creationDateRange: Date[] = [moment().startOf('day').toDate(), moment().endOf('day').toDate()];
  filters: {
    filterText: string;
    tenancyCodeFilter: string;
    tenancyNameFilter: string;
    creationDateRangeActive: boolean;
    subscriptionEndDateRangeActive: boolean;
    selectedEditionId: number;
  } = <any>{};

  _entityTypeFullName = 'BladePortBackOffice.MultiTenancy.Tenant';
  entityHistoryEnabled = false;
  advancedFiltersAreShown = false;
  editionLists: any;
  subscriptionEndDateStart: Date;
  subscriptionEndDateEnd: Date;
  creationDateStart: Date;
  creationDateEnd: Date;

  constructor(private _activatedRoute: ActivatedRoute,
    private _tenantService: TenantService,
    private _messageService: MessageService,
    private modalService: NgbModal,
    private translate: TranslateService
  ) {
    // this.setFiltersFromRoute();
  }
  // setFiltersFromRoute(): void {
  //   if (this._activatedRoute.snapshot.queryParams['subscriptionEndDateStart'] != null) {
  //     this.filters.subscriptionEndDateRangeActive = true;
  //     this.subscriptionDateRange[0] = moment(this._activatedRoute.snapshot.queryParams['subscriptionEndDateStart']).toDate();
  //   } else {
  //     this.subscriptionDateRange[0] = moment().startOf('day').toDate();
  //   }

  //   if (this._activatedRoute.snapshot.queryParams['subscriptionEndDateEnd'] != null) {
  //     this.filters.subscriptionEndDateRangeActive = true;
  //     this.subscriptionDateRange[1] = moment(this._activatedRoute.snapshot.queryParams['subscriptionEndDateEnd']).toDate();
  //   } else {
  //     this.subscriptionDateRange[1] = moment().add(30, 'days').endOf('day').toDate();
  //   }

  //   if (this._activatedRoute.snapshot.queryParams['creationDateStart'] != null) {
  //     this.filters.creationDateRangeActive = true;
  //     this.creationDateRange[0] = moment(this._activatedRoute.snapshot.queryParams['creationDateStart']).toDate();
  //   } else {
  //     this.creationDateRange[0] = moment().add(-7, 'days').startOf('day').toDate();
  //   }

  //   if (this._activatedRoute.snapshot.queryParams['creationDateEnd'] != null) {
  //     this.filters.creationDateRangeActive = true;
  //     this.creationDateRange[1] = moment(this._activatedRoute.snapshot.queryParams['creationDateEnd']).toDate();
  //   } else {
  //     this.creationDateRange[1] = moment().endOf('day').toDate();
  //   }

  //   if (this._activatedRoute.snapshot.queryParams['editionId'] != null) {
  //     this.filters.selectedEditionId = parseInt(this._activatedRoute.snapshot.queryParams['editionId']);
  //   }
  // }
  breadCrumbItems: Array<{}>;


  viewTenant: any;
  editTenant: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  myData: any = [];

  @ViewChild('updateModal') updateModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();


  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'tenancyName',
      header: 'tenancyName',
    },
    {
      primaryKey: 'name',
      header: 'Name',
    },
    {
      primaryKey: 'editionDisplayName',
      header: 'Edition'
    },
    {
      primaryKey: 'subscriptionEndDateUtc',
      header: 'SubscriptionEndDateUtc',
      format: PipeFormat.DATE,
    },
    {
      primaryKey: 'isActive',
      header: 'Active'
    }
  ];

  buttonSettings: ButtonSettings[] = [
   
    {
      title: 'Edit',
      func: (obj) => {
        this.editTenant = obj;
        this.modalService.open(this.updateModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  edit(obj) {
    this.editTenant = obj;
    this.modalService.open(this.updateModal, this.ngbModalOptions);
  }


  ngOnInit(): void {
    this.filters.filterText = this._activatedRoute.snapshot.queryParams['filterText'] || '';
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'Customer', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
    this._tenantService.getEditionsForCombobox(false).then(editionsResult => {
      this.editionLists = editionsResult.result.items;
    });
  }
  getRecords(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }
    if (event.filters != null) {
      if (Array.isArray(event.filters.tenancyName))
        this.filters.tenancyCodeFilter = event.filters.tenancyName[0].value;
      if (Array.isArray(event.filters.name))
        this.filters.tenancyNameFilter = event.filters.name[0].value;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._tenantService.getTenants(
      this.filters.filterText,
      this.filters.tenancyCodeFilter,
      this.filters.tenancyNameFilter,
      this.subscriptionEndDateStart,
      this.subscriptionEndDateEnd,
      this.creationDateStart,
      this.creationDateEnd,
      this.filters.selectedEditionId,
      this.filters.selectedEditionId !== undefined && (this.filters.selectedEditionId + '') !== '-1',
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getMaxResultCount(this.paginator, event),
      this.primengTableHelper.getSkipCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.hideLoadingIndicator();
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
    this.editTenant = null;
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
          this._tenantService.deleteTenant(id)
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
    this.subscriptionEndDateEnd = undefined;
    this.subscriptionEndDateStart = undefined;

    this.getRecords(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getRecords(event);
  }
  clearCreationDate(event) {
    this.hideFilterPopup();
    this.creationDateStart = undefined;
    this.creationDateEnd = undefined;
    this.getRecords(event);
  }
 
}
