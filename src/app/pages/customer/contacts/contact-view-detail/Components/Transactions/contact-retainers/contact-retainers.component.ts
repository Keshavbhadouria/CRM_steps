import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { ContactRetainerService } from 'src/app/core/services/contact-retainer.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'contact-retainers',
  templateUrl: './contact-retainers.component.html',
  styleUrls: ['./contact-retainers.component.scss']
})
export class ContactRetainersComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  contractNameFilter = '';
  physicalFileUrlFilter = '';
  maxCreatedOnFilter: moment.Moment;
  minCreatedOnFilter: moment.Moment;
  contactCompanyFilter = '';
  contracTemplateNameContractNameFilter = '';
  contractStatusStatusNameFilter = '';
  userNameFilter = '';
  contracTemplateNameId: string;
  contactId: number;


  viewPhoneCall: any;
  editPhoneCall: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  phoneCallList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'contactCompany',
      header: 'ContactCompany',
    },
    {
      primaryKey: 'contracTemplateNameContractName',
      header: 'ContracTemplate',
    },
    {
      primaryKey: 'contractStatusStatusName',
      header: 'StatusName',
    },
    {
      primaryKey: 'customerContratTemplate.userName',
      header: 'UserName',
    },
    {
      primaryKey: 'customerContratTemplate.contractName',
      header: 'ContractName',
    },

    {
      primaryKey: 'customerContratTemplate.physicalFileUrl',
      header: 'PhysicalFile',
      type:'link'
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewPhoneCall = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    // {
    //   title: 'Edit',
    //   func: (obj) => {
    //     this.showLoader();
    //     this._contactDocumentService.getcontactProductQuestionForEdit(obj.contactPhoneCallHistory.id).then(s => {
    //       this.hideLoader();
    //       this.editPhoneCall = s.result.contactProductQuestion;
    //       this.modalService.open(this.createModal, this.ngbModalOptions);
    //     });
    //   },
    //   icon: '../../../../assets/icons/editIcon.png'
    // },
    // {
    //   title: 'Delete',
    //   func: (obj) => {
    //     this.onDelete(obj.contactProductQuestion.id);
    //   },
    //   icon: '../../../../assets/icons/deleteIcon.png'
    // },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService, private route: ActivatedRoute,
    private modalService: NgbModal,
    private _contactDocumentService: ContactRetainerService,
    private translate: TranslateService) {


  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Retainer', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.paginationSettings.getRecords = () => this.getRecords();
  }

  getRecords() {
    this.showLoader();
    this._contactDocumentService.GetAllByCustomFilter(
      this.filterText,
      this.contactId,
      this.contractNameFilter,
      this.physicalFileUrlFilter,
      this.maxCreatedOnFilter === undefined ? this.maxCreatedOnFilter : moment(this.maxCreatedOnFilter).endOf('day'),
      this.minCreatedOnFilter === undefined ? this.minCreatedOnFilter : moment(this.minCreatedOnFilter).startOf('day'),
      this.contactCompanyFilter,
      this.contracTemplateNameContractNameFilter,
      this.contractStatusStatusNameFilter,
      this.userNameFilter,
      this.contracTemplateNameId,
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

  // loadDropDown() {
  //   this.showLoader();
  //   const promises = [
  //     this._contactDocumentService.getAllPaymentStatusForLookupTable(),
  //   ];
  //   Promise.all(promises)
  //     .then(data => {
  //       if (data.length > 0) {
  //         this.paymentStatuses = data[0].result;
  //       }
  //       this.hideLoader();
  //     });
  // }


  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.editPhoneCall = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }
  onDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: this.translate.instant('Areyousure?'),
        text: this.translate.instant('RevertMsg'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('confirmButtonTextMsg'),
        cancelButtonText: this.translate.instant('cancelButtonTextMsg'),
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._contactDocumentService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess(this.translate.instant('Deleted!'),
                  this.translate.instant('RecordDeletedSuccessfully'));
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
}
