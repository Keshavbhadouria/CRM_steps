import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditStepDocumentsDto } from 'src/app/core/models/Lawfirm/StepDocuments';

import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { ServiceActivitiesService } from 'src/app/core/services/service-activities.service';
import { StepDocumentService } from 'src/app/core/services/step-document.service';


@Component({
  selector: 'app-step-document-create-edit-modal',
  templateUrl: './step-document-create-edit-modal.component.html',
  styleUrls: ['./step-document-create-edit-modal.component.scss']
})
export class StepDocumentCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  allLawfirmFeeTypes : DropdownDto[];

  ServiceName: string;
  ActivityName: string;
  stepName: string;

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  StepDocument = new CreateOrEditStepDocumentsDto();

  constructor(private _ServiceActivity : ServiceActivitiesService, private _StepDocumentService: StepDocumentService,private _activatedRoute : ActivatedRoute , private _messageService: MessageService, private modalService: NgbModal) {
    this.loadDropDown();
  }

  ngOnInit() {
    
    this.breadCrumbItems = [{ label: 'Lawfirm Service' }, { label: 'Create StepDocuments', active: true }];
    this.StepDocument = new CreateOrEditStepDocumentsDto();
    this.ServiceName = this._StepDocumentService.serviceName;
    this.StepDocument.lawfirmServiceId = this._StepDocumentService.serviceId
    this.ActivityName = this._StepDocumentService.activityName;
    this.StepDocument.serviceActivityId = this._StepDocumentService.activityId;
    this.stepName = this._StepDocumentService.stepName;
    this.StepDocument.servicesActivityStepId = this._StepDocumentService.stepId;
    if (this.data) {
    this.ServiceName = this.data.lawfirmServiceServicesName;
    this.ActivityName = this.data.serviceActivityActivityName;
    this.stepName =    this.data.servicesActivityStepStep;
      this.StepDocument = this.data.stepDocuments;
    }
  }


  //#region API Methods


  save() {
    
    this.showCreateEditLoader();
    if (this.StepDocument) {
      this._StepDocumentService.createOrEdit(this.StepDocument).then(res => {
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
      this._StepDocumentService.getAllLawfirmFeeTypeForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          
          this.allLawfirmFeeTypes = data[0].result;
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
