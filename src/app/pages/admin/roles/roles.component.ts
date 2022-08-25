import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { RolesService } from 'src/app/core/services/roles.service';
import Swal from 'sweetalert2';
import { PermissionTreeModalComponent } from '../users/permission-tree-modal/permission-tree-modal.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  //styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  @ViewChild('permissionModal') permissionModal: ElementRef;
  @ViewChild('permissionFilterTreeModal', { static: true }) permissionFilterTreeModal: PermissionTreeModalComponent;

  NumberOfFilteredPermission = 0;
  dontAddOpenerButton: boolean = false;

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  selectedFilterPermissions: string[] = [];
  

  editRole: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  roleList: any;
  myData: any = [];

  roleId!: number | undefined;

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
      primaryKey: 'displayName',
      header: 'RoleName',
    },
    {
      primaryKey: 'creationTime',
      header: 'CreationTime',
      format: PipeFormat.DATE
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'Edit',
      func: (obj) => {
        this.roleId = obj.id;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.svg'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.id);
      },
      icon: '../../../../assets/icons/deleteIcon.svg'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _rolesService: RolesService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Administration' }, { label: 'Roles', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();

    //let selectPermissions = this.permissionFilterTreeModal.getSelectedPermissions();

    this._rolesService.getRoles(
      this.selectedFilterPermissions
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.roleList = res.result.items;
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
    this.roleId = undefined;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent(selections: any) {
    this.closeCreateModal();
    this.paginationSettings.pageIndex = 0;
    this.selectedFilterPermissions = selections;
    this.NumberOfFilteredPermission = selections.length;
    this.getRecords();
  }

  modalCloseEvent(): void {
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
          this._rolesService.delete(id)
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

  openPermissionTreeModal(): void {
    this.modalService.open(this.permissionModal, this.ngbModalOptions);
  }
}
