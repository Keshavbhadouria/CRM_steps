import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ContactQuotationService, CreateOrEditContactQuoteHeaderDto } from 'src/app/core/services/contact-quotation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-or-edit-contact-quotation-modal',
  templateUrl: './create-or-edit-contact-quotation-modal.component.html',
  //styleUrls: ['./create-or-edit-contact-quotation-modal.component.scss']
})
export class CreateOrEditContactQuotationModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  contactQuotation: CreateOrEditContactQuoteHeaderDto;
  loading = false;
  createLoader = false;

  contacts: DropdownDto[];
  users : DropdownDto[];

  public editor = ClassicEditor;

  constructor(private _contactQuotationService: ContactQuotationService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.contactQuotation = this.data;

    }
    else {
      this.contactQuotation = new CreateOrEditContactQuoteHeaderDto();
      this.contactQuotation.comments = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactQuotationService.getAllContactForTableDropdown(),
      this._contactQuotationService.getAllUserForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contacts = data[0].result;
          this.users = data[1].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.contactQuotation) {
      this._contactQuotationService.createOrEdit(this.contactQuotation).then(res => {
        if (res.success) {
          this.hideCreateEditLoader();
          this.$modalClose.emit(true);
        } else {
          this.hideCreateEditLoader();
          this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
      });
    }

  }
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
