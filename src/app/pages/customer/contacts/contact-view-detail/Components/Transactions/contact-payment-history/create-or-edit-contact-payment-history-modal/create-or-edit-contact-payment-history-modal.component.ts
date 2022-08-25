import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactPaymentHistoriesService, CreateOrEditContactPaymentHistoryDto } from 'src/app/core/services/contact-payment-histories.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-or-edit-contact-payment-history-modal',
  templateUrl: './create-or-edit-contact-payment-history-modal.component.html',
  //styleUrls: ['./create-or-edit-contact-payment-history-modal.component.scss']
})
export class CreateOrEditContactPaymentHistoryModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  contactPaymentHistory: CreateOrEditContactPaymentHistoryDto;
  loading = false;
  createLoader = false;

  contacts: DropdownDto[];
  users: DropdownDto[];
  contactPaymentHistories: DropdownDto[];

  public editor = ClassicEditor;

  constructor(private _contactPaymentHistoryService: ContactPaymentHistoriesService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.contactPaymentHistory = this.data;

    }
    else {
      this.contactPaymentHistory = new CreateOrEditContactPaymentHistoryDto();
      this.contactPaymentHistory.comment = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactPaymentHistoryService.getAllContactForTableDropdown(),
      this._contactPaymentHistoryService.getAllUserForTableDropdown(),
      this._contactPaymentHistoryService.getAllContactPaymentHistoryForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contacts = data[0].result;
          this.users = data[1].result;
          this.contactPaymentHistories = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.contactPaymentHistory) {
      this._contactPaymentHistoryService.createOrEdit(this.contactPaymentHistory).then(res => {
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
