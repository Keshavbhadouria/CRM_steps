import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { FormatCellPipe, PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { CustomerContractTemplateService } from 'src/app/core/services/customer-contract-template.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-contract-template',
  templateUrl: './customer-contract-template.component.html',
  styleUrls: ['./customer-contract-template.component.scss']
})
export class CustomerContractTemplateComponent implements OnInit {

  constructor(private _customerContractTemplateService: CustomerContractTemplateService, private _messageService: MessageService, public modalService: NgbModal, private _router: Router , private _activatedRoute : ActivatedRoute) {


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
  contractNameFilter = '';
  physicalFileUrlFilter = '';
  maxCreatedOnFilter : moment.Moment;
  minCreatedOnFilter : moment.Moment;
  contactCompanyFilter = '';
  contracTemplateNameContractNameFilter = '';
  contractStatusStatusNameFilter = '';
  userNameFilter = '';
  contracTemplateNameId: string;

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
      primaryKey: 'contactCompany',
      header: 'ContactCompany',
    },
    {
      primaryKey: 'contracTemplateNameContractName',
      header: 'ContractTemplateName',
    },
    {
      primaryKey: 'contractStatusStatusName',
      header: 'Status',
    },
    {
      primaryKey: 'customerContratTemplate.contractName',
      header: 'ContractName',
    },
    {
      primaryKey: 'customerContratTemplate.physicalFileUrl',
      header: 'physicalFileUrl',
    },
    {
      primaryKey: 'customerContratTemplate.createdOn',
      header: 'CreatedOn',
      format : PipeFormat.DATE
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'Contract Details',
      func: (obj) => {
        this._router.navigate([`/retainer/customercontractdetail/${obj.customerContratTemplate.id}/${obj.customerContratTemplate.contractName}`]);
      },
      icon: '../../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png'
    },
    {
      title: 'Contract Signature',
      func: (obj) => {
        this._router.navigate([`/retainer/customercontractsignature/${obj.customerContratTemplate.id}/${obj.customerContratTemplate.contractName}`]);
      },
      icon: '../../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png'
    },
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
      this.contracTemplateNameId = this._activatedRoute.snapshot.paramMap.get('templateid');
    });
    this.paginationSettings.getRecords = () => this.getRecords();
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._customerContractTemplateService.getAll(
      this.filterText,
            this.contractNameFilter,
            this.physicalFileUrlFilter,
            this.maxCreatedOnFilter === undefined ? this.maxCreatedOnFilter : moment(this.maxCreatedOnFilter).endOf('day'),
            this.minCreatedOnFilter === undefined ? this.minCreatedOnFilter : moment(this.minCreatedOnFilter).startOf('day'),
            this.contactCompanyFilter,
            this.contracTemplateNameContractNameFilter,
            this.contractStatusStatusNameFilter,
            this.userNameFilter,
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
          if (this.deleteProject(dataObj.customerContratTemplate)) {
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
    return this._customerContractTemplateService.delete(data.id).then(res => {
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
