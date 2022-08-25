import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { AffiliateService } from 'src/app/core/services/affiliate.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-affilites',
  templateUrl: './affilites.component.html',
  //styleUrls: ['./affilites.component.scss']
})
export class AffilitesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  fullNameFilter = '';
  emailFilter = '';
  phoneFilter = '';
  specialCodeFilter = '';
  activeFilter = -1;
  affiliateTierTierNameFilter = '';

  viewAffiliate: any;
  editAffiliate: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  affiliateList: any;
  myData: any = [];

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
  tierNames: any;


  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _affiliateService: AffiliateService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute) { }

    yesNolst = [{id:1, displayName: "Yes"},{id:0, displayName: "No"}]
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'AffiliateManagement' }, { label: 'Affiliates', active: true }];
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._affiliateService.getAllAffiliateTierForTableDropdown(),
    ];



    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.tierNames = data[0].result;


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
      if (Array.isArray(event.filters.fullName))
        this.fullNameFilter = event.filters.fullName[0].value;
      if (Array.isArray(event.filters.email))
        this.emailFilter = event.filters.email[0].value;
      if (Array.isArray(event.filters.phone))
        this.phoneFilter = event.filters.phone[0].value;
      if (Array.isArray(event.filters.specialCode))
        this.specialCodeFilter = event.filters.specialCode[0].value;
    }


    this.primengTableHelper.showLoadingIndicator();

    this._affiliateService.getAll(
      this.filterText,
      this.fullNameFilter,
      this.emailFilter,
      this.phoneFilter,
      this.specialCodeFilter,
      this.activeFilter,
      this.affiliateTierTierNameFilter,
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
    this.editAffiliate = null;
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
  onViewAffiliate(obj) {
    this.viewAffiliate = obj;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
  }
  onEditAffiliate(obj) {
    this.showLoader();
    this._affiliateService.getAffiliateForEdit(obj.affiliate.id).then(s => {
      this.hideLoader();
      this.editAffiliate = s.result.affiliate;
      this.modalService.open(this.createModal, this.ngbModalOptions);
    });
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
          this._affiliateService.delete(id)
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

}
