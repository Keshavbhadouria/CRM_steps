import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CreateOrEditServiceActivityDto } from 'src/app/core/models/Lawfirm/ServiceActivities';
import { CreateOrEditServicesActivityStepDto } from 'src/app/core/models/Lawfirm/ServiceActivitySteps';
import { CreateOrEditStepDocumentsDto } from 'src/app/core/models/Lawfirm/StepDocuments';
import { MessageService } from 'src/app/core/services/message.service';
import { ServiceActivitiesService } from 'src/app/core/services/service-activities.service';
import { ServiceActivityStepsService } from 'src/app/core/services/service-activity-steps.service';
import { StepDocumentService } from 'src/app/core/services/step-document.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-activities',
  templateUrl: './service-activities.component.html',
  styleUrls: ['./service-activities.component.scss']
})
export class ServiceActivitiesComponent implements OnInit {

  pageIcon: any;

  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('createDocModal') createDocModal: ElementRef;
  @ViewChild('editDocModal') editDocModal: ElementRef;
  @ViewChild('viewModalActivityStep') viewModalActivityStep: ElementRef;
  @ViewChild('createModalActivityStep') createModalActivityStep: ElementRef;


  isStepSection: boolean =false;
  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;

  filterText = '';
  activityNameFilter = '';
  maxSortIndexFilter : number;
  maxSortIndexFilterEmpty : number;
  minSortIndexFilter : number;
  minSortIndexFilterEmpty : number;
  lawfirmServicesId: number;
  activeFilter = -1;
  descriptionFilter = '';
  lawfirmServiceServicesNameFilter = '';
  serviceId: number;


  editProject: any;
  viewProject: any;

  editDoc: any;
  viewDoc: any;


  totalCount: number = 0;
  projectList: any;
  myData: any = [];

  // Create

