import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactTaskService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get


  GetAllByFilters(filter: string | null | undefined,contactId: number | null | undefined, titleFilter: string | null | undefined, descriptionFilter: string | null | undefined, maxDueDateFilter: moment.Moment | null | undefined, minDueDateFilter: moment.Moment | null | undefined, userNameFilter: string | null | undefined, roleNameFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, activityTaskStageId: number | null | undefined, activityPriorityId: number | null | undefined, activityTaskStageStageNameFilter: string | null | undefined, activityPriorityPriorityNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactTasks/GetAllByFilters?";

    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (contactId !== undefined && contactId !== null)
      url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
        url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
        url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (maxDueDateFilter !== undefined && maxDueDateFilter !== null)
        url_ += "MaxDueDateFilter=" + encodeURIComponent(maxDueDateFilter ? "" + maxDueDateFilter.toJSON() : "") + "&";
    if (minDueDateFilter !== undefined && minDueDateFilter !== null)
        url_ += "MinDueDateFilter=" + encodeURIComponent(minDueDateFilter ? "" + minDueDateFilter.toJSON() : "") + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
        url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (roleNameFilter !== undefined && roleNameFilter !== null)
        url_ += "RoleNameFilter=" + encodeURIComponent("" + roleNameFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
        url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (activityTaskStageId !== undefined && activityTaskStageId !== null)
        url_ += "ActivityTaskStageId=" + encodeURIComponent("" + activityTaskStageId) + "&";
    if (activityPriorityId !== undefined && activityPriorityId !== null)
        url_ += "ActivityPriorityId=" + encodeURIComponent("" + activityPriorityId) + "&";
    if (activityTaskStageStageNameFilter !== undefined && activityTaskStageStageNameFilter !== null)
        url_ += "ActivityTaskStageStageNameFilter=" + encodeURIComponent("" + activityTaskStageStageNameFilter) + "&";
    if (activityPriorityPriorityNameFilter !== undefined && activityPriorityPriorityNameFilter !== null)
        url_ += "ActivityPriorityPriorityNameFilter=" + encodeURIComponent("" + activityPriorityPriorityNameFilter) + "&";
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
}
