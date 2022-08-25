import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { format } from 'path';
import { TreeNode } from 'primeng/api';
import { FlatPermissionDto } from 'src/app/core/models/User/PermissionTreeModels';
import { MessageService } from 'src/app/core/services/message.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { PermissionTreeComponent } from '../permission-tree/permission-tree.component';

@Component({
  selector: 'app-permission-tree-modal',
  templateUrl: './permission-tree-modal.component.html',
  // styleUrls: ['./permission-tree-modal.component.scss']
})
export class PermissionTreeModalComponent implements OnInit {

  @Input() singleSelect: boolean;
  @Input() extPermissions: [];
  @Output() onModalclose = new EventEmitter<string[]>();

  selectedPermissions: TreeNode[] = [];

  @ViewChild('permissionTree') permissionTree: PermissionTreeComponent;

  constructor(private _permissionService: PermissionService,
    private _messageService: MessageService,
    private _translate: TranslateService) { }

  ngOnInit(): void {
    
    this.selectedPermissions = this.extPermissions;
    this.loadAllPermissionsToFilterTree();
  }
  private loadAllPermissionsToFilterTree() {
    let treeModel: FlatPermissionDto[] = [];
    this._permissionService.getAllPermissions().then(result => {
      if (result.result.items) {
        result.result.items.forEach(item => {
          treeModel.push(new FlatPermissionDto({
            name: item.name,
            description: item.description,
            displayName: item.displayName,
            isGrantedByDefault: item.isGrantedByDefault,
            parentName: item.parentName
          }));
        });
      }

      this.permissionTree.editData = { permissions: treeModel, grantedPermissionNames: [] };
    });
  }
  openPermissionTreeModal(): void {
    //this.permissionTreeModal.show();
  }


  closePermissionTreeModal(): void {
    let selections = this.getSelectedPermissions();
    this.onModalclose.emit(selections);
    this._messageService.showInfo("", selections.length + " " + this._translate.instant('XCountPermissionFiltered'))
  }

  getSelectedPermissions(): string[] {
    if (!this.permissionTree) {
      return [];
    }

    let permissions = this.permissionTree.getGrantedPermissionNames()
      .filter((test, index, array) =>
        index === array.findIndex((findTest) =>
          findTest === test
        )
      );

    return permissions;
  }
}
