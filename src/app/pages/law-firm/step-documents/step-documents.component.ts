import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { StepDocumentService } from 'src/app/core/services/step-document.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-step-documents',
  templateUrl: './step-documents.component.html',
  styleUrls: ['./step-documents.component.scss']
})
export class StepDocumentsComponent implements OnInit {


  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  documentFilter = '';
  uploadByClientOrDeliverByLawyerFilter = -1;
  notifyAdminFilter = -1;
  notifyCustomerFilter = -1;
  notifyLaywerFilter = -1;
  maxFeeFilter : number;
  maxFeeFilterEmpty : number;
  minFeeFilter : number;
  minFeeFilterEmpty : number;
      servicesActivityStepStepFilter = '';
      lawfirmFeeTypeTypeNameFilter = '';
      lawfirmServiceServicesNameFilter = '';
      serviceActivityActivityNameFilter = '';
      LawfirmStepId: number;
      lawfirmActivityId: number;
      lawfirmServicesId: number;


  editProject: any;
  viewProject: any;


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
      primaryKey: 'servicesActivityStepStep',
      header: 'Step Name',
    },
    {
      primaryKey: 'lawfirmFeeTypeTypeName',
      header: 'FeeType',
    },
    {
      primaryKey: 'lawfirmServiceServicesName',
      header: 'ServiceName',
    },
    {
      primaryKey: 'serviceActivityActivityName',
      header: 'ActivityName',
    },
    {
      primaryKey: 'stepDocuments.document',
      header: 'Document',
    },
    {
      primaryKey: 'stepDocuments.uploadByClientOrDeliverByLawyer',
      header: 'UploadByClientOrDeliverByLawyer',
    },
    {
      primaryKey: 'stepDocuments.notifyAdmin',
      header: 'notifyAdmin',
    },
    {
      primaryKey: 'stepDocuments.notifyCustomer',
      header: 'notifyCustomer',
    },
    {
      primaryKey: 'stepDocuments.notifyLaywer',
      header: 'notifyLaywer',
    },
    {
      primaryKey: 'stepDocuments.fee',
      header: 'Fee',
    },
  ];

  buttonSettings: ButtonSettings[] = [
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
  //#endregion

  constructor(public _stepDocumentService : StepDocumentService,private _activatedRoute : ActivatedRoute, private _router : Router, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Activity Steps' }, { label: 'Step Document', active: true }];

    this._activatedRoute.queryParams.subscribe(params => {
      
      this._stepDocumentService.serviceName = this._activatedRoute.snapshot.paramMap.get('serviceName');
      this._stepDocumentService.serviceId = Number(this._activatedRoute.snapshot.paramMap.get('serviceId'));
      this._stepDocumentService.activityName = this._activatedRoute.snapshot.paramMap.get('activityName');
      this._stepDocumentService.activityId = Number(this._activatedRoute.snapshot.paramMap.get('activityId'));
      this._stepDocumentService.stepName = this._activatedRoute.snapshot.paramMap.get('activityStepName');
      this._stepDocumentService.stepId = Number(this._activatedRoute.snapshot.paramMap.get('activityStepId'));
      this.lawfirmServicesId = this._stepDocumentService.serviceId
      this.lawfirmActivityId =this._stepDocumentService.activityId
      this.LawfirmStepId = this._stepDocumentService.stepId
    });
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }


  //#region API Methods

  getRecords(){
    this.showLoader();
    this._stepDocumentService.getAll(
      this.filterText,
            this.documentFilter,
            this.uploadByClientOrDeliverByLawyerFilter,
            this.notifyAdminFilter,
            this.notifyCustomerFilter,
            this.notifyLaywerFilter,
            this.maxFeeFilter == null ? this.maxFeeFilterEmpty: this.maxFeeFilter,
            this.minFeeFilter == null ? this.minFeeFilterEmpty: this.minFeeFilter,
            this.servicesActivityStepStepFilter,
            this.lawfirmFeeTypeTypeNameFilter,
            this.lawfirmServiceServicesNameFilter,
            this.serviceActivityActivityNameFilter,
            this.LawfirmStepId,
            this.lawfirmActivityId,
            this.lawfirmServicesId,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.projectList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  clearForm(){
    this.filterText = "";

    this.getRecords();
}

  onDelete(activityStep) {
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
          this._stepDocumentService.delete(activityStep.stepDocuments.id).then(res => {
            this.hideLoader();
              if (res.success) {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your record has been deleted.',
                  'success'
                );
                this.myData = this.myData.filter(obj => { return obj !== activityStep });
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


  toArray(obj) {
    let data = Object.keys(obj).map(i => obj[i]);
    return data[0];
  }


//#endregion

}
