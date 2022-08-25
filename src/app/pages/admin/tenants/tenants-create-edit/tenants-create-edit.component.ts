import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateTenantInput, SubscribableEditionComboboxItemDto, TenantService } from 'src/app/core/services/tenant.service';
import { PasswordComplexitySetting } from 'src/app/core/services/users.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-tenants-create-edit',
  templateUrl: './tenants-create-edit.component.html',
  styleUrls: ['./tenants-create-edit.component.scss']
})
export class TenantsCreateEditComponent implements OnInit {
  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();

  active = false;
  saving = false;
  setRandomPassword = true;
  useHostDb = true;
  editions: SubscribableEditionComboboxItemDto[] = [];
  tenant: CreateTenantInput;
  passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
  isUnlimited = false;
  isSubscriptionFieldsVisible = false;
  isSelectedEditionFree = false;
  tenantAdminPasswordRepeat = '';
  createLoader: boolean =false;
  loading: boolean;

  constructor(private _tenantService: TenantService) { }

  ngOnInit(): void {
    this.active = true;
      this.init();
    // this._profileService.getPasswordComplexitySetting().subscribe(result => {
    //     this.passwordComplexitySetting = result.setting;
    //     this.modal.show();
    // });
  }
  onShown(): void {
    document.getElementById('TenancyName').focus();
  }
  init(): void {
    this.showLoader();
    this.tenant = new CreateTenantInput();
    this.tenant.isActive = true;
    this.tenant.shouldChangePasswordOnNextLogin = true;
    this.tenant.sendActivationEmail = true;
    this.tenant.editionId = 0;
    this.tenant.isInTrialPeriod = false;
    this.tenant.isManualTrackingEnabled = true;

    this._tenantService.getEditionsForCombobox(false)
      .then((result) => {
        this.hideLoader();

        this.editions = result.result.items;

        let notAssignedItem = new SubscribableEditionComboboxItemDto();
        notAssignedItem.value = '';
        notAssignedItem.displayText = "Not Assigned";

       // this.editions.unshift(notAssignedItem);

        this._tenantService.getDefaultEditionName().then((getDefaultEditionResult) => {
          let defaultEdition = _.filter(this.editions, { 'displayText': getDefaultEditionResult.name });
          if (defaultEdition && defaultEdition[0]) {
            this.tenant.editionId = parseInt(defaultEdition[0].value);
            this.toggleSubscriptionFields();
          }
        });
      });
  }
  toggleSubscriptionFields() {
    this.isSelectedEditionFree = this.selectedEditionIsFree();
    if (this.tenant.editionId <= 0 || this.isSelectedEditionFree) {
      this.isSubscriptionFieldsVisible = false;

      if (this.isSelectedEditionFree) {
        this.isUnlimited = true;
      } else {
        this.isUnlimited = false;
      }
    } else {
      this.isSubscriptionFieldsVisible = true;
    }
  }
  selectedEditionIsFree(): boolean {
    let selectedEditions = _.filter(this.editions, { 'value': this.tenant.editionId.toString() })
      .map(u => Object.assign(new SubscribableEditionComboboxItemDto(), u));

    if (selectedEditions.length !== 1) {
      this.isSelectedEditionFree = true;
    }

    let selectedEdition = selectedEditions[0];
    this.isSelectedEditionFree = selectedEdition.isFree;
    return this.isSelectedEditionFree;
  }
  save() {
    this.showCreateEditLoader();
    this.saving = true;

    if (this.setRandomPassword) {
      this.tenant.adminPassword = null;
    }

    if (this.tenant.editionId === 0) {
      this.tenant.editionId = null;
    }

    if (this.isUnlimited) {
      this.tenant.isInTrialPeriod = false;
    }

    if (this.isUnlimited || this.tenant.editionId <= 0) {
      this.tenant.subscriptionEndDateUtc = null;
    }

    this._tenantService.createTenant(this.tenant)
      .then((res) => {
        this.hideCreateEditLoader();
        this.$modalClose.emit(true);
      });
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
  onEditionChange(): void {
    this.tenant.isInTrialPeriod = this.tenant.editionId > 0 && !this.selectedEditionIsFree();
    this.toggleSubscriptionFields();
  }


  onIsUnlimitedChange() {
    if (this.isUnlimited) {
      this.tenant.isInTrialPeriod = false;
    }
  }
  subscriptionEndDateIsValid(): boolean {
    if (this.tenant.editionId <= 0) {
      return true;
    }

    if (this.isUnlimited) {
      return true;
    }

    if (!this.tenant.subscriptionEndDateUtc) {
      return false;
    }

    return this.tenant.subscriptionEndDateUtc !== undefined;
  }
}

