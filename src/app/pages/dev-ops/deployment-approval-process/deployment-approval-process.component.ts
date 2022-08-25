import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { DeploymentApprovalService } from 'src/app/core/services/deployment-approval.service';
import { DeploymentManagementService } from 'src/app/core/services/deployment-management.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-deployment-approval-process',
  templateUrl: './deployment-approval-process.component.html',
  styleUrls: ['./deployment-approval-process.component.scss']
})
export class DeploymentApprovalProcessComponent implements OnInit {
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
  approvalSignatureFilter = '';
  signatureCompletedFilter = -1;
      deploymentManagementNameFilter = '';
      roleNameFilter = '';
      userNameFilter = '';

  toolList: any;
  myData: any = [];

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'deploymentManagementName',
      header: 'DeploymentManagementName',
    },
    {
      primaryKey: 'roleName',
      header: 'RoleName',
    },
    {
      primaryKey: 'userName',
      header: 'UserName',
    },
    {
      primaryKey: 'deploymentApprovalProcess.approvalOrder',
      header: 'ApprovalOrder',
    },
    {
      primaryKey: 'deploymentApprovalProcess.approvalDate',
      header: 'ApprovalDate',
      format: PipeFormat.DATE,
    },
    {
      primaryKey: 'deploymentApprovalProcess.approvalSignature',
      header: 'ApprovalSignature',
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
        this.editStatus = obj.deploymentApprovalProcess;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.deploymentApprovalProcess.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _deployServices: DeploymentApprovalService) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'DevOps' }, { label: 'DeploymentApprovalProcess', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }

  getRecords() {
    this.showLoader();
    this._deployServices.getAll(
      this.filterText,
            this.approvalSignatureFilter,
            this.signatureCompletedFilter,
            this.deploymentManagementNameFilter,
            this.roleNameFilter,
            this.userNameFilter,
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
