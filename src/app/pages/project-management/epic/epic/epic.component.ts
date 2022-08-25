import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { EpicService } from 'src/app/core/services/epic.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss']
})
export class EpicComponent implements OnInit {

  @Input() projectId;
  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;

  filterText = '';
  nameFilter = '';
  descriptionFilter = '';
  businessOutcomeHypotesisFilter = '';
  inScopeFilter = '';
  outScopeFilter = '';
  noFunctionalRequirementsFilter = '';
  mvP_FeaturesFilter = '';
  additionalPotentialFeaturesFilter = '';
  analysisSummaryFilter = '';
  userAffectedFilter = '';
  businessImpactFilter = '';
  pmProjectProjectNameFilter = '';
  contactCompanyFilter = '';
  pmEpicStatusStatusFilter = '';
  editProject: any;
  viewProject: any;
  projId;

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

 // projectId;
  projectDetail;

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    // {
    //   primaryKey: 'pmProjectProjectName',
    //   header: 'Project Name',
    // },
    {
      primaryKey: 'epic.name',
      header: 'Name',
    },
    {
      primaryKey: 'contactCompany',
      header: 'Contact Company',
    },

    // {
    //   primaryKey: 'epic.description',
    //   header: 'Description',
    // },
    {
      primaryKey: 'pmEpicStatusStatus',
      header: 'Status',
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
        this.projId = this.projectId;
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

  constructor(private _EpicService: EpicService, private _messageService: MessageService, private modalService: NgbModal,
    private route: ActivatedRoute, private _projectService: ProjectService) { }

  ngOnInit() {
   // this.projectId = parseInt(this.route.snapshot.paramMap.get('projectId'));

    this.breadCrumbItems = [{ label: 'Epic' }, { label: 'Epic List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
    
    this.loadProjectDetail();
  }

  //#region API Methods

  getRecords() {
    this.showLoader();
    this._EpicService.getAll(
      this.filterText,
      this.nameFilter,
      this.descriptionFilter,
      this.businessOutcomeHypotesisFilter,
      this.inScopeFilter,
      this.outScopeFilter,
      this.noFunctionalRequirementsFilter,
      this.mvP_FeaturesFilter,
      this.additionalPotentialFeaturesFilter,
      this.analysisSummaryFilter,
      this.userAffectedFilter,
      this.businessImpactFilter,
      this.pmProjectProjectNameFilter,
      this.contactCompanyFilter,
      this.pmEpicStatusStatusFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize,
      this.projectId
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.projectList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        // res.result.items.forEach(element => {
        //   this.myData.push(this.toArray(element));
        // });
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  loadProjectDetail() {
    this._projectService.getPMProjectForView(this.projectId)
      .then(res => {
        if (res.success) {
          this.breadCrumbItems = [{ label: res.result.pmProject.projectName }, { label: 'Sprint List', active: true }];
          this.projectDetail = res.result.pmProject;
          this.projId = res.result.pmProject.id;
        }
      });
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
          this._EpicService.delete(pmProject.epic.id).then(res => {
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

  deleteProject(data): boolean {
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
    //this.projId = this.projectId;
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
