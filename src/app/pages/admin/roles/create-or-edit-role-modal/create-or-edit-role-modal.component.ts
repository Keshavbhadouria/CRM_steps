import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrUpdateRoleInput, RoleEditDto, RolesService } from 'src/app/core/services/roles.service';
import { PermissionTreeComponent } from '../../users/permission-tree/permission-tree.component';

@Component({
  selector: 'app-create-or-edit-role-modal',
  templateUrl: './create-or-edit-role-modal.component.html',
  //styleUrls: ['./create-or-edit-role-modal.component.scss']
})
export class CreateOrEditRoleModalComponent implements OnInit {

  @Input() roleId: number | undefined;
  @Output() $modalClose = new EventEmitter();

  @ViewChild('permissionTree') permissionTree: PermissionTreeComponent;

  loading = false;
  createLoader = false;

  role: RoleEditDto = new RoleEditDto();

  constructor(private _roleService: RolesService,
    private _translate: TranslateService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.showLoader();
    const self = this;

    self._roleService.getRoleForEdit(this.roleId).then(result => {
      self.role = result.result.role;
      this.permissionTree.editData = result.result;

    }).finally(() => {
      this.hideLoader();
    });
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

  save(): void {
    this.showLoader();
    const self = this;

    const input = new CreateOrUpdateRoleInput();
    input.role = self.role;
    input.grantedPermissionNames = self.permissionTree.getGrantedPermissionNames();

    this._roleService.createOrEdit(input)
      .then(() => {
        this._messageService.showSuccess("", this._translate.instant('SavedSuccessfully'));
        this.close();
      }).finally(() => {
        this.hideLoader();
      });
  }

  close(): void {
    this.$modalClose.emit();
  }

}
