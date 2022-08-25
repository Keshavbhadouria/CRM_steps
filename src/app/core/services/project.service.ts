import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get Project


  getAll(filter: string | null | undefined, projectNameFilter: string | null | undefined, goalFilter: string | null | undefined, maxStartDateFilter: moment.Moment | null | undefined, minStartDateFilter: moment.Moment | null | undefined, maxTargetDateFilter: moment.Moment | null | undefined, minTargetDateFilter: moment.Moment | null | undefined, maxBaselineVelocityFilter: number | null | undefined, minBaselineVelocityFilter: number | null | undefined, maxActualVelocityFilter: number | null | undefined, minActualVelocityFilter: number | null | undefined, teamChannelFilter: string | null | undefined, logoFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, pMIndustryIndustryFilter: string | null | undefined, userNameFilter: string | null | undefined, pMTaskPriorityPriorityFilter: string | null | undefined, pMProjectStatusStatusFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (projectNameFilter !== undefined && projectNameFilter !== null)
      url_ += "ProjectNameFilter=" + encodeURIComponent("" + projectNameFilter) + "&";
    if (goalFilter !== undefined && goalFilter !== null)
      url_ += "GoalFilter=" + encodeURIComponent("" + goalFilter) + "&";
    if (maxStartDateFilter !== undefined && maxStartDateFilter !== null)
      url_ += "MaxStartDateFilter=" + encodeURIComponent(maxStartDateFilter ? "" + maxStartDateFilter.toJSON() : "") + "&";
    if (minStartDateFilter !== undefined && minStartDateFilter !== null)
      url_ += "MinStartDateFilter=" + encodeURIComponent(minStartDateFilter ? "" + minStartDateFilter.toJSON() : "") + "&";
    if (maxTargetDateFilter !== undefined && maxTargetDateFilter !== null)
      url_ += "MaxTargetDateFilter=" + encodeURIComponent(maxTargetDateFilter ? "" + maxTargetDateFilter.toJSON() : "") + "&";
    if (minTargetDateFilter !== undefined && minTargetDateFilter !== null)
      url_ += "MinTargetDateFilter=" + encodeURIComponent(minTargetDateFilter ? "" + minTargetDateFilter.toJSON() : "") + "&";
    if (maxBaselineVelocityFilter !== undefined && maxBaselineVelocityFilter !== null)
      url_ += "MaxBaselineVelocityFilter=" + encodeURIComponent("" + maxBaselineVelocityFilter) + "&";
    if (minBaselineVelocityFilter !== undefined && minBaselineVelocityFilter !== null)
      url_ += "MinBaselineVelocityFilter=" + encodeURIComponent("" + minBaselineVelocityFilter) + "&";
    if (maxActualVelocityFilter !== undefined && maxActualVelocityFilter !== null)
      url_ += "MaxActualVelocityFilter=" + encodeURIComponent("" + maxActualVelocityFilter) + "&";
    if (minActualVelocityFilter !== undefined && minActualVelocityFilter !== null)
      url_ += "MinActualVelocityFilter=" + encodeURIComponent("" + minActualVelocityFilter) + "&";
    if (teamChannelFilter !== undefined && teamChannelFilter !== null)
      url_ += "TeamChannelFilter=" + encodeURIComponent("" + teamChannelFilter) + "&";
    if (logoFilter !== undefined && logoFilter !== null)
      url_ += "LogoFilter=" + encodeURIComponent("" + logoFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
      url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (pMIndustryIndustryFilter !== undefined && pMIndustryIndustryFilter !== null)
      url_ += "PMIndustryIndustryFilter=" + encodeURIComponent("" + pMIndustryIndustryFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (pMTaskPriorityPriorityFilter !== undefined && pMTaskPriorityPriorityFilter !== null)
      url_ += "PMTaskPriorityPriorityFilter=" + encodeURIComponent("" + pMTaskPriorityPriorityFilter) + "&";
    if (pMProjectStatusStatusFilter !== undefined && pMProjectStatusStatusFilter !== null)
      url_ += "PMProjectStatusStatusFilter=" + encodeURIComponent("" + pMProjectStatusStatusFilter) + "&";
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

  getAllPMIndustryForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllPMIndustryForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getPMProjectForView(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetPMProjectForView?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
  
    let options_ : any = {
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Accept": "text/plain"
        })
    };
  
    return this.http.get<any>(url_).toPromise();
  }

  getAllPMProjectForTableGuidDropDown(id:string|undefined){
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllPMProjectForTableGuidDropDown?";

    if (id !== undefined && id !== null)
    url_ += "sprintId=" + encodeURIComponent("" + id) + "&";

    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllPMProjectForTableDropDown(id:number | undefined):any{
    let url_ = environment.apiURL + "/api/services/app/PMProjects/getAllPMProjectForTableDropDown?";

    if (id !== undefined && id !== null)
    url_ += "sprintId=" + encodeURIComponent("" + id) + "&";

    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
}

  getAllUserForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllUserForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllPMTaskPriorityForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllPMTaskPriorityForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllPMProjectStatusForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllPMProjectStatusForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }


  getAllContactForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllContactForLookupTable?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
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

  //#endregion

  //#region CUD Project

  createOrEdit(body: CreateOrEditPMProjectDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion

}
