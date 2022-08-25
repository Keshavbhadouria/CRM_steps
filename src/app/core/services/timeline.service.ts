import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, completedFilter: number | null | undefined, maxDueDateFilter: moment.Moment | null | undefined, minDueDateFilter: moment.Moment | null | undefined, businessActionScriptTitleFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, activityTaskStageStageNameFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined):any {
    let url_ = environment.apiURL + "/api/services/app/ContactActionsHistories/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (completedFilter !== undefined && completedFilter !== null)
        url_ += "CompletedFilter=" + encodeURIComponent("" + completedFilter) + "&";
    if (maxDueDateFilter !== undefined && maxDueDateFilter !== null)
        url_ += "MaxDueDateFilter=" + encodeURIComponent(maxDueDateFilter ? "" + maxDueDateFilter.toJSON() : "") + "&";
    if (minDueDateFilter !== undefined && minDueDateFilter !== null)
        url_ += "MinDueDateFilter=" + encodeURIComponent(minDueDateFilter ? "" + minDueDateFilter.toJSON() : "") + "&";
    if (businessActionScriptTitleFilter !== undefined && businessActionScriptTitleFilter !== null)
        url_ += "BusinessActionScriptTitleFilter=" + encodeURIComponent("" + businessActionScriptTitleFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
        url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (activityTaskStageStageNameFilter !== undefined && activityTaskStageStageNameFilter !== null)
        url_ += "ActivityTaskStageStageNameFilter=" + encodeURIComponent("" + activityTaskStageStageNameFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
        url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditContactActionsHistoryDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactActionsHistories/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

 

  delete(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactActionsHistories/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactActionsHistories/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllActivityTaskStageForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactActionsHistories/GetAllActivityTaskStageForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllContactForTableDropDown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactActionsHistories/GetAllContactForTableDropDown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllBusinessActionScriptTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactActionsHistories/GetAllBusinessActionScriptTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }


}

export class CreateOrEditContactActionsHistoryDto {
  completed: boolean;
  dueDate:Date;
  businessActionScriptId: string | undefined;
  contactId: number | undefined;
  activityTaskStageId: number | undefined;
  completedByUserId: number | undefined;
  id: string | undefined;
}