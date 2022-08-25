import { error } from '@angular/compiler/src/util';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditContactDto } from 'src/app/core/models/Customer/Contact';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactService } from 'src/app/core/services/contact.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-contact-create-edit-modal',
  templateUrl: './contact-create-edit-modal.component.html',
  styleUrls: ['./contact-create-edit-modal.component.scss']
})
export class ContactCreateEditModalComponent implements OnInit {

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
  breadCrumbItems: Array<{}>;



	allTargetTitles: DropdownDto[];
  allLeadTemperatures: DropdownDto[];
  allLeadSources:      DropdownDto[];
  allLeadStages:       DropdownDto[];
  allLeadStatuss:      DropdownDto[];

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  contact: CreateOrEditContactDto = new CreateOrEditContactDto();

  constructor(private _contactService: ContactService, private _messageService: MessageService, private modalService: NgbModal) {
    this.loadDropDown();
   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customer' }, { label: 'Create Contact', active: true }];

    if (this.data) {
      this.contact = this.data.contact;
    }
    else {
      this.contact = new CreateOrEditContactDto();
    }
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
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.allLeadSources = data[0].result;
          this.allLeadStages = data[1].result;
          this.allLeadStatuss = data[2].result;
          this.allLeadTemperatures = data[3].result;
          this.allTargetTitles = data[4].result;
        }
        this.hideLoader();
      });
  }


  save() {
    this.showCreateEditLoader();
    if (this.contact) {
      if (!this.contact.score) {
        this.contact.score = 0;
      }
      this._contactService.createOrEdit(this.contact).subscribe((res) => {
        if (res.success) {
          this.hideCreateEditLoader();
          this.$modalClose.emit(true);
        } else {
          this.hideCreateEditLoader();
          this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
      },
        (error) => {
          this.hideCreateEditLoader();
        }
      )
    }
  }



  //#endregion


  //#region Helper Methods


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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}