  active = false;
  saving = false;


  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'lawfirmServiceServicesName',
      header: 'Service Name',
    },
    {
      primaryKey: 'serviceActivity.activityName',
      header: 'Activity Name',
    },
    {
      primaryKey: 'serviceActivity.description',
      header: 'Description',
    },
    {
      primaryKey: 'serviceActivity.sortIndex',
      header: 'Sort Index',
    },
    {
      primaryKey: 'serviceActivity.active',
      header: 'Active',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'Activity Steps',
      func: (obj) => {
        this._router.navigate([`/lawfirm/activitysteps/${obj.serviceActivity.lawfirmServiceId}/${obj.lawfirmServiceServicesName}/${obj.serviceActivity.id}/${obj.serviceActivity.activityName}`]);
      },
      icon: '../../../../assets/CRMSteps/MenuIcons/Services Activity Steps.png'
    },
    {
      title: 'View',
      func: (obj) => {
        this.viewProject = obj;
        this.modalService.open(this.viewModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editProject = obj;
        this.modalService.open(this.createModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  serviceName: any;
  stepsData: any;
  currentStepName: any;
  currentActivityName: any;
  selectedIndex = -1;
  isDocuments: boolean = false;
  allDocuments: any;
  editActivity: any;
  viewActivity: any;
  viewActivityStep: any;
  editActivityStep: any;
  currActivityData: any = new CreateOrEditServiceActivityDto();
  selectedDocIndex: any = -1;
  currentStepData: any;
  displayStep: boolean = false;
  //#endregion

  constructor(private _stepDocumentService:StepDocumentService , private _serviceActivity : ServiceActivitiesService, private _serviceActivityStep : ServiceActivityStepsService, private _activatedRoute : ActivatedRoute, private _router : Router, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.pageIcon = '../../../../assets/icons/activity.png'
    this.breadCrumbItems = [{ label: 'Service' }, { label: 'Activities', active: true }];

    this._activatedRoute.queryParams.subscribe(params => {
      this._serviceActivity.serviceName = this._activatedRoute.snapshot.paramMap.get('serviceName');
      this._serviceActivity.lawfirmServiceId = Number(this._activatedRoute.snapshot.paramMap.get('serviceId'));
      this.lawfirmServicesId = this._serviceActivity.lawfirmServiceId;
    });
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }


  //#region API Methods

  getRecords(){
    this.showLoader();
    this._serviceActivity.getAll(
      this.filterText,
      this.activityNameFilter,
      this.maxSortIndexFilter == null ? this.maxSortIndexFilterEmpty: this.maxSortIndexFilter,
      this.minSortIndexFilter == null ? this.minSortIndexFilterEmpty: this.minSortIndexFilter,
      this.activeFilter,
      this.descriptionFilter,
      this.lawfirmServicesId,
      this.lawfirmServiceServicesNameFilter,
      null,
      0,
      9999
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.projectList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.serviceName = this.myData[0].lawfirmServiceServicesName;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  onDelete(pmProject) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._serviceActivity.delete(pmProject.serviceActivity.id).then(res => {
            this.hideLoader();
              if (res.success) {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your record has been deleted.',
                  'success'
                );
                this.myData = this.myData.filter(obj => { return obj !== pmProject });
                return true;
              }
              else {
                this._messageService.showServerSideError();
                this.hideLoader();
              }
            });
        }
      });
  }

  deleteProject(data):  boolean {
    return
  }

  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  //#endregion API

  //#region Helper Methods




  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  openCreateModal(modal: any) {
    this.editProject = null;
    this.modalService.open(modal, { size: 'xl' });
  }

  openEditModal(modal: any, obj) {
    this.editProject = obj;
    this.modalService.open(modal, { size: 'xl' });
  }
  openViewModal(modal: any, obj) {
    this.viewProject = obj;
    this.modalService.open(modal, { size: 'xl' });
  }


  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }
  modalStepEmitEvent(){
    this.closeCreateModal();
    this.getStepByActivityId(this.currActivityData);
  }

  modalDocEmitEvent(){
    this.closeCreateModal();
    this.getDocuments(this.currentStepData);
  }

  toArray(obj) {
    let data = Object.keys(obj).map(i => obj[i]);
    return data[0];
  }

  getStepByActivityId(currActivity){
    this.showLoader();
      this.displayStep = true;
      this.isStepSection = true;
      this.currActivityData = currActivity;
      this.selectedIndex = -1;
      this.stepsData= [];
      this.allDocuments = [];
      this.isDocuments = false;
      this.currentActivityName = this.currActivityData.serviceActivity.activityName;
      this._serviceActivity.getAllSteps(this.currActivityData.serviceActivity.id, this.currActivityData.serviceActivity.lawfirmServiceId).then(res => {

          if(res.result.length > 0){
            this.stepsData = res.result;
          }
          this.hideLoader();
      });
  }

  toggaleDiv(i){
    this.isDocuments = false;
    this.allDocuments = [];
    this.stepsData.forEach((element, index) => {
      if(index == i){
        element.servicesActivityStep.isSelected = !element.servicesActivityStep.isSelected;
      }
      else{
        element.servicesActivityStep.isSelected =  false;
      }
    });
   // this.stepsData[i].servicesActivityStep.isSelected =  !this.stepsData[i].servicesActivityStep.isSelected;
  }

  openCreateActivityStepModal(modal:any){
    var activityStep = new CreateOrEditServicesActivityStepDto();
    activityStep.serviceActivityId = this.currActivityData.serviceActivity.id;
    activityStep.lawfirmServiceId = this.currActivityData.serviceActivity.lawfirmServiceId
    var data = {
      lawfirmServiceServicesName: this._serviceActivity.serviceName,
      serviceActivityActivityName : this.currActivityData.serviceActivity.activityName,
      servicesActivityStep: activityStep
    }
    this.editActivityStep = data;
    this.modalService.open(modal, { size: 'xl' });
  }
  openEditActivityStepModal(modal:any, obj){
    this.editActivityStep = obj;
    this.modalService.open(modal, { size: 'xl' });
  }

  openViewActivityStepModal(modal:any, obj){
    this.viewActivityStep = obj;
    this.modalService.open(modal, { size: 'xl' });
  }

  onDeleteActivityStep(activityStep) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();

          this._serviceActivityStep.delete(activityStep.servicesActivityStep.id).then(res => {
            this.hideLoader();
              if (res.success) {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your record has been deleted.',
                  'success'
                );
                this.stepsData = this.stepsData.filter(obj => { return obj !== activityStep });

                return true;
              }
              else {
                this._messageService.showServerSideError();
                this.hideLoader();
              }
            });
        }
      });
  }

  openCreateDocModal(modal:any, stepData){
    var activityStepdoc = new CreateOrEditStepDocumentsDto();
    activityStepdoc.serviceActivityId = stepData.servicesActivityStep.serviceActivityId;
    activityStepdoc.lawfirmServiceId = stepData.servicesActivityStep.lawfirmServiceId;
    activityStepdoc.servicesActivityStepId = stepData.servicesActivityStep.id;
    var data = {
      lawfirmServiceServicesName: stepData.lawfirmServiceServicesName,
      serviceActivityActivityName : stepData.serviceActivityActivityName,
      servicesActivityStepStep: stepData.servicesActivityStep.step,
      stepDocuments: activityStepdoc
    }
    this.editDoc = data;
    this.modalService.open(modal, { size: 'xl' });
  }

  openEditDocModal(modal:any, obj){
    this.editDoc = obj;
    this.modalService.open(modal, { size: 'xl' });
  }
  openViewDocModal(modal:any, obj){
    this.viewDoc = obj;
    this.modalService.open(modal, { size: 'xl' });
  }

  getDocuments(item){
    this.showLoader();
    this.currentStepData = item;
      this.isDocuments = true;
      this.allDocuments = [];
      this._serviceActivity.getAllDocWithoutFilter( this.currentStepData.servicesActivityStep.id , this.currentStepData.servicesActivityStep.serviceActivityId, this.currentStepData.servicesActivityStep.lawfirmServiceId).then(res => {
        this.selectedDocIndex = -1;
        if(res.result.length > 0){
          this.isDocuments = true;
          this.allDocuments = res.result;
        }
        this.hideLoader();
      })
  }
  onDocDelete(doc) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._stepDocumentService.delete(doc.stepDocuments.id).then(res => {
            this.hideLoader();
              if (res.success) {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your record has been deleted.',
                  'success'
                );
                this.allDocuments = this.allDocuments.filter(obj => { return obj !== doc });
                return true;
              }
              else {
                this._messageService.showServerSideError();
                this.hideLoader();
              }
            });
        }
      });
  }
  toggaleDoc(j){
    this.allDocuments.forEach((element, index) => {
      if(index == j){
        element.stepDocuments.isSelected = !element.stepDocuments.isSelected;
      }
      else{
        element.stepDocuments.isSelected =  false;
      }
    });
    //this.allDocuments[j].stepDocuments.isSelected =  !this.allDocuments[j].stepDocuments.isSelected;
  }
//#endregion
closeStepModal(){
  this.displayStep = false;
}
}
