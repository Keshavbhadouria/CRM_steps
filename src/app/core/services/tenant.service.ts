import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnySrvRecord } from 'dns';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor(private _httpClient: HttpClient) { }


  getAllTenants(): any {
    let url_ = environment.apiURL + "/api/services/app/Tenant/GetALLTenants";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.get<any>(url_);
  }
  getTenants(filter: string | null | undefined, tenancyCodeFilter: string | null | undefined, tenancyNameFilter: string | null | undefined, subscriptionEndDateStart: Date | null | undefined, subscriptionEndDateEnd: Date | null | undefined, creationDateStart: Date | null | undefined, creationDateEnd: Date | null | undefined, editionId: number | null | undefined, editionIdSpecified: boolean | undefined, sorting: string | null | undefined, maxResultCount: number | undefined, skipCount: number | undefined):any {
    debugger;
    let url_ = environment.apiURL + "/api/services/app/Tenant/GetTenants?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (tenancyCodeFilter !== undefined && tenancyCodeFilter !== null)
        url_ += "TenancyCodeFilter=" + encodeURIComponent("" + tenancyCodeFilter) + "&";
    if (tenancyNameFilter !== undefined && tenancyNameFilter !== null)
        url_ += "TenancyNameFilter=" + encodeURIComponent("" + tenancyNameFilter) + "&";
    if (subscriptionEndDateStart !== undefined && subscriptionEndDateStart !== null)
        url_ += "SubscriptionEndDateStart=" + encodeURIComponent(subscriptionEndDateStart ? "" + subscriptionEndDateStart : "") + "&";
    if (subscriptionEndDateEnd !== undefined && subscriptionEndDateEnd !== null)
        url_ += "SubscriptionEndDateEnd=" + encodeURIComponent(subscriptionEndDateEnd ? "" + subscriptionEndDateEnd : "") + "&";
    if (creationDateStart !== undefined && creationDateStart !== null)
        url_ += "CreationDateStart=" + encodeURIComponent(creationDateStart ? "" + creationDateStart : "") + "&";
    if (creationDateEnd !== undefined && creationDateEnd !== null)
        url_ += "CreationDateEnd=" + encodeURIComponent(creationDateEnd ? "" + creationDateEnd : "") + "&";
    if (editionId !== undefined && editionId !== null)
        url_ += "EditionId=" + encodeURIComponent("" + editionId) + "&";
    if (editionIdSpecified === null)
        throw new Error("The parameter 'editionIdSpecified' cannot be null.");
    else if (editionIdSpecified !== undefined)
        url_ += "EditionIdSpecified=" + encodeURIComponent("" + editionIdSpecified) + "&";
    if (sorting !== undefined && sorting !== null)
        url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (maxResultCount === null)
        throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
        url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    if (skipCount === null)
        throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
        url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.get<any>(url_).toPromise();
  }
  createTenant(body: CreateTenantInput | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Tenant/CreateTenant";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.post<any>(url_, body).toPromise();
  }
  getTenantForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Tenant/GetTenantForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this._httpClient.get<any>(url_).toPromise();
  }
  updateTenant(body: TenantEditDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Tenant/UpdateTenant";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this._httpClient.put<any>(url_, body).toPromise();
  }
  deleteTenant(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Tenant/DeleteTenant?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.delete<any>(url_).toPromise();

  }
  updateTenantFeatures(body: UpdateTenantFeaturesInput | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Tenant/UpdateTenantFeatures";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this._httpClient.post<any>(url_, body).toPromise();
  }
  resetTenantSpecificFeatures(body: EntityDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Tenant/ResetTenantSpecificFeatures";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.post<any>(url_, body).toPromise();
  }
  unlockTenantAdmin(body: EntityDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Tenant/UnlockTenantAdmin";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this._httpClient.post<any>(url_, body).toPromise();
  }

  getEditionsForCombobox(onlyFreeItems: boolean | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommonLookup/GetEditionsForCombobox?";
    if (onlyFreeItems === null)
      throw new Error("The parameter 'onlyFreeItems' cannot be null.");
    else if (onlyFreeItems !== undefined)
      url_ += "onlyFreeItems=" + encodeURIComponent("" + onlyFreeItems) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.get<any>(url_).toPromise();
  }
  getDefaultEditionName(): any {
    let url_ = environment.apiURL + "/api/services/app/CommonLookup/GetDefaultEditionName";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.get<any>(url_).toPromise();
  }





}
export class TenantEditDto {
  tenancyName: string;
  name: string;
  connectionString: string | undefined;
  editionId: number | undefined;
  isActive: boolean;
  subscriptionEndDateUtc: moment.Moment | undefined;
  isInTrialPeriod: boolean;
  id: number;
  isManualTrackingEnabled: boolean;
}
export class UpdateTenantFeaturesInput {
  id: number;
  featureValues: NameValueDto[];
}

export class NameValueDto {
  name: string | undefined;
  value: string | undefined;
}


export class EntityDto {
  id: number;
}
export class CreateTenantInput {
  tenancyName: string;
  name: string;
  adminEmailAddress: string;
  adminPassword: string | undefined;
  connectionString: string | undefined;
  shouldChangePasswordOnNextLogin: boolean;
  sendActivationEmail: boolean;
  editionId: number | undefined;
  isActive: boolean;
  subscriptionEndDateUtc: moment.Moment | undefined;
  isInTrialPeriod: boolean;
  taxPercent: number;
  isManualTrackingEnabled: boolean;
}
export class SubscribableEditionComboboxItemDto {
  isFree: boolean | undefined;
  value: string | undefined;
  displayText: string | undefined;
  isSelected: boolean;
}


