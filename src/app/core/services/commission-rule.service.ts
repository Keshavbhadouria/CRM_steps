import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommissionRuleService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, maxSalesAmountFilter: number | null | undefined, minSalesAmountFilter: number | null | undefined, maxPercentageFilter: number | null | undefined, minPercentageFilter: number | null | undefined, maxAffiliateCommissionFilter: number | null | undefined, minAffiliateCommissionFilter: number | null | undefined, maxPayAfterDaysFilter: number | null | undefined, minPayAfterDaysFilter: number | null | undefined, activeFilter: number | null | undefined, affiliateTierTierNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionRules/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxSalesAmountFilter !== undefined && maxSalesAmountFilter !== null)
      url_ += "MaxSalesAmountFilter=" + encodeURIComponent("" + maxSalesAmountFilter) + "&";
    if (minSalesAmountFilter !== undefined && minSalesAmountFilter !== null)
      url_ += "MinSalesAmountFilter=" + encodeURIComponent("" + minSalesAmountFilter) + "&";
    if (maxPercentageFilter !== undefined && maxPercentageFilter !== null)
      url_ += "MaxPercentageFilter=" + encodeURIComponent("" + maxPercentageFilter) + "&";
    if (minPercentageFilter !== undefined && minPercentageFilter !== null)
      url_ += "MinPercentageFilter=" + encodeURIComponent("" + minPercentageFilter) + "&";
    if (maxAffiliateCommissionFilter !== undefined && maxAffiliateCommissionFilter !== null)
      url_ += "MaxAffiliateCommissionFilter=" + encodeURIComponent("" + maxAffiliateCommissionFilter) + "&";
    if (minAffiliateCommissionFilter !== undefined && minAffiliateCommissionFilter !== null)
      url_ += "MinAffiliateCommissionFilter=" + encodeURIComponent("" + minAffiliateCommissionFilter) + "&";
    if (maxPayAfterDaysFilter !== undefined && maxPayAfterDaysFilter !== null)
      url_ += "MaxPayAfterDaysFilter=" + encodeURIComponent("" + maxPayAfterDaysFilter) + "&";
    if (minPayAfterDaysFilter !== undefined && minPayAfterDaysFilter !== null)
      url_ += "MinPayAfterDaysFilter=" + encodeURIComponent("" + minPayAfterDaysFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
      url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (affiliateTierTierNameFilter !== undefined && affiliateTierTierNameFilter !== null)
      url_ += "AffiliateTierTierNameFilter=" + encodeURIComponent("" + affiliateTierTierNameFilter) + "&";
    if (sorting !== undefined && sorting !== null)
      url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditCommissionRuleDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionRules/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getCommissionRuleForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionRules/GetCommissionRuleForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionRules/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllAffiliateTierForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionRules/GetAllAffiliateTierForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditCommissionRuleDto {
  salesAmount!: number;
  percentage!: number;
  affiliateCommission!: number;
  payAfterDays!: number;
  active!: boolean;
  affiliateTierId!: number;
  id!: number | undefined;
}
