import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { ServiceActivitiesService } from 'src/app/core/services/service-activities.service';
import { ServiceActivityStepsService } from 'src/app/core/services/service-activity-steps.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-activity-steps',
  templateUrl: './service-activity-steps.component.html',
  styleUrls: ['./service-activity-steps.component.scss']
})
export class ServiceActivityStepsComponent implements OnInit {


  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  stepFilter = '';
  maxSortIndexFilter: number;
  maxSortIndexFilterEmpty: number;
  minSortIndexFilter: number;
  minSortIndexFilterEmpty: number;
  activeFilter = -1;
  maxDoOnDayFilter: number;
  maxDoOnDayFilterEmpty: number;
  minDoOnDayFilter: number;
  minDoOnDayFilterEmpty: number;
  a_OverDueFilter = -1;
  a_CompletedFilter = -1;
  a_UpdatedFilter = -1;
  l_OverdueFilter = -1;
  l_CompletedFilter = -1;
  l_UpdateFilter = -1;
  c_OverdueFilter = -1;
  c_CompletedFilter = -1;
  c_UpdateFilter = -1;
  descriptionFilter = '';
  serviceActivityActivityNameFilter = '';
  lawfirmServiceServicesNameFilter = '';
  contactTaskRoleRoleNameFilter = '';
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
      primaryKey: 'serviceActivityActivityName',
      header: 'Activity Name',
    },
    {
      primaryKey: 'lawfirmServiceServicesName',
      header: 'Service Name',
    },
    {
      primaryKey: 'servicesActivityStep.step',
      header: 'Step',
    },
    {
      primaryKey: 'servicesActivityStep.description',
      header: 'description',
    },
    {
      primaryKey: 'servicesActivityStep.sortIndex',
      header: 'SortIndex',
    },
    {
      primaryKey: 'servicesActivityStep.active',
      header: 'Active',
    },
    {
      primaryKey: 'servicesActivityStep.doOnDay',
      header: 'DoOnDay',
    },
    {
      primaryKey: 'servicesActivityStep.a_OverDue',
      header: 'A_OverDue',
    },
    {
      primaryKey: 'servicesActivityStep.a_Completed',
      header: 'A_Completed',
    },
    {
      primaryKey: 'servicesActivityStep.a_Updated',
      header: 'A_Updated',
    },
    {
      primaryKey: 'servicesActivityStep.l_Overdue',
      header: 'L_Overdue',
    },
    {
      primaryKey: 'servicesActivityStep.l_Completed',
      header: 'L_Completed',
    },
    {
      primaryKey: 'servicesActivityStep.l_Update',
      header: 'L_Updated',
    },
    {
      primaryKey: 'servicesActivityStep.c_Overdue',
      header: 'C_Overdue',
    },
    {
      primaryKey: 'servicesActivityStep.c_Completed',
      header: 'C_Completed',
    },
    {
      primaryKey: 'servicesActivityStep.c_Update',
      header: 'C_Updated',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'Step Document',
      func: (obj) => {
        
        this._router.navigate([`/lawfirm/stepsdocument/${obj.servicesActivityStep.lawfirmServiceId}/${obj.lawfirmServiceServicesName}/${obj.servicesActivityStep.serviceActivityId}/${obj.serviceActivityActivityName}/${obj.servicesActivityStep.id}/${obj.servicesActivityStep.step}`]);
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
  //#endregion

  constructor(public _serviceActivityStep : ServiceActivityStepsService,private _activatedRoute : ActivatedRoute, private _router : Router, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Lawfirm Service Activity' }, { label: 'Activity Step List', active: true }];

    this._activatedRoute.queryParams.subscribe(params => {
      this._serviceActivityStep.serviceActivityName = this._activatedRoute.snapshot.paramMap.get('activityName');
      this._serviceActivityStep.serviceActivityId = Number(this._activatedRoute.snapshot.paramMap.get('activityId'));
      this._serviceActivityStep.serviceName = this._activatedRoute.snapshot.paramMap.get('serviceName');
      this._serviceActivityStep.serviceId= Number(this._activatedRoute.snapshot.paramMap.get('serviceId'));
      // this.lawfirmServicesId = this._serviceActivityStep.lawfirmServiceId;
      this.lawfirmActivityId = Number(this._activatedRoute.snapshot.paramMap.get('activityId'));
    });
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }


  //#region API Methods

  getRecords(){
    this.showLoader();
    this._serviceActivityStep.getAll(
      this.filterText,
      this.stepFilter,
      this.maxSortIndexFilter == null ? this.maxSortIndexFilterEmpty : this.maxSortIndexFilter,
      this.minSortIndexFilter == null ? this.minSortIndexFilterEmpty : this.minSortIndexFilter,
      this.activeFilter,
      this.maxDoOnDayFilter == null ? this.maxDoOnDayFilterEmpty : this.maxDoOnDayFilter,
      this.minDoOnDayFilter == null ? this.minDoOnDayFilterEmpty : this.minDoOnDayFilter,
      this.a_OverDueFilter,
      this.a_CompletedFilter,
      this.a_UpdatedFilter,
      this.l_OverdueFilter,
      this.l_CompletedFilter,
      this.l_UpdateFilter,
      this.c_OverdueFilter,
      this.c_CompletedFilter,
      this.c_UpdateFilter,
      this.descriptionFilter,
      this.serviceActivityActivityNameFilter,
      this.lawfirmServiceServicesNameFilter,
      this.contactTaskRoleRoleNameFilter,
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
    this.stepFilter = "";
    this.maxSortIndexFilter = null;
    this.minSortIndexFilter = null;
    this.activeFilter = null;
    this.maxDoOnDayFilter = null;
    this.minDoOnDayFilter = null;
    this.a_OverDueFilter = null;
    this.a_CompletedFilter = null;
    this.a_UpdatedFilter = null;
    this.l_OverdueFilter = null;
    this.l_CompletedFilter = null;
    this.l_UpdateFilter = null;
    this.c_OverdueFilter = null;
    this.c_CompletedFilter = null;
    this.c_UpdateFilter = null;
    this.descriptionFilter = "";
    this.serviceActivityActivityNameFilter = "";
    this.lawfirmServiceServicesNameFilter = "";
    this.contactTaskRoleRoleNameFilter = "";
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
          
          this._serviceActivityStep.delete(activityStep.servicesActivityStep.id).then(res => {
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
