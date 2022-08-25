import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FlatPermissionDto, PermissionTreeEditModel } from 'src/app/core/models/User/PermissionTreeModels';
import { ArrayToTreeConverterService } from 'src/app/core/services/array-to-tree-converter.service';
import { TreeDataHelperService } from 'src/app/core/services/tree-data-helper.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-permission-tree',
  templateUrl: './permission-tree.component.html',
  //styleUrls: ['./permission-tree.component.scss']
})
export class PermissionTreeComponent implements OnInit {

  @Input() singleSelect: boolean;
  @Input() existingSelectedPermissions: [];

  set editData(val: PermissionTreeEditModel) {
    this.setTreeData(val.permissions);
    this.setSelectedNodes(val.grantedPermissionNames);
    if (this.existingSelectedPermissions !== undefined && this.existingSelectedPermissions.length > 0) {
      this.setSelectedNodes(this.existingSelectedPermissions);
    }
  }

  treeData: any;
  selectedPermissions: TreeNode[] = [];
  filter = '';

  constructor(private _arrayToTreeConverterService: ArrayToTreeConverterService,
    private _treeDataHelperService: TreeDataHelperService,) { }

  ngOnInit(): void {
  }
  setTreeData(permissions: FlatPermissionDto[]) {
    this.treeData = this._arrayToTreeConverterService.createTree(permissions, 'parentName', 'name', null, 'children',
      [{
        target: 'label',
        source: 'displayName'
      }, {
        target: 'expandedIcon',
        value: 'fa fa-folder-open m--font-warning'
      },
      {
        target: 'collapsedIcon',
        value: 'fa fa-folder m--font-warning'
      },
      {
        target: 'expanded',
        value: true
      }]);
  }

  setSelectedNodes(grantedPermissionNames: string[]) {

    this.selectedPermissions = [];
    _.forEach(grantedPermissionNames, permission => {
      let item = this._treeDataHelperService.findNode(this.treeData, { data: { name: permission } });
      if (item) {
        this.selectedPermissions.push(item);
      }
    });

  }

  getGrantedPermissionNames(): string[] {

    if (!this.selectedPermissions || !this.selectedPermissions.length) {
      return [];
    }

    let permissionNames = [];

    for (let i = 0; i < this.selectedPermissions.length; i++) {
      permissionNames.push(this.selectedPermissions[i].data.name);
    }

    return permissionNames;
  }

  nodeSelect(event) {
    if (this.singleSelect) {
      this.selectedPermissions = [event.node];
      return;
    }

    let parentNode = this._treeDataHelperService.findParent(this.treeData, { data: { name: event.node.data.name } });

    while (parentNode != null) {
      this.selectedPermissions.push(parentNode);
      parentNode = this._treeDataHelperService.findParent(this.treeData, { data: { name: parentNode.data.name } });
    }
  }

  onNodeUnselect(event) {

    let childrenNodes = this._treeDataHelperService.findChildren(this.treeData, { data: { name: event.node.data.name } });
    childrenNodes.push(event.node.data.name);
    _.remove(this.selectedPermissions, x => childrenNodes.indexOf(x.data.name) !== -1);
  }

  filterPermissions(event): void {
    this.filterPermission(this.treeData, this.filter);
  }

  filterPermission(nodes, filterText): any {
    _.forEach(nodes, node => {
      if (node.data.displayName.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
        node.styleClass =
          this.showParentNodes(node);
      } else {
        node.styleClass = 'hidden-tree-node';
      }

      if (node.children) {
        this.filterPermission(node.children, filterText);
      }
    });
  }

  showParentNodes(node): void {
    if (!node.parent) {
      return;
    }

    node.parent.styleClass = '';
    this.showParentNodes(node.parent);
  }
}


