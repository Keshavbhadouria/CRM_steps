import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ContactProductInterestService } from 'src/app/core/services/contact-product-interest.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-product-interest',
  templateUrl: './contact-product-interest.component.html',
  styleUrls: ['./contact-product-interest.component.scss']
})
export class ContactProductInterestComponent implements OnInit {

  constructor(private _contactProductInterestService: ContactProductInterestService, private _messageService: MessageService ,private route: ActivatedRoute) { }

  baseURL = environment.apiURL;
  // bread crumb items
  loading = false;
  breadCrumbItems: Array<{}>;

  contactId: number;

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
    // {
    //   title: 'View',
    //   func: (obj) => {

    //     this.viewProject = obj;
    //   },
    //   icon: '../../../../assets/icons/Visual.png'
    // },
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
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Product Interest', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._contactProductInterestService.getContactProductInterest(
      this.contactId,
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.myData = [];
        this.myData = res.result;
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  //#endregion


  //#region Helper Methods

  toArray(obj) {
    let data = Object.keys(obj).map(i => obj[i]);
    return data[0];
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  //#endregion

}
