import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { LmsformService } from 'src/app/core/services/lmsform.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  nameFilter = '';
  maxOrderNumFilter: number;
  maxOrderNumFilterEmpty: number;
  minOrderNumFilter: number;
  minOrderNumFilterEmpty: number;
  lmsFormTypeNameFilter = '';
  lmsDisplayTypeNameFilter = '';

  viewFormType: any;
  editFormType: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  myData: any = [];


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
      primaryKey: 'lmsForm.name',
      header: 'Name',
    },
    {
      primaryKey: 'lmsFormTypeName',
      header: 'FormType',
    },
    {
      primaryKey: 'lmsDisplayTypeName',
      header: 'DisplayType',
    },
    {
      primaryKey: 'lmsForm.orderNum',
      header: 'OrderNumber',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewFormType = obj;
        // this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        // this._displayTypeService.getLMSFormTypeForEdit(obj.lmsFormType.id).then(s => {
        //   this.hideLoader();
        //   this.editFormType = s.result.lmsDisplayType;
        //   this.modalService.open(this.createModal, this.ngbModalOptions);
        // });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.lmsForm.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion


  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _formService: LmsformService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'LMS' }, { label: 'Form', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._formService.getAll(
      this.filterText,
      this.nameFilter,
      this.maxOrderNumFilter == null ? this.maxOrderNumFilterEmpty : this.maxOrderNumFilter,
      this.minOrderNumFilter == null ? this.minOrderNumFilterEmpty : this.minOrderNumFilter,
      this.lmsFormTypeNameFilter,
      this.lmsDisplayTypeNameFilter,
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
    this.editFormType = null;
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
          this._formService.delete(id)
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
