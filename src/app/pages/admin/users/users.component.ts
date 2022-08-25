import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { AccountService, ImpersonateInput } from 'src/app/core/services/account.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { NameValueDto } from 'src/app/core/services/supports.service';
import { EntityDtoOfInt64, UsersService } from 'src/app/core/services/users.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PermissionTreeModalComponent } from './permission-tree-modal/permission-tree-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('permissionModal') permissionModal: ElementRef;
  @ViewChild('permissionFilterTreeModal', { static: true }) permissionFilterTreeModal: PermissionTreeModalComponent;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('dataTable', { static: true }) dataTable: Table;

  NumberOfFilteredPermission = 0;
  dontAddOpenerButton: boolean = false;

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  role: number;
  onlyLockedUsers = false;
  selectedFilterPermissions: string[] = [];

  editUser: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  userList: any;
  myData: any = [];

  userId!: number | undefined;

  roles: NameValueDto[];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('updateCollaboratorProfileModal') updateCollaboratorProfileModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };
  userNameFilter: string;
  nameFilter: string;
  lastNameFilter: string;
  startDateFilter: any;
  endDateFilter: any;
  emailFilter: string;
  isEmailConfirmFilter: boolean;
  isActiveFilter: boolean;


  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _usersService: UsersService,
    private translate: TranslateService,
    private _accountService: AccountService,
    private _authService: AuthenticationService,
    private toastr: ToastrService,
    private http: HttpClient,
    private _profileService: ProfileService,) { }
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Administration' }, { label: 'Users', active: true }];
    // this.paginationSettings.getRecords = () => this.getRecords();
    this.loadDropDown();
    // this.getRecords();
  }
  yesNolist = [{id: true, displayName: 'Yes'}, {id: false, displayName: 'No'}]


  loadDropDown() {
    this.showLoader();
    const promises = [
      this._usersService.getRolesTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.roles = data[0].result;
        }
        this.hideLoader();
      });
  }

  getUsers(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }

    if (event.filters != null) {
      if (Array.isArray(event.filters.username))
        this.userNameFilter = event.filters.username[0].value;
      if (Array.isArray(event.filters.name))
        this.nameFilter = event.filters.name[0].value;
      if (Array.isArray(event.filters.surname))
        this.lastNameFilter = event.filters.surname[0].value;
      if (Array.isArray(event.filters.emailAddress))
        this.emailFilter = event.filters.emailAddress[0].value;
    }


    this.primengTableHelper.showLoadingIndicator();
    this._usersService.getUsers(
      this.filterText,
      this.selectedFilterPermissions,
      this.role,
      this.onlyLockedUsers,
      this.userNameFilter,
      this.nameFilter,
      this.lastNameFilter,
      this.emailFilter,
      this.isEmailConfirmFilter,
      this.isActiveFilter,
      this.startDateFilter,
      this.endDateFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getMaxResultCount(this.paginator, event),
      this.primengTableHelper.getSkipCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.setUsersProfilePictureUrl(this.primengTableHelper.records);
      this.primengTableHelper.hideLoadingIndicator();
    });
  }


  getRolesAsString(roles): string {
    let roleNames = '';

    for (let j = 0; j < roles.length; j++) {
      if (roleNames.length) {
        roleNames = roleNames + ', ';
      }

      roleNames = roleNames + roles[j].roleName;
    }

    return roleNames;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  filterRecords() {
    // this.paginationSettings.pageIndex = 0;
    this.getUsers();
  }

  openCreateModal(modal: any) {
    this.userId = undefined;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent(selections: any) {
    this.closeCreateModal();
    //  this.paginationSettings.pageIndex = 0;
    this.selectedFilterPermissions = selections;
    this.NumberOfFilteredPermission = selections.length;
    this.getUsers();
  }

  modalCloseEvent(): void {
    this.closeCreateModal();
    //  this.paginationSettings.pageIndex = 0;
    this.getUsers();
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
          this._usersService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getUsers();
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
  edit(id) {
    this.userId = id;
    this.modalService.open(this.createModal, this.ngbModalOptions);
  }

  updateCollaboratorProfile(id) {
    debugger;
    this.userId = id;
    this.modalService.open(this.updateCollaboratorProfileModal, this.ngbModalOptions);
  }



  openPermissionTreeModal(): void {
    this.modalService.open(this.permissionModal, this.ngbModalOptions);
  }

  impersonate(userId: number): void {
    var input = new ImpersonateInput();
    input.userId = userId;
    input.tenantId = this._authService.getTenantId();
    this.showLoader();
    this._accountService.impersonate(input).subscribe(response => {
      if (response.success) {

        var impersonationToken = response.result.impersonationToken;
        //after impersonation success get new user access token
        this._authService.impersonatedAuthenticate(impersonationToken).subscribe(authResponse => {
          if (authResponse.success) {
            this._authService.logoutUser();

            this.getUserDetails(authResponse.result.accessToken).subscribe(res => {
              if (res.success) {
                this.hideLoader();
                let authenticateResult = res.result;
                authenticateResult.accessToken = authResponse.result.accessToken;
                authenticateResult.encryptedAccessToken = authResponse.result.encryptedAccessToken;
                authenticateResult.expireInSeconds = authResponse.result.expireInSeconds;
                authenticateResult.isImpersonation = true;
                localStorage.setItem(KeyConstant.userInfo, JSON.stringify(authenticateResult));

                location.href = window.location.origin;

              }
              else {
                this.hideLoader();
                var errorMsg = 'Internal server error!';
                if (response.error?.message) { errorMsg = response.error?.message; }
                if (response.error?.details?.message) { errorMsg = response.error?.details?.message; }
                this.toastr.error(errorMsg);
              }
            })
          }
          else {
            this.hideLoader();
            var errorMsg = 'Internal server error!';
            if (response.error?.message) { errorMsg = response.error?.message; }
            if (response.error?.details?.message) { errorMsg = response.error?.details?.message; }
            this.toastr.error(errorMsg);
          }
        });
      }
      else {
        this.hideLoader();
        var errorMsg = 'Internal server error!';
        if (response.error?.message) { errorMsg = response.error?.message; }
        if (response.error?.details?.message) { errorMsg = response.error?.details?.message; }
        this.toastr.error(errorMsg);
      }
    });
  }

  getUserDetails(authToken): any {
    var url = environment.apiURL + "/api/TokenAuth/GetUserDetails";

    let options: any = {
      headers: {
        "Abp.TenantId": this._authService.getTenantId(),
        "Authorization": "Bearer " + authToken
      }
    };

    return this.http.get<any>(url, options);
  }

  unlockUser(userId: number): void {
    this.showLoader();
    let user = new EntityDtoOfInt64();
    user.id = userId;
    this._usersService.unlockUser(user).then(res => {
      this.hideLoader();
      if (res.success) {
        this.toastr.success("Unlocked the user.");
      }
    });
  }
  setUsersProfilePictureUrl(users: any): void {
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      this._profileService.getProfilePictureByUser(user.id).then(res => {
        if (res.result && res.result.profilePicture) {
          user.profilePictureUrl = 'data:image/jpeg;base64,' + res.result.profilePicture;
        } else {
          user.profilePictureUrl = '/assets/icons/default-user.png';
        }
      });
    }
  }
  customFilterCallback(filter: (a) => void, value: any): void {

    filter(value);
    this.hideFilterPopup();
  }
  hideFilterPopup() {
    var currPopup = document.getElementsByClassName("p-column-filter-menu-button-open")[0] as HTMLElement;
    currPopup.click();
  }

  clearDate(event) {
    this.hideFilterPopup();
    this.startDateFilter = undefined;
    this.endDateFilter = undefined;
    this.getUsers(event);
  }
  applyDate(event) {
    this.hideFilterPopup();
    this.getUsers(event);
  }

}
