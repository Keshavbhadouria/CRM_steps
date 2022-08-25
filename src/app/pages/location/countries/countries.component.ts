import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CountryService } from 'src/app/core/services/country.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  breadCrumbItems: Array<{}>;


  advancedFiltersAreShown = false;
  filterText = '';
  countryNameFilter = '';
  countryCodeFilter = '';
  isActiveFilter = -1;

  viewStatus: any;
  editStatus: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  statusList: any;
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
      primaryKey: 'crmCountry.countryName',
      header: 'CountryName',
    },
    {
      primaryKey: 'crmCountry.countryCode',
      header: 'CountryCode',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewStatus = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editStatus = obj.crmCountry;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.crmCountry.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _countryService: CountryService) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Location' }, { label: 'Countries', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }

  getRecords() {
    this.showLoader();
    this._countryService.getAll(
      this.filterText,
      this.countryNameFilter,
      this.countryCodeFilter,
      this.isActiveFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.statusList = res.result.items;
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
    this.editStatus = null;
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
          this._countryService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess('Deleted!', 'deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
}
