import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApplicationService, CreateOrEditClientApplicationDto } from 'src/app/core/services/application.service';

@Component({
  selector: 'app-application-create-edit',
  templateUrl: './application-create-edit.component.html',
  styleUrls: ['./application-create-edit.component.scss']
})
export class ApplicationCreateEditComponent implements OnInit {

  allClients: any;
  allProjects: any;
  allUsers: any;
  allClientStatuses: any;
  allContacts: any;
  allServerInvontries: any;
  constructor(private _applicationService: ApplicationService,
    private _messageService: MessageService) { }
    public Editor_des = ClassicEditor;
    public Editor_dev = ClassicEditor;
    public Editor_live = ClassicEditor;
    public Editor_quality = ClassicEditor;
    public Editor_certification = ClassicEditor;


    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    clientApplication: CreateOrEditClientApplicationDto;
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      this.loadDropDown();
      if (this.data) {
        this.clientApplication = this.data;
      }
      else {
        this.clientApplication = new CreateOrEditClientApplicationDto();
        this.clientApplication.description = '';
        this.clientApplication.liveEnvironmentDetail = '';
        this.clientApplication.certificationEnvironment = '';
        this.clientApplication.devEnvironmentDetail = '';
        this.clientApplication.qualityAssuranceEnvironment = '';
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.clientApplication) {
        this._applicationService.createOrEdit(this.clientApplication).then(res => {
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
        this._applicationService.getAllClientApplicationStatusForTableDropdown(),
        this._applicationService.getAllPMProjectForTableDropdown(),
        this._applicationService.getAllUserForTableDropdown(),
        this._applicationService.getAllContactForTableDropdown(),
        this._applicationService.getAllServerInventoryForTableDropdown()
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.allClientStatuses = data[0].result;
            this.allProjects = data[1].result;
            this.allUsers = data[2].result;
            this.allContacts = data[3].result;
            this.allServerInvontries = data[4].result;
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
