import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactInvoiceService, CreateOrEditContactInvoiceHeaderDto } from 'src/app/core/services/contact-invoice.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-contact-invoice-modal',
  templateUrl: './create-or-edit-contact-invoice-modal.component.html',
  //styleUrls: ['./create-or-edit-contact-invoice-modal.component.scss']
})
export class CreateOrEditContactInvoiceModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  contactInvoice: CreateOrEditContactInvoiceHeaderDto;
  loading = false;
  createLoader = false;

  contactQuoteHeaders: DropdownDto[];
  contacts : DropdownDto[];


  constructor(private _contactInvoiceService: ContactInvoiceService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.contactInvoice = this.data;

    }
    else {
      this.contactInvoice = new CreateOrEditContactInvoiceHeaderDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactInvoiceService.getAllContactQuoteHeaderForTableDropdown(),
      this._contactInvoiceService.getAllContactsForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contactQuoteHeaders = data[0].result;
          this.contacts = data[1].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.contactInvoice) {
      this._contactInvoiceService.createOrEdit(this.contactInvoice).then(res => {
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
