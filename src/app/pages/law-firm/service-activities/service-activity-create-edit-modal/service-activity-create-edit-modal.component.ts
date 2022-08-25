import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditServiceActivityDto } from 'src/app/core/models/Lawfirm/ServiceActivities';
import { ServiceActivitiesService } from 'src/app/core/services/service-activities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-activity-create-edit-modal',
  templateUrl: './service-activity-create-edit-modal.component.html',
  styleUrls: ['./service-activity-create-edit-modal.component.scss']
})
export class ServiceActivityCreateEditModalComponent implements OnInit {

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

  allLawfirmServiceActivitys: DropdownDto[];
  ServiceName: string;

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  ServiceActivity: CreateOrEditServiceActivityDto = new CreateOrEditServiceActivityDto();

  constructor(private _ServiceActivity: ServiceActivitiesService,private _activatedRoute : ActivatedRoute , private _messageService: MessageService, private modalService: NgbModal) {
   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Lawfirm Service' }, { label: 'Create ServiceActivitys', active: true }];
    this.ServiceActivity = new CreateOrEditServiceActivityDto();
    if (this._ServiceActivity.lawfirmServiceId && this._ServiceActivity.serviceName) {
      this.ServiceActivity.lawfirmServiceId = this._ServiceActivity.lawfirmServiceId;
      this.ServiceName = this._ServiceActivity.serviceName;
    } else {

    }
    if (this.data) {
      this.ServiceActivity = this.data.serviceActivity;
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.ServiceActivity) {
      this._ServiceActivity.createOrEdit(this.ServiceActivity).then(res => {
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

  // loadDropDown() {
  //   this.showLoader();
  //   const promises = [
  //     this._ServiceActivity.getAllLawfirmFeeTypeForTableDropdown(),
  //   ];
  //   Promise.all(promises)
  //     .then(data => {
  //       if (data.length > 0) {
  //         this.allLawfirmServiceActivitys = data[0].result;
  //       }
  //       this.hideLoader();
  //     });
  // }



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
