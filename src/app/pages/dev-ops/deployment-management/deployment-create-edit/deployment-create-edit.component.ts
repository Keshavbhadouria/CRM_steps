import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BusinessTypeService, CreateOrEditActionTypeDto } from 'src/app/core/services/business-type.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditDeploymentManagementDto, DeploymentManagementService } from 'src/app/core/services/deployment-management.service';

@Component({
  selector: 'app-deployment-create-edit',
  templateUrl: './deployment-create-edit.component.html',
  styleUrls: ['./deployment-create-edit.component.scss']
})
export class DeploymentCreateEditComponent implements OnInit {
  allClients: any;
  allProjects: any;
  allUsers: any;
  constructor(private _deployService: DeploymentManagementService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    deploymentManagement: CreateOrEditDeploymentManagementDto;
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      this.loadDropDown();
      if (this.data) {
        this.deploymentManagement = this.data;
      }
      else {
        this.deploymentManagement = new CreateOrEditDeploymentManagementDto();
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.deploymentManagement) {
        this._deployService.createOrEdit(this.deploymentManagement).then(res => {
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
        this._deployService.getAllClientApplicationForTableDropdown(),
        this._deployService.getAllPMProjectForTableDropdown(),
        this._deployService.getAllUserForTableDropdown(),
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.allClients = data[0].result;
            this.allProjects = data[1].result;
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
