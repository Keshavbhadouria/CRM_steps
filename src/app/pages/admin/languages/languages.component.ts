import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { AccountService, ImpersonateInput } from 'src/app/core/services/account.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NameValueDto } from 'src/app/core/services/supports.service';
import { EntityDtoOfInt64 } from 'src/app/core/services/users.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PermissionTreeModalComponent } from '../users/permission-tree-modal/permission-tree-modal.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @ViewChild('permissionModal') permissionModal: ElementRef;
  @ViewChild('permissionFilterTreeModal', { static: true }) permissionFilterTreeModal: PermissionTreeModalComponent;

  NumberOfFilteredPermission = 0;
  dontAddOpenerButton: boolean = false;

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  role = '';
  onlyLockedUsers = false;
  selectedFilterPermissions: string[] = [];

  editUser: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  languageList: any;
  myData: any = [];

  languageId!: number | undefined;

  roles: NameValueDto[];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'displayName',
      header: 'Name',
    },
    {
      primaryKey: 'name',
      header: 'Code',
    },
    {
      primaryKey: 'isDisabled',
      header: 'IsDisabled',
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
        this.languageId = obj.id;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.svg'
    },
    // {
    //   title: 'ChangeText',
    //   func: (obj) => {
    //     this.languageId = obj.id;
    //     this.modalService.open(this.createModal, this.ngbModalOptions);
    //   },
    //   icon: '../../../../assets/icons/editIcon.svg'
    // },
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
    private _languageService: LanguageService,
    private translate: TranslateService,
    private _accountService: AccountService,
    private _authService: AuthenticationService,
    private toastr: ToastrService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Administration' }, { label: 'Languages', active: true }];
    this.paginationSettings.pageSize = 100;
    this.paginationSettings.getRecords = () => this.getRecords();
    // this.loadDropDown();
    this.getRecords();
  }

  // loadDropDown() {
  //   this.showLoader();
  //   const promises = [
  //     this._languageService.getRolesTableDropdown(),
  //   ];
  //   Promise.all(promises)
  //     .then(data => {
  //       if (data.length > 0) {
  //         this.roles = data[0].result;
  //       }
  //       this.hideLoader();
  //     });
  // }

  getRecords() {
    this.showLoader();

    //let selectPermissions = this.permissionFilterTreeModal.getSelectedPermissions();

    this._languageService.getLanguages().then(res => {
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
    this.languageId = undefined;
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
          this._languageService.delete(id)
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
