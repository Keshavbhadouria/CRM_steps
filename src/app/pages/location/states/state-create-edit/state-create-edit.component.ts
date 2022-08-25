import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditCRMStateDto, StatesService } from 'src/app/core/services/states.service';

@Component({
  selector: 'app-state-create-edit',
  templateUrl: './state-create-edit.component.html',
  styleUrls: ['./state-create-edit.component.scss']
})
export class StateCreateEditComponent implements OnInit {
  constructor(private _stateService: StatesService,
    private _messageService: MessageService) { }

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  crmState: CreateOrEditCRMStateDto;
  loading = false;
  createLoader = false;
  allCountries = [];

  ngOnInit(): void {
    this._stateService.getAllCRMCountryForTableDropdown().then(res => {
      this.allCountries = res.result;
    });
    if (this.data) {
      this.crmState = this.data;
    }
    else {
      this.crmState = new CreateOrEditCRMStateDto();
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.crmState) {
      this._stateService.createOrEdit(this.crmState).then(res => {
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
