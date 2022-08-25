import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { SubscribableEditionComboboxItemDto, TenantEditDto, TenantService } from 'src/app/core/services/tenant.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-tenants-update',
  templateUrl: './tenants-update.component.html',
  styleUrls: ['./tenants-update.component.scss']
})
export class TenantsUpdateComponent implements OnInit {
  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  @ViewChild('SubscriptionEndDateUtc') subscriptionEndDateUtc: ElementRef;
  active = false;
  saving = false;
  isUnlimited = false;
  subscriptionEndDateUtcIsValid = false;
  tenant: TenantEditDto = undefined;
  currentConnectionString: string;
  editions: SubscribableEditionComboboxItemDto[] = [];
  isSubscriptionFieldsVisible = false;
  createLoader: boolean;
  loading: boolean;

  constructor(private _tenantService: TenantService,) { }

  ngOnInit(): void {
    // this.tenant = this.data;
    this.showLoader();
    this.active = true;
    this._tenantService.getEditionsForCombobox(false).then(editionsResult => {
      this.editions = editionsResult.result.items;
      let notSelectedEdition = new SubscribableEditionComboboxItemDto();
      notSelectedEdition.displayText = "Not Assigned";
      notSelectedEdition.value = '';
      // this.editions.unshift(notSelectedEdition);
      this._tenantService.getTenantForEdit(this.data.id).then((tenantResult) => {
        this.tenant = tenantResult.result;
        this.currentConnectionString = tenantResult.connectionString;
        this.tenant.editionId = this.tenant.editionId || 0;
        this.isUnlimited = !this.tenant.subscriptionEndDateUtc;
        this.subscriptionEndDateUtcIsValid = this.isUnlimited || this.tenant.subscriptionEndDateUtc !== undefined;
        this.toggleSubscriptionFields();
        this.hideLoader();

      });
    });
  }
  onShown(): void {
    document.getElementById('Name').focus();

    if (this.tenant.subscriptionEndDateUtc) {
        (this.subscriptionEndDateUtc.nativeElement as any).value = moment(this.tenant.subscriptionEndDateUtc).format('L');
    }
}

subscriptionEndDateChange(e): void {
    this.subscriptionEndDateUtcIsValid = e && e.date !== false || this.isUnlimited;
}

selectedEditionIsFree(): boolean {
    if (!this.tenant.editionId) {
        return true;
    }

    let selectedEditions = _.filter(this.editions, { value: this.tenant.editionId + '' });
    if (selectedEditions.length !== 1) {
        return true;
    }

    let selectedEdition = selectedEditions[0];
    return selectedEdition.isFree;
}

save(): void {
  this.showCreateEditLoader();
    if (this.tenant.editionId === 0) {
        this.tenant.editionId = null;
    }

    if (this.isUnlimited) {
        this.tenant.isInTrialPeriod = false;
    }

    //take selected date as UTC
    if (this.isUnlimited || !this.tenant.editionId) {
        this.tenant.subscriptionEndDateUtc = null;
    }

    this._tenantService.updateTenant(this.tenant)
        .then(() => {
          this.hideCreateEditLoader();
          this.$modalClose.emit(true);
        });
}

close(): void {
    this.active = false;
    this.modal.hide();
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
    if (this.selectedEditionIsFree()) {
        this.tenant.isInTrialPeriod = false;
    }

    this.toggleSubscriptionFields();
}

onUnlimitedChange(): void {
    if (this.isUnlimited) {
        this.tenant.subscriptionEndDateUtc = null;
        this.subscriptionEndDateUtcIsValid = true;
        this.tenant.isInTrialPeriod = false;
    } else {
        if (!this.tenant.subscriptionEndDateUtc) {
            this.subscriptionEndDateUtcIsValid = false;
        }
    }
}
  toggleSubscriptionFields() {
    if (this.tenant.editionId > 0) {
      this.isSubscriptionFieldsVisible = true;
    } else {
      this.isSubscriptionFieldsVisible = false;
    }
  }
}
