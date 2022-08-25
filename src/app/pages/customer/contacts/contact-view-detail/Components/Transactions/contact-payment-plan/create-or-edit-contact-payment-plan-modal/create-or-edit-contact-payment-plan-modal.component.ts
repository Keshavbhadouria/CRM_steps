import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactPaymentPlanService, CreateOrEditPaymentPlanHeaderDto } from 'src/app/core/services/contact-payment-plan.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-contact-payment-plan-modal',
  templateUrl: './create-or-edit-contact-payment-plan-modal.component.html',
  //styleUrls: ['./create-or-edit-contact-payment-plan-modal.component.scss']
})
export class CreateOrEditContactPaymentPlanModalComponent implements OnInit {


  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  contactPaymentPlan: CreateOrEditPaymentPlanHeaderDto;
  loading = false;
  createLoader = false;

  contactInvoiceHeaders: DropdownDto[];
  contacts: DropdownDto[];
  users: DropdownDto[];

  constructor(private _paymentPlanService: ContactPaymentPlanService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.contactPaymentPlan = this.data;

    }
    else {
      this.contactPaymentPlan = new CreateOrEditPaymentPlanHeaderDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._paymentPlanService.getAllContactInvoiceHeaderForTableDropdown(),
      this._paymentPlanService.getAllContactForTableDropdown(),
      this._paymentPlanService.getAllUserForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contactInvoiceHeaders = data[0].result;
          this.contacts = data[1].result;
          this.users = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.contactPaymentPlan) {
      this._paymentPlanService.createOrEdit(this.contactPaymentPlan).then(res => {
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
