import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ContractTemplateNameService } from 'src/app/core/services/contract-template-name.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-template-name',
  templateUrl: './contract-template-name.component.html',
  styleUrls: ['./contract-template-name.component.scss']
})
export class ContractTemplateNameComponent implements OnInit {



  constructor(private _contractTemplateNameService: ContractTemplateNameService, private _messageService: MessageService, public modalService: NgbModal , private _router : Router ) { }


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
  activeFilter = -1;

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
      primaryKey: 'contracTemplateName.contractName',
      header: 'Contract Name',
    },
    {
      primaryKey: 'contracTemplateName.active',
      header: 'Active',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'Customer Contract',
      func: (obj) => {
        this._router.navigate([`/retainer/customercontract/${obj.contracTemplateName.id}/${obj.contracTemplateName.contractName}`]);
      },
      icon: '../../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png'
    },
    {
      title: 'Sections',
      func: (obj) => {
        this._router.navigate([`/retainer/contractdetail/${obj.contracTemplateName.id}/${obj.contracTemplateName.contractName}`]);
      },
      icon: '../../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png'
    },
    {
      title: 'Contact',
      func: (obj) => {
        this._router.navigate([`/retainer/retainerlist/${obj.contracTemplateName.id}/${obj.contracTemplateName.contractName}`]);
      },
      icon: '../../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png'
    },
    {
      title: 'View',
      func: (obj) => {

        this.viewProject = obj;
        this.modalService.open(this.viewModal, { size: 'md' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editProject = obj;
        this.modalService.open(this.createModal, { size: 'md' });
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
    this.paginationSettings.getRecords = () => this.getRecords();
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._contractTemplateNameService.getAll(
      this.filterText,
      this.contractNameFilter,
      this.activeFilter,
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
          if (this.deleteProject(dataObj.contracTemplateName)) {
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
    return this._contractTemplateNameService.delete(data.id).then(res => {
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
    this.modalService.open(modal, { size: 'md' });
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
