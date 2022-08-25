import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';
import { ContactQuestionsService } from 'src/app/core/services/contact-questions.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ContactQuestions',
  templateUrl: './contact-questions.component.html',
  styleUrls: ['./contact-questions.component.scss']
})
export class ContactQuestionsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  questionsFilter = '';
  solvedFilter = -1;
  contactId: number;
  contactCompanyFilter = '';
  lawfirmServiceServicesNameFilter = '';

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
      primaryKey: 'contactProductQuestion.contactName',
      header: 'ContactName',
    },
    {
      primaryKey: 'contactProductQuestion.creationTime',
      header: 'Date',
      format: PipeFormat.DATE
    },
    {
      primaryKey: 'lawfirmServiceServicesName',
      header: 'ServiceName',
    },
    {
      primaryKey: 'contactProductQuestion.questions',
      header: 'Question',
    },
    {
      primaryKey: 'contactProductQuestion.solved',
      header: 'Solved',
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
    //     this._contactQuestionsService.getcontactProductQuestionForEdit(obj.contactPhoneCallHistory.id).then(s => {
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
    private _contactQuestionsService: ContactQuestionsService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Questions', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._contactQuestionsService.getAll(
      this.filterText,
      this.questionsFilter,
      this.solvedFilter,
      this.contactId,
      this.contactCompanyFilter,
      this.lawfirmServiceServicesNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        
        this.phoneCallList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }
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
          this._contactQuestionsService.delete(id)
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

  clearForm() {
    this.filterText = "";
    this.questionsFilter = "";
    this.solvedFilter = -1;
    this.contactCompanyFilter = "";
    this.lawfirmServiceServicesNameFilter = "";
    this.getRecords();
}


}
