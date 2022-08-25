import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { CreateOrEditContactDto } from 'src/app/core/models/Customer/Contact';
import { GetContactObjectionForViewDto } from 'src/app/core/models/Customer/ContactObjection';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactService } from 'src/app/core/services/contact.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  isShowAddress = false;
  breadCrumbItems: Array<{}>;


   contactId: number;
    userId: number;
    contactName: string;
    phoneNo: string;
  filterText = '';
  activeFilter = -1;
  commentsFilter = '';
  contactCompanyFilter = '';
  objectionEntityObjectionFilter = '';
  leadTemperatureTemperatureFilter = '';

  allTargetTitles: DropdownDto[];
  allLeadTemperatures: DropdownDto[];
  allLeadSources:      DropdownDto[];
  allLeadStages:       DropdownDto[];
  allLeadStatuss: DropdownDto[];


  activeobjectionIndex: number = 0;
  activeObjection: GetContactObjectionForViewDto = new GetContactObjectionForViewDto();
  isLoadingContactObjections: boolean = false;
  contact: CreateOrEditContactDto = new CreateOrEditContactDto();
  contactObjections: GetContactObjectionForViewDto[] = [];



  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;


  constructor(private _contactService: ContactService, private route: ActivatedRoute,
    private translate: TranslateService,
    private _messageService: MessageService, private modalService: NgbModal) {



   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customer' }, { label: 'Create Contact', active: true }];

    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
        this.contactName = this.route.snapshot.paramMap.get('name');
        this.phoneNo = this.route.snapshot.paramMap.get('phoneno');



    if (!this._contactService.allTargetTitles) {
      this.loadDropDown();
    }
    else {
      this.allLeadSources = this._contactService.allLeadSources;
      this.allLeadStages = this._contactService.allLeadStages;
      this.allLeadStatuss = this._contactService.allLeadStatuss;
      this.allLeadTemperatures = this._contactService.allLeadTemperatures;
      this.allTargetTitles = this._contactService.allTargetTitles;
    }

    if (this._contactService.editObj) {
      this.contact = this._contactService.editObj.contact
    }
    else {
      this.contact = new CreateOrEditContactDto();
    }
    this.getContactObjectionById()
  }


  //#region API Methods




  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactService.getAllLeadSourceForTableDropdown(),
      this._contactService.getAllLeadStageForTableDropdown(),
      this._contactService.getAllLeadStatusForTableDropdown(),
      this._contactService.getAllLeadTemperatureForTableDropdown(),
      this._contactService.getAllTargetTitleForTableDropdown(),
      this._contactService.getContactForEdit(this.contactId),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this._contactService.allLeadSources = data[0].result;
          this._contactService.allLeadStages = data[1].result;
          this._contactService.allLeadStatuss = data[2].result;
          this._contactService.allLeadTemperatures = data[3].result;
          this._contactService.allTargetTitles = data[4].result;
          this.contact = data[5].result.contact;

          this.allLeadSources = this._contactService.allLeadSources;
          this.allLeadStages = this._contactService.allLeadStages;
          this.allLeadStatuss = this._contactService.allLeadStatuss;
          this.allLeadTemperatures = this._contactService.allLeadTemperatures;
          this.allTargetTitles = this._contactService.allTargetTitles;
        }
        this.hideLoader();
      });
  }



  getContactObjectionById() {
    this.isLoadingContactObjections = true;
    this._contactService.getAllByContactId(
        this.filterText,
        this.activeFilter,
        this.contactId,
        this.commentsFilter,
        this.contactCompanyFilter,
        this.objectionEntityObjectionFilter,
        this.leadTemperatureTemperatureFilter,
        null,
        0,
        200
    ).then((result) => {
        this.contactObjections = result.result.items;
        if (this.contactObjections.length > 0) {
            this.activeobjectionIndex = 0;
            this.activeObjection = this.contactObjections[0];
        }

        this.isLoadingContactObjections = false;
    },
        (error) => {
            this.isLoadingContactObjections = false;
        }
    );
}



  save() {
    this.showCreateEditLoader();
    if (this.contact) {
      this._contactService.createOrEdit(this.contact).subscribe((res) => {
          
        if (res.success) {
          this.hideCreateEditLoader();
          this._messageService.showSuccess(this.translate.instant('Updated'),
          this.translate.instant('RecordUpdatedSuccessfully'))
        } else {
          this.hideCreateEditLoader();
          this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
      },
      ).catch(error => {
        this._messageService.showError(error.error?.message || "Some thing went wrong.", "Common.Title.Error");
        this.hideCreateEditLoader();
      })
    }

  }



  //#endregion


  //#region Helper Methods




  openCreateModal(modal: any) {
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
    //this.getRecords();
  }

  previousIndex() {
    if (this.activeobjectionIndex > 0) {
        this.activeobjectionIndex = this.activeobjectionIndex - 1;
        this.activeObjection = this.contactObjections[this.activeobjectionIndex];
    }
}

nextIndex() {
    
    if ((this.contactObjections.length - 1) > this.activeobjectionIndex) {
        this.activeobjectionIndex = this.activeobjectionIndex + 1;
        this.activeObjection = this.contactObjections[this.activeobjectionIndex];
    }
}

goToIndex(i) {
    this.activeobjectionIndex = i;
    this.activeObjection = this.contactObjections[i];
}

  onSelectTemperature(temperatureId) {
    this.contact.leadTemperatureId = temperatureId
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



  //#endregion


}
