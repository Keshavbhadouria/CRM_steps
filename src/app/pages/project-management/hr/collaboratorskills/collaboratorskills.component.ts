import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CollaboratorSkillsService } from 'src/app/core/services/collaborator-skills.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaboratorskills',
  templateUrl: './collaboratorskills.component.html',
  styleUrls: ['./collaboratorskills.component.scss']
})
export class CollaboratorskillsComponent implements OnInit {


  baseURL = environment.apiURL;

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  maxYearsExperienceFilter : number;
  maxYearsExperienceFilterEmpty : number;
  minYearsExperienceFilter : number;
  minYearsExperienceFilterEmpty : number;
      collaboratorFullnameFilter = '';
      skillSkillNameFilter = '';



  editCollaborator: any;
  viewCollaborator: any;


  totalCount: number = 0;
  CollaboratorList: any;
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
      primaryKey: 'collaboratorFullname',
      header: 'FullName',
    },
    {
      primaryKey: 'skillSkillName',
      header: 'Skill Name',
    },
    {
      primaryKey: 'collaboratorSkill.yearsExperience',
      header: 'Experience Years',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewCollaborator = obj;
        this.modalService.open(this.viewModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editCollaborator = obj;
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

  constructor(
    private _collaboratorSkillsService: CollaboratorSkillsService, private _messageService: MessageService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Collaborator Skills' }, { label: 'Collaborator Skills List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._collaboratorSkillsService.getAll(
      this.filterText,
            this.maxYearsExperienceFilter == null ? this.maxYearsExperienceFilterEmpty: this.maxYearsExperienceFilter,
            this.minYearsExperienceFilter == null ? this.minYearsExperienceFilterEmpty: this.minYearsExperienceFilter,
            this.collaboratorFullnameFilter,
            this.skillSkillNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }


  deleteCollaborator(data): boolean {
    return this._collaboratorSkillsService.delete(data.collaboratorSkill.id).then(res => {
      if (res.success)
        return true;
      else
        return false;
    });
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
    this.editCollaborator = null;
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

  onViewCollaborator(item, modal) {
    this.viewCollaborator = item;
    this.modalService.open(modal, { size: 'xl' });
  }

  onDelete(pmCollaborator) {


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
          if (this.deleteCollaborator(pmCollaborator)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
            this.myData = this.myData.filter(obj => { return obj !== pmCollaborator });
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }

  //#endregion

}
