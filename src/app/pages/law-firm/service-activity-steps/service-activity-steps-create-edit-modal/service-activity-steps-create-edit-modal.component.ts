import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { ServiceActivitiesService } from 'src/app/core/services/service-activities.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditServicesActivityStepDto } from 'src/app/core/models/Lawfirm/ServiceActivitySteps';
import { ServiceActivityStepsService } from 'src/app/core/services/service-activity-steps.service';

@Component({
  selector: 'app-service-activity-steps-create-edit-modal',
  templateUrl: './service-activity-steps-create-edit-modal.component.html',
  styleUrls: ['./service-activity-steps-create-edit-modal.component.scss']
})
export class ServiceActivityStepCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;
  
  public Editor = ClassicEditor;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  allContactTaskRoleList : DropdownDto[];

  ServiceName: string;
  ActivityName: string;

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  ActivityStep: CreateOrEditServicesActivityStepDto = new CreateOrEditServicesActivityStepDto();

  constructor(private _ServiceActivity : ServiceActivitiesService, private _activityStepService: ServiceActivityStepsService,private _activatedRoute : ActivatedRoute , private _messageService: MessageService, private modalService: NgbModal) {
    this.loadDropDown();
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Lawfirm Service' }, { label: 'Create ActivitySteps', active: true }];
    this.ActivityStep = new CreateOrEditServicesActivityStepDto();
    
    
    this.ServiceName = this._ServiceActivity.serviceName;
    this.ActivityStep.lawfirmServiceId = this._ServiceActivity.lawfirmServiceId;
    this.ActivityName = this._activityStepService.serviceActivityName;
    this.ActivityStep.serviceActivityId = this._activityStepService.serviceActivityId;

    if (this.data) {
    this.ServiceName = this.data.lawfirmServiceServicesName;
    this.ActivityName = this.data.serviceActivityActivityName;
    this.ActivityStep = this.data.servicesActivityStep;
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.ActivityStep) {
      this._activityStepService.createOrEdit(this.ActivityStep).then(res => {
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



  loadDropDown() {
    this.showLoader();
    const promises = [
      this._activityStepService.getAllContactTaskRoleForLookupTable(null,null,0,2000),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allContactTaskRoleList = data[0].result.items;
        }
        this.hideLoader();
      });
  }



  //#endregion


  //#region Helper Methods


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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}
