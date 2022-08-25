import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { LawfirmServicesService } from 'src/app/core/services/lawfirm-services.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ServiceActivitiesService } from 'src/app/core/services/service-activities.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lawfirm-services',
  templateUrl: './lawfirm-services.component.html',
  styleUrls: ['./lawfirm-services.component.scss']
})
export class LawfirmServicesComponent implements OnInit {



  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('memberModal') memberModal: ElementRef;

  

  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;

  filterText = '';
  servicesNameFilter = '';
  maxPriceFilter : number;
  maxPriceFilterEmpty : number;
  minPriceFilter : number;
  minPriceFilterEmpty : number;
  activeFilter = -1;
  descriptionFilter = '';
  lawfirmFeeTypeTypeNameFilter = '';


  editProject: any;
  viewProject: any;


  totalCount: number = 0;
  projectList: any;
  myData: any = [];

  // Create

  active = false;
  saving = false;

  contactCompany = '';
  pmIndustryIndustry = '';
  userName = '';
  pmTaskPriorityPriority = '';
  pmProjectStatusStatus = '';
  pageIcon:any;

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'lawfirmService.servicesName',
      header: 'Service Name',
    },
    {
      primaryKey: 'lawfirmFeeTypeTypeName',
      header: 'FeeType',
    },
    {
      primaryKey: 'lawfirmService.description',
      header: 'Description',
    },
    {
      primaryKey: 'lawfirmService.price',
      header: 'Price',
    },
    {
      primaryKey: 'lawfirmService.active',
      header: 'Active',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'ServiceActivities',
      func: (obj) => {
        this._router.navigate([`/lawfirm/serviceactivities/${obj.lawfirmService.id}/${obj.lawfirmService.servicesName}`]);
        this._serviceActivity.lawfirmService = obj.lawfirmService;
      },
      icon: '../../../../assets/icons/activity.png'
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
    {
      title: 'AddMember',
      func: (obj) => {
        this.memberData = obj;
        this.modalService.open(this.memberModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/add-member.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  memberData: any;
  //#endregion

  constructor(private _lawfirmService : LawfirmServicesService, private _serviceActivity : ServiceActivitiesService, private _router : Router,private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.pageIcon = '../../../../assets/CRMSteps/MenuIcons/services.png'
    this.breadCrumbItems = [{ label: 'Services' }, { label: 'ServicesList', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }


  //#region API Methods

  getRecords(){
    this.showLoader();
    this._lawfirmService.getAll(
      this.filterText,
      this.servicesNameFilter,
      this.maxPriceFilter == null ? this.maxPriceFilterEmpty: this.maxPriceFilter,
      this.minPriceFilter == null ? this.minPriceFilterEmpty: this.minPriceFilter,
      this.activeFilter,
      this.descriptionFilter,
      this.lawfirmFeeTypeTypeNameFilter,
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
            this._lawfirmService.delete(pmProject.lawfirmService.id).then(res => {
              if (res.success) {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your record has been deleted.',
                  'success'
                );
                this.myData = this.myData.filter(obj => { return obj !== pmProject });
                return true;
              }
              else
              this._messageService.showServerSideError();
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
