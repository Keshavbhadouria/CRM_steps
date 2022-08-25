import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditDeploymentManagementDto, DeploymentManagementService } from 'src/app/core/services/deployment-management.service';
import { CreateOrEditDeploymentApprovalProcessDto, DeploymentApprovalService } from 'src/app/core/services/deployment-approval.service';


@Component({
  selector: 'app-deployment-approval-create-edit',
  templateUrl: './deployment-approval-create-edit.component.html',
  styleUrls: ['./deployment-approval-create-edit.component.scss']
})
export class DeploymentApprovalCreateEditComponent implements OnInit {
  allUsers: any;
  allRoles: any;
  allDeploys: any;
  constructor(private _deployService: DeploymentApprovalService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    deploymentApprovalProcess: CreateOrEditDeploymentApprovalProcessDto;
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      this.loadDropDown();
      if (this.data) {
        this.deploymentApprovalProcess = this.data;
      }
      else {
        this.deploymentApprovalProcess = new CreateOrEditDeploymentApprovalProcessDto();
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.deploymentApprovalProcess) {
        this._deployService.createOrEdit(this.deploymentApprovalProcess).then(res => {
          if (res.success) {
            this.hideCreateEditLoader();
            this.$modalClose.emit(true);
          } else {
            this.hideCreateEditLoader();
            this._messageService.showError("Common.Title.Error", "Messages.ServerError");
          }
        });
      }
    }
    loadDropDown(){
      const promises = [
        this._deployService.getAllDeploymentManagementForTableDropdown(),
        this._deployService.getAllRoleForTableDropdown(),
        this._deployService.getAllUserForTableDropdown(),
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.allDeploys = data[0].result;
            this.allRoles = data[1].result;
            this.allUsers = data[2].result;
          }
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

}
