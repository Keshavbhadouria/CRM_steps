import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { CustomerContractTemplateDetailService } from 'src/app/core/services/customer-contract-template-detail.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cutomer-contract-detail',
  templateUrl: './cutomer-contract-detail.component.html',
  styleUrls: ['./cutomer-contract-detail.component.scss']
})
export class CustomerContractDetailComponent implements OnInit {

  constructor(private _customerContractTemplateDetailService: CustomerContractTemplateDetailService, private _messageService: MessageService, public modalService: NgbModal, private _router: Router, private _activatedRoute: ActivatedRoute) {


  }


  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  baseURL = environment.apiURL;
  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  titleFilter = '';
  contentFilter = '';
  maxSortIndexFilter: number;
  maxSortIndexFilterEmpty: number;
  minSortIndexFilter: number;
  minSortIndexFilterEmpty: number;
  customerContratTemplateContractNameFilter = '';
  customerContratTemplateId: number;

  editProject: any;
  viewProject: any;


  totalCount: number = 0;
  projectList: any;
  myData: any = [];

  // Create

  active = false;
  saving = false;

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'customerContratTemplateContractName',
      header: 'ContractName',
    },
    {
      primaryKey: 'customerContractDetail.title',
      header: 'Title',
    },
    {
      primaryKey: 'customerContractDetail.content',
      header: 'Content',
    },
    {
      primaryKey: 'customerContractDetail.sortIndex',
      header: 'SortIndex',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {

        this.viewProject = obj;
        this.modalService.open(this.viewModal, { size: 'lg' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editProject = obj;
        this.modalService.open(this.createModal, { size: 'lg' });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();

  //#endregion


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Retainer' }, { label: 'ContractTemplateName', active: true }];
    this._activatedRoute.queryParams.subscribe(params => {
      this.customerContratTemplateId = Number(this._activatedRoute.snapshot.paramMap.get('contracttemplateid'));
    });
    this.paginationSettings.getRecords = () => this.getRecords();
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._customerContractTemplateDetailService.getAll(
      this.filterText,
      this.titleFilter,
      this.contentFilter,
      this.maxSortIndexFilter == null ? this.maxSortIndexFilterEmpty : this.maxSortIndexFilter,
      this.minSortIndexFilter == null ? this.minSortIndexFilterEmpty : this.minSortIndexFilter,
      this.customerContratTemplateContractNameFilter,
      this.customerContratTemplateId,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.projectList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }



  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  onDelete(dataObj) {
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
          if (this.deleteProject(dataObj.customerContractDetail)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.myData = this.myData.filter(obj => { return obj !== dataObj });
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }

  deleteProject(data): boolean {
    return this._customerContractTemplateDetailService.delete(data.id).then(res => {
      if (res.success)
        return true;
      else
        return false;
    });
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
    this.modalService.open(modal, { size: 'lg' });
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


  onEditProject(item, modal) {
    this.editProject = item;
    this.modalService.open(modal, { size: 'md' });
  }

  onViewProject(item, modal) {
    this.viewProject = item;
    this.modalService.open(modal, { size: 'md' });
  }



  //#endregion


}
