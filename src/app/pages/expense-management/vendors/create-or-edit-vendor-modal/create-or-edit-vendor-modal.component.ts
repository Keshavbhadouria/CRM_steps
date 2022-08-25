import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditCRMVendorDto, VendorsService } from 'src/app/core/services/vendors.service';

@Component({
  selector: 'app-create-or-edit-vendor-modal',
  templateUrl: './create-or-edit-vendor-modal.component.html',
  //styleUrls: ['./create-or-edit-vendor-modal.component.scss']
})
export class CreateOrEditVendorModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  crmVendor: CreateOrEditCRMVendorDto;
  loading = false;
  createLoader = false;

  countries: DropdownDto[];
  states: DropdownDto[];
  cities: DropdownDto[];
  invoiceTerms: DropdownDto[];
  paymentMethods: DropdownDto[];

  constructor(private _vendorService: VendorsService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.crmVendor = this.data;
    }
    else {
      this.crmVendor = new CreateOrEditCRMVendorDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._vendorService.getAllCRMCountryForTableDropdown(),
      this._vendorService.getAllCRMInvoiceTermForTableDropdown(),
      this._vendorService.getAllCRMPaymentMethodForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.countries = data[0].result;
          this.invoiceTerms = data[1].result;
          this.paymentMethods = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.crmVendor) {
      this._vendorService.createOrEdit(this.crmVendor).then((res) => {
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
  onChangeCountry(event): void {
    let id = event?.id ?? undefined;

    this.showLoader();
    this._vendorService.getAllCRMStateForTableDropdown(id)
      .then(data => {
        this.hideLoader();
        this.states = data.result;
      });
  }

  onChangeState(event): void {
    let id = event?.id ?? undefined;

    this.showLoader();
    this._vendorService.getAllCRMCityForTableDropdown(id)
      .then(data => {
        this.hideLoader();
        this.cities = data.result;
      });
  }
}


