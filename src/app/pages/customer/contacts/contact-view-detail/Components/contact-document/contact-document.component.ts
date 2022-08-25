import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { ContactDocumentService } from 'src/app/core/services/contact-document.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-document',
  templateUrl: './contact-document.component.html',
  //styleUrls: ['./contact-document.component.scss']
})
export class ContactDocumentComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  documentNameFilter = '';
  location_AisleFilter = '';
  location_BoxFilter = '';
  location_FolderFilter = '';
  contactCompanyFilter = '';
  stepDocumentsDocumentFilter = '';
  contactId: number;


  viewPhoneCall: any;
  editContactDocument: any;
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
      header: 'Contact Name',
    },
    {
      primaryKey: 'stepDocumentsDocument',
      header: 'DocumentType',
    },
    {
      primaryKey: 'contactDocument.documentName',
      header: 'documentName',
    },
    {
      primaryKey: 'contactDocument.description',
      header: 'description',
    },
    {
      primaryKey: 'contactDocument.location_Aisle',
      header: 'location_Aisle',
    },
    {
      primaryKey: 'contactDocument.location_Box',
      header: 'location_Box',
    },
    {
      primaryKey: 'contactDocument.location_Folder',
      header: 'location_Folder',
    },
    {
      primaryKey: 'contactDocument.documentUrl',
      header: 'documentUrl',
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
    }
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService, private route: ActivatedRoute,
    private modalService: NgbModal,
    private _contactDocumentService: ContactDocumentService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Documents', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.paginationSettings.getRecords = () => this.getRecords();

    if (!this.contactId) {
      this.buttonSettings.push({
        title: 'Edit',
        func: (obj) => {
          this.showLoader();
          this._contactDocumentService.getContactDocumentForEdit(obj.contactDocument.id).then(s => {
            this.hideLoader();
            this.editContactDocument = s.result.contactDocument;
            this.modalService.open(this.createModal, this.ngbModalOptions);
          });
        },
        icon: '../../../../assets/icons/editIcon.svg'
      });
      this.buttonSettings.push({
        title: 'Delete',
        func: (obj) => {
          this.onDelete(obj.contactDocument.id);
        },
        icon: '../../../../assets/icons/deleteIcon.svg'
      });

    }
  }

  getRecords() {
    this.showLoader();
    this._contactDocumentService.GetAllByCustomFilters(
      this.filterText,
      this.contactId,
      this.documentNameFilter,
      this.location_AisleFilter,
      this.location_BoxFilter,
      this.location_FolderFilter,
      this.contactCompanyFilter,
      this.stepDocumentsDocumentFilter,
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
    this.editContactDocument = null;
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
