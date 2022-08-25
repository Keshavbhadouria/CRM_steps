import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ColumnSetting, ButtonSettings, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { RetainerService } from 'src/app/core/services/retainer.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-retainer',
  templateUrl: './new-retainer.component.html',
  styleUrls: ['./new-retainer.component.scss']
})
export class NewRetainerComponent implements OnInit {

  constructor(private _retainerService: RetainerService, private _messageService: MessageService, public modalService: NgbModal, private _router: Router, private _activatedRoute: ActivatedRoute) {
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
  maxExpirationDateFilter: moment.Moment;
  minExpirationDateFilter: moment.Moment;
  maxTotalAmountFilter: number;
  maxTotalAmountFilterEmpty: number;
  minTotalAmountFilter: number;
  minTotalAmountFilterEmpty: number;
  paymentPlanFilter = -1;
  maxDownpaymentFilter: number;
  maxDownpaymentFilterEmpty: number;
  minDownpaymentFilter: number;
  minDownpaymentFilterEmpty: number;
  maxPaymentsFilter: number;
  maxPaymentsFilterEmpty: number;
  minPaymentsFilter: number;
  minPaymentsFilterEmpty: number;
  maxPaymentAmountFilter: number;
  maxPaymentAmountFilterEmpty: number;
  minPaymentAmountFilter: number;
  minPaymentAmountFilterEmpty: number;
  maxInitialPaymentDateFilter: moment.Moment;
  minInitialPaymentDateFilter: moment.Moment;
  signatureRequiredFilter = -1;
  contactFirstnameFilter = '';
  userNameFilter = '';
  contracTemplateNameContractNameFilter = '';
  contracTemplateNameId: string;
  contracTemplateNameContractName: string;

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
      primaryKey: 'contracTemplateNameContractName',
      header: 'TemplateName',
    },
    {
      primaryKey: 'contactFirstname',
      header: 'FirstName',
    },
    {
      primaryKey: 'userName',
      header: 'Name',
    },
    {
      primaryKey: 'reteiner.expirationDate',
      header: 'ExpirationDate',
      format: PipeFormat.DATE
    },

    {
      primaryKey: 'reteiner.totalAmount',
      header: 'totalAmount',
      format: PipeFormat.CURRENCY
    },

    {
      primaryKey: 'reteiner.paymentPlan',
      header: 'paymentPlan',
    },

    {
      primaryKey: 'reteiner.downpayment',
      header: 'downpayment',
      format: PipeFormat.CURRENCY
    },
    {
      primaryKey: 'reteiner.payments',
      header: 'payments',
      format: PipeFormat.CURRENCY
    },
    {
      primaryKey: 'reteiner.paymentAmount',
      header: 'paymentAmount',
      format: PipeFormat.CURRENCY
    },
    {
      primaryKey: 'reteiner.initialPaymentDate',
      header: 'initialPaymentDate',
      format: PipeFormat.DATE
    },
    {
      primaryKey: 'reteiner.signatureRequired',
      header: 'SignatureRequired',
    },
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
    this.breadCrumbItems = [{ label: 'Retainer' }, { label: 'List', active: true }];
    this._activatedRoute.queryParams.subscribe(params => {
      this.contracTemplateNameId = this._activatedRoute.snapshot.paramMap.get('templateid');
    });
    this.paginationSettings.getRecords = () => this.getRecords();
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._retainerService.getAll(
      this.filterText,
      this.maxExpirationDateFilter === undefined ? this.maxExpirationDateFilter : moment(this.maxExpirationDateFilter).endOf('day'),
      this.minExpirationDateFilter === undefined ? this.minExpirationDateFilter : moment(this.minExpirationDateFilter).startOf('day'),
      this.maxTotalAmountFilter == null ? this.maxTotalAmountFilterEmpty : this.maxTotalAmountFilter,
      this.minTotalAmountFilter == null ? this.minTotalAmountFilterEmpty : this.minTotalAmountFilter,
      this.paymentPlanFilter,
      this.maxDownpaymentFilter == null ? this.maxDownpaymentFilterEmpty : this.maxDownpaymentFilter,
      this.minDownpaymentFilter == null ? this.minDownpaymentFilterEmpty : this.minDownpaymentFilter,
      this.maxPaymentsFilter == null ? this.maxPaymentsFilterEmpty : this.maxPaymentsFilter,
      this.minPaymentsFilter == null ? this.minPaymentsFilterEmpty : this.minPaymentsFilter,
      this.maxPaymentAmountFilter == null ? this.maxPaymentAmountFilterEmpty : this.maxPaymentAmountFilter,
      this.minPaymentAmountFilter == null ? this.minPaymentAmountFilterEmpty : this.minPaymentAmountFilter,
      this.maxInitialPaymentDateFilter === undefined ? this.maxInitialPaymentDateFilter : moment(this.maxInitialPaymentDateFilter).endOf('day'),
      this.minInitialPaymentDateFilter === undefined ? this.minInitialPaymentDateFilter : moment(this.minInitialPaymentDateFilter).startOf('day'),
      this.signatureRequiredFilter,
      this.contactFirstnameFilter,
      this.userNameFilter,
      this.contracTemplateNameContractNameFilter,
      this.contracTemplateNameId,
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
          if (this.deleteProject(dataObj.reteiner)) {
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
    return this._retainerService.delete(data.id).then(res => {
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
