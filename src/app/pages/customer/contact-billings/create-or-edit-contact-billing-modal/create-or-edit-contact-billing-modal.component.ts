import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactBillingService, CreateOrEditContactBillingDto } from 'src/app/core/services/contact-billing.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-contact-billing-modal',
  templateUrl: './create-or-edit-contact-billing-modal.component.html',
  //styleUrls: ['./create-or-edit-contact-billing-modal.component.scss']
})
export class CreateOrEditContactBillingModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  contactBilling: CreateOrEditContactBillingDto;
  loading = false;
  createLoader = false;

  contacts: DropdownDto[];

  constructor(private _contactBiilingService: ContactBillingService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.contactBilling = this.data;
    }
    else {
      this.contactBilling = new CreateOrEditContactBillingDto();
    }
    this.loadDropDown();
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactBiilingService.getAllContactForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contacts = data[0].result;
        }
        this.hideLoader();
      });
  }

  save(): void {
    this.showCreateEditLoader();
    if (this.contactBilling) {
      this._contactBiilingService.createOrEdit(this.contactBilling).then(res => {
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
