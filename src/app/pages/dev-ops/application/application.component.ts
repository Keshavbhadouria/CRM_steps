import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ApplicationService } from 'src/app/core/services/application.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
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
  applicationNameFilter = '';
  domainNameFilter = '';
  maxSLAHoursFilter : number;
  maxSLAHoursFilterEmpty : number;
  minSLAHoursFilter : number;
  minSLAHoursFilterEmpty : number;
  liveEnvironmentDetailFilter = '';
  qualityAssuranceEnvironmentFilter = '';
  certificationEnvironmentFilter = '';
      pmProjectProjectNameFilter = '';
      contactCompanyFilter = '';
      userNameFilter = '';
      serverInventoryServerNameFilter = '';
      clientApplicationStatusStatusNameFilter = '';

  toolList: any;
  myData: any = [];

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'pmProjectProjectName',
      header: 'ProjectName',
    },
    {
      primaryKey: 'contactCompany',
      header: 'ContactCompany',
    },
    {
      primaryKey: 'userName',
      header: 'UserName',
    },
    {
      primaryKey: 'serverInventoryServerName',
      header: 'ServerName',
    },
    {
      primaryKey: 'clientApplicationStatusStatusName',
      header: 'StatusName',
    },
    {
      primaryKey: 'clientApplication.applicationName',
      header: 'ApplicationName',
    },
    {
      primaryKey: 'clientApplication.domainName',
      header: 'DomainName',
    },
    {
      primaryKey: 'clientApplication.slaHours',
      header: 'SLAHours',
    },
    {
      primaryKey: 'clientApplication.liveEnvironmentDetail',
      header: 'LiveEnvironmentDetail',
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
        this.editStatus = obj.clientApplication;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.clientApplication.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _applicationServices: ApplicationService) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'DevOps' }, { label: 'Application', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }

  getRecords() {
    this.showLoader();
    this._applicationServices.getAll(
      this.filterText,
      this.applicationNameFilter,
      this.domainNameFilter,
      this.maxSLAHoursFilter == null ? this.maxSLAHoursFilterEmpty: this.maxSLAHoursFilter,
      this.minSLAHoursFilter == null ? this.minSLAHoursFilterEmpty: this.minSLAHoursFilter,
      this.liveEnvironmentDetailFilter,
      this.qualityAssuranceEnvironmentFilter,
      this.certificationEnvironmentFilter,
      this.pmProjectProjectNameFilter,
      this.contactCompanyFilter,
      this.userNameFilter,
      this.serverInventoryServerNameFilter,
      this.clientApplicationStatusStatusNameFilter,
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
          this._applicationServices.delete(id)
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
