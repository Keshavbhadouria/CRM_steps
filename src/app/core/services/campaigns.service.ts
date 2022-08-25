import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignsServiceProxy {
  constructor(private http: HttpClient, private _router: Router) { }
 

  /**
   * @param filter (optional) 
   * @param campaignNameFilter (optional) 
   * @param maxStartDateFilter (optional) 
   * @param minStartDateFilter (optional) 
   * @param maxEndDateFilter (optional) 
   * @param minEndDateFilter (optional) 
   * @param maxBudgetFilter (optional) 
   * @param minBudgetFilter (optional) 
   * @param specialCodeFilter (optional) 
   * @param maxExpectedOutcomeFilter (optional) 
   * @param minExpectedOutcomeFilter (optional) 
   * @param campaignObjetiveObjetiveFilter (optional) 
   * @param leadSourceSourceNameFilter (optional) 
   * @param sorting (optional) 
   * @param skipCount (optional) 
   * @param maxResultCount (optional) 
   * @return Success
   */
  getAll(filter: string | null | undefined, campaignNameFilter: string | null | undefined, maxStartDateFilter: moment.Moment | null | undefined, minStartDateFilter: moment.Moment | null | undefined, maxEndDateFilter: moment.Moment | null | undefined, minEndDateFilter: moment.Moment | null | undefined, maxBudgetFilter: number | null | undefined, minBudgetFilter: number | null | undefined, specialCodeFilter: string | null | undefined, maxExpectedOutcomeFilter: number | null | undefined, minExpectedOutcomeFilter: number | null | undefined, campaignObjetiveObjetiveFilter: string | null | undefined, leadSourceSourceNameFilter: string | null | undefined, affiliateId: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/Campaigns/GetAll?";
      if (filter !== undefined && filter !== null)
          url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
      if (campaignNameFilter !== undefined && campaignNameFilter !== null)
          url_ += "CampaignNameFilter=" + encodeURIComponent("" + campaignNameFilter) + "&";
      if (maxStartDateFilter !== undefined && maxStartDateFilter !== null)
          url_ += "MaxStartDateFilter=" + encodeURIComponent(maxStartDateFilter ? "" + maxStartDateFilter.toJSON() : "") + "&";
      if (minStartDateFilter !== undefined && minStartDateFilter !== null)
          url_ += "MinStartDateFilter=" + encodeURIComponent(minStartDateFilter ? "" + minStartDateFilter.toJSON() : "") + "&";
      if (maxEndDateFilter !== undefined && maxEndDateFilter !== null)
          url_ += "MaxEndDateFilter=" + encodeURIComponent(maxEndDateFilter ? "" + maxEndDateFilter.toJSON() : "") + "&";
      if (minEndDateFilter !== undefined && minEndDateFilter !== null)
          url_ += "MinEndDateFilter=" + encodeURIComponent(minEndDateFilter ? "" + minEndDateFilter.toJSON() : "") + "&";
      if (maxBudgetFilter !== undefined && maxBudgetFilter !== null)
          url_ += "MaxBudgetFilter=" + encodeURIComponent("" + maxBudgetFilter) + "&";
      if (minBudgetFilter !== undefined && minBudgetFilter !== null)
          url_ += "MinBudgetFilter=" + encodeURIComponent("" + minBudgetFilter) + "&";
      if (specialCodeFilter !== undefined && specialCodeFilter !== null)
          url_ += "SpecialCodeFilter=" + encodeURIComponent("" + specialCodeFilter) + "&";
      if (maxExpectedOutcomeFilter !== undefined && maxExpectedOutcomeFilter !== null)
          url_ += "MaxExpectedOutcomeFilter=" + encodeURIComponent("" + maxExpectedOutcomeFilter) + "&";
      if (minExpectedOutcomeFilter !== undefined && minExpectedOutcomeFilter !== null)
          url_ += "MinExpectedOutcomeFilter=" + encodeURIComponent("" + minExpectedOutcomeFilter) + "&";
      if (campaignObjetiveObjetiveFilter !== undefined && campaignObjetiveObjetiveFilter !== null)
          url_ += "CampaignObjetiveObjetiveFilter=" + encodeURIComponent("" + campaignObjetiveObjetiveFilter) + "&";
      if (leadSourceSourceNameFilter !== undefined && leadSourceSourceNameFilter !== null)
          url_ += "LeadSourceSourceNameFilter=" + encodeURIComponent("" + leadSourceSourceNameFilter) + "&";
          if (sorting !== undefined && sorting !== null)
          url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (affiliateId !== undefined && affiliateId !== null)
          url_ += "AffiliateId=" + encodeURIComponent("" + affiliateId) + "&";
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

  getUniqueCode(): any {
    let url_ = environment.apiURL + "/api/services/app/Campaigns/GetUniqueCode"

    return this.http.get<any>(url_).toPromise();
  }

  /**
   * @param id (optional) 
   * @return Success
   */
  getCampaignForView(id: number | undefined):any {
      let url_ = environment.apiURL + "/api/services/app/Campaigns/GetCampaignForView?";
      if (id === null)
          throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
          url_ += "id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.get<any>(url_).toPromise();
  }

 

  /**
   * @param id (optional) 
   * @return Success
   */
  getCampaignForEdit(id: number | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/Campaigns/GetCampaignForEdit?";
      if (id === null)
          throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
          url_ += "Id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.get<any>(url_).toPromise();
  }

 

  /**
   * @param body (optional) 
   * @return Success
   */
  createOrEdit(body: CreateOrEditCampaignDto | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/Campaigns/CreateOrEdit";
      url_ = url_.replace(/[?&]$/, "");
      return this.http.post<any>(url_, body).toPromise();
  }

 

  /**
   * @param id (optional) 
   * @return Success
   */
  delete(id: number | undefined):any {
      let url_ = environment.apiURL + "/api/services/app/Campaigns/Delete?";
      if (id === null)
          throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
          url_ += "Id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();
  }



  getAllCampaignObjectiveForTableDropdown(): any{
    let url_ = environment.apiURL + "/api/services/app/Campaigns/GetAllCampaignObjetiveForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllLeadSourceForTableDropdown(): any{
    let url_ = environment.apiURL + "/api/services/app/Campaigns/GetAllLeadSourceForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  
}

export class CreateOrEditCampaignDto {
  campaignName!: string;
  startDate!: Date;
  endDate!: Date;
  budget!: number;
  specialCode!: string;
  expectedOutcome!: number;
  campaignObjetiveId!: number;
  leadSourceId!: number;
  id!: number | undefined;
}