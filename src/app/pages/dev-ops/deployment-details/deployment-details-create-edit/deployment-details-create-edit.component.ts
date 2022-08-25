import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditDeploymentManagementDetailDto, DeploymentDetailsService } from 'src/app/core/services/deployment-details.service';


@Component({
  selector: 'app-deployment-details-create-edit',
  templateUrl: './deployment-details-create-edit.component.html',
  styleUrls: ['./deployment-details-create-edit.component.scss']
})
export class DeploymentDetailsCreateEditComponent implements OnInit {
  allClients: any;
  allProjects: any;
  allUsers: any;
  allDeploys: any;
  allTasks: any;
  constructor(private _deployService: DeploymentDetailsService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    deploymentManagementDetail: CreateOrEditDeploymentManagementDetailDto;
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      this.loadDropDown();
      if (this.data) {
        this.deploymentManagementDetail = this.data;
      }
      else {
        this.deploymentManagementDetail = new CreateOrEditDeploymentManagementDetailDto();
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.deploymentManagementDetail) {
        this._deployService.createOrEdit(this.deploymentManagementDetail).then(res => {
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
        this._deployService.getAllPMtaskForTableDropdown(),
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.allDeploys = data[0].result;
            this.allTasks = data[1].result;
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
