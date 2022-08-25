import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { DeploymentApprovalService } from 'src/app/core/services/deployment-approval.service';
import { DeploymentManagementService } from 'src/app/core/services/deployment-management.service';
import { MessageService } from 'src/app/core/services/message.service';
import { OnlineToolsService } from 'src/app/core/services/online-tools.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deployment-management',
  templateUrl: './deployment-management.component.html',
  styleUrls: ['./deployment-management.component.scss']
})
export class DeploymentManagementComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  viewStatus: any;
  editStatus: any;
  loading = false;
  createLoader = false;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  advancedFiltersAreShown = false;
  filterText = '';
  nameFilter = '';
  maxReleaseDateFilter: moment.Moment;
  minReleaseDateFilter: moment.Moment;
  clientApplicationApplicationNameFilter = '';
  userNameFilter = '';
  pmProjectProjectNameFilter = '';

  toolList: any;
  myData: any = [];

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'clientApplicationApplicationName',
      header: 'ApplicationName',
    },
    {
      primaryKey: 'userName',
      header: 'UserName',
    },
    {
      primaryKey: 'pmProjectProjectName',
      header: 'ProjectName',
    },
    {
      primaryKey: 'deploymentManagement.name',
      header: 'Name',
    },
    {
      primaryKey: 'deploymentManagement.releaseDate',
      header: 'ReleaseDate',
      format: PipeFormat.DATE,
    },
    {
      primaryKey: 'deploymentManagement.approved',
      header: 'Approved',
    },
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
        this.editStatus = obj.deploymentManagement;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.deploymentManagement.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _deployServices: DeploymentManagementService) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'DevOps' }, { label: 'DeploymentManagement', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }

  getRecords() {
    this.showLoader();
    this._deployServices.getAll(
      this.filterText,
      this.nameFilter,
      this.maxReleaseDateFilter === undefined ? this.maxReleaseDateFilter : moment(this.maxReleaseDateFilter).endOf('day'),
      this.minReleaseDateFilter === undefined ? this.minReleaseDateFilter : moment(this.minReleaseDateFilter).startOf('day'),
      this.clientApplicationApplicationNameFilter,
      this.userNameFilter,
      this.pmProjectProjectNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.toolList = res.result.items;
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
          this._deployServices.delete(id)
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
