import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StagesHistoryService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, contactFirstnameFilter: string | null | undefined, leadStageStageNameFilter: string | null | undefined, leadStageStageName2Filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LeadStageHistories/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (contactFirstnameFilter !== undefined && contactFirstnameFilter !== null)
        url_ += "ContactFirstnameFilter=" + encodeURIComponent("" + contactFirstnameFilter) + "&";
    if (leadStageStageNameFilter !== undefined && leadStageStageNameFilter !== null)
        url_ += "LeadStageStageNameFilter=" + encodeURIComponent("" + leadStageStageNameFilter) + "&";
    if (leadStageStageName2Filter !== undefined && leadStageStageName2Filter !== null)
        url_ += "LeadStageStageName2Filter=" + encodeURIComponent("" + leadStageStageName2Filter) + "&";
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

  createOrEdit(body: CreateOrEditLeadStageHistoryDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LeadStageHistories/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");


    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

 

  delete(id: number | undefined): any{
    let url_ = environment.apiURL + "/api/services/app/LeadStageHistories/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  getAllContactForTableDropdown(){
    let url_ = environment.apiURL + "/api/services/app/LeadStageHistories/GetAllContactForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllLeadStageForTableDropdown(){
    let url_ = environment.apiURL + "/api/services/app/LeadStageHistories/GetAllLeadStageForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
  //dropdown
 
}

export class CreateOrEditLeadStageHistoryDto {
  contactId: number | undefined;
  previousLeadStageId: number | undefined;
  newLeadStageId: number | undefined;
  id: number | undefined;
}