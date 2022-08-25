import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountryService, CreateOrEditCRMCountryDto } from 'src/app/core/services/country.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-country-create-edit',
  templateUrl: './country-create-edit.component.html',
  styleUrls: ['./country-create-edit.component.scss']
})
export class CountryCreateEditComponent implements OnInit {
  constructor(private _countryService: CountryService,
    private _messageService: MessageService) { }

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  crmCountry: CreateOrEditCRMCountryDto;
  loading = false;
  createLoader = false;

  ngOnInit(): void {
    if (this.data) {
      this.crmCountry = this.data;
    }
    else {
      this.crmCountry = new CreateOrEditCRMCountryDto();
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.crmCountry) {
      this._countryService.createOrEdit(this.crmCountry).then(res => {
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
