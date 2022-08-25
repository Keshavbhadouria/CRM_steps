import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ClientDatabasesService } from 'src/app/core/services/client-databases.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-databases',
  templateUrl: './client-databases.component.html',
  //styleUrls: ['./client-databases.component.scss']
})
export class ClientDatabasesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  databaseNameFilter = '';
  usernameFilter = '';
  userPasswordFilter = '';
  maxPortFilter: number;
  maxPortFilterEmpty: number;
  minPortFilter: number;
  minPortFilterEmpty: number;
  databaseEngineNameFilter = '';
  serverInventoryServerNameFilter = '';
  userNameFilter = '';

  viewDatabase: any;
  editDatabase: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  databaseList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'databaseEngineName',
      header: 'DatabaseEngine',
    },
    {
      primaryKey: 'serverInventoryServerName',
      header: 'ServerName',
    },
    {
      primaryKey: 'userName',
      header: 'Responsible',
    },
    {
      primaryKey: 'clientDatabase.databaseName',
      header: 'DatabaseName',
    },
    {
      primaryKey: 'clientDatabase.username',
      header: 'Username',
    },
    {
      primaryKey: 'clientDatabase.userPassword',
      header: 'UserPassword',
    },
    {
      primaryKey: 'clientDatabase.port',
      header: 'Port',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewDatabase = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.showLoader();
        this._clientDatabaseService.getClientDatabaseForEdit(obj.clientDatabase.id).then(s => {
          this.hideLoader();
          this.editDatabase = s.result.clientDatabase;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.clientDatabase.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _clientDatabaseService: ClientDatabasesService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Database' }, { label: 'ClientDatabases', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._clientDatabaseService.getAll(
      this.filterText,
      this.databaseNameFilter,
      this.usernameFilter,
      this.userPasswordFilter,
      this.maxPortFilter == null ? this.maxPortFilterEmpty : this.maxPortFilter,
      this.minPortFilter == null ? this.minPortFilterEmpty : this.minPortFilter,
      this.databaseEngineNameFilter,
      this.serverInventoryServerNameFilter,
      this.userNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.databaseList = res.result.items;
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
    this.editDatabase = null;
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
          this._clientDatabaseService.delete(id)
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
