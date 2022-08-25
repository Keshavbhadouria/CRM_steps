import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditCRMCustomerDto, CustomersService } from 'src/app/core/services/customers.service';

@Component({
  selector: 'app-customer-create-edit',
  templateUrl: './customer-create-edit.component.html',
  styleUrls: ['./customer-create-edit.component.scss']
})
export class CustomerCreateEditComponent implements OnInit {

  allCountries: any;
  allStates: any;
  allCities: any;
  constructor(private _customerService: CustomersService,
    private _messageService: MessageService) { }

    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    crmCustomer: CreateOrEditCRMCustomerDto = new CreateOrEditCRMCustomerDto();
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      
      if (this.data) {

        this.crmCustomer = this.data;
      }
      else {
        this.crmCustomer = new CreateOrEditCRMCustomerDto();
      }
      this.getCountries();
    }
    getCountries(){
      const promises = [
        this._customerService.getAllCRMCountryForTableDropdown(),
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.allCountries = data[0].result;
          }
          this.hideLoader();
        });
    }
    changeCountry(countryId){
      this._customerService.getAllCRMStateForTableDropdown(countryId).then(res => {
        this.allStates = res.result;
      });
    }
    changeState(stateId){
      this._customerService.getAllCRMCityForTableDropdown(stateId).then(res => {
        this.allCities = res.result;
      });
    }
    save() {
      this.showCreateEditLoader();
      if (this.crmCustomer) {
        this._customerService.createOrEdit(this.crmCustomer).then(res => {
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

}
