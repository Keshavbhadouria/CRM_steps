import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ContactEmailService } from 'src/app/core/services/contact-email.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'ContactEmail',
  templateUrl: './contact-email.component.html',
  styleUrls: ['./contact-email.component.scss']
})
export class ContactEmailComponent implements OnInit {



  constructor(private _contactEmailService: ContactEmailService, private _messageService: MessageService, public modalService: NgbModal , private route: ActivatedRoute) { }


  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  baseURL = environment.apiURL;
  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  subjectFilter = '';
  bodyMessageFilter = '';
  gatewayFilter = '';
  gatewayResponseFilter = '';
  attachmentUrlFilter = '';
  userNameFilter = '';
  contactCompanyFilter = '';
  contactId: number;
  lawyerId: number;

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
      primaryKey: 'userName',
      header: 'Username',
    },
    {
      primaryKey: 'contactCompany',
      header: 'Company',
    },
    {
      primaryKey: 'contactEmailHistory.subject',
      header: 'Subject',
    },
    {
      primaryKey: 'contactEmailHistory.bodyMessage',
      header: 'Message',
    },
    {
      primaryKey: 'contactEmailHistory.gateway',
      header: 'Gateway',
    },
    {
      primaryKey: 'contactEmailHistory.gatewayResponse',
      header: 'GatewayResponse',
    },
    {
      primaryKey: 'contactEmailHistory.attachmentUrl',
      header: 'Aattachment',
      type : 'link'
    },

  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        
        this.viewProject = obj;
        this.modalService.open(this.viewModal, { size: 'lg' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    // {
    //   title: 'Edit',
    //   func: (obj) => {
    //     this.editProject = obj;
    //     this.modalService.open(this.createModal, { size: 'md' });
    //   },
    //   icon: '../../../../assets/icons/editIcon.png'
    // },
    // {
    //   title: 'Delete',
    //   func: (obj) => {
    //     this.onDelete(obj);
    //   },
    //   icon: '../../../../assets/icons/deleteIcon.png'
    // },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();

  //#endregion


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Email List', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._contactEmailService.getAllByFilters(
      this.filterText,
      this.subjectFilter,
      this.bodyMessageFilter,
      this.gatewayFilter,
      this.gatewayResponseFilter,
      this.attachmentUrlFilter,
      this.userNameFilter,
      this.contactCompanyFilter,
      this.contactId,
      this.lawyerId,
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



  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  onDelete(pmProjectStatus) {
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
          if (this.deleteProject(pmProjectStatus)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.myData = this.myData.filter(obj => { return obj !== pmProjectStatus });
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }

  deleteProject(data): boolean {
    return this._contactEmailService.delete(data.id).then(res => {
      if (res.success)
        return true;
      else
        return false;
    });
  }




  //#endregion


  //#region Helper Methods

  toArray(obj) {
    let data = Object.keys(obj).map(i => obj[i]);
    return data[0];
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

  openCreateModal(modal: any) {
    this.editProject = null;
    this.modalService.open(modal, { size: 'md' });
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


  onEditProject(item, modal) {
    this.editProject = item;
    this.modalService.open(modal, { size: 'md' });
  }

  onViewProject(item, modal) {
    this.viewProject = item;
    this.modalService.open(modal, { size: 'md' });
  }



  //#endregion


}
