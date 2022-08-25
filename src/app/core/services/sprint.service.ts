import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditPMSprintDto, CreateOrEditPMSprintTypeDto } from '../models/Project/Sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  constructor(private http: HttpClient, private _router: Router) { }

 //#region Get Epic Status

 getAll(filter: string | null | undefined, sprintFilter: string | null | undefined, descriptionFilter: string | null | undefined, maxStartDateFilter: moment.Moment | null | undefined, minStartDateFilter: moment.Moment | null | undefined, maxEndDateFilter: moment.Moment | null | undefined, minEndDateFilter: moment.Moment | null | undefined, maxReleaseDateFilter: moment.Moment | null | undefined, minReleaseDateFilter: moment.Moment | null | undefined, maxStoryPointsFilter: number | null | undefined, minStoryPointsFilter: number | null | undefined, pMProjectProjectNameFilter: string | null | undefined, pMSprintStatusStatusFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined, projectId: number | undefined) {
  let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAll?";
  if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
  if (sprintFilter !== undefined && sprintFilter !== null)
      url_ += "SprintFilter=" + encodeURIComponent("" + sprintFilter) + "&";
  if (descriptionFilter !== undefined && descriptionFilter !== null)
      url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
  if (maxStartDateFilter !== undefined && maxStartDateFilter !== null)
      url_ += "MaxStartDateFilter=" + encodeURIComponent(maxStartDateFilter ? "" + maxStartDateFilter.toJSON() : "") + "&";
  if (minStartDateFilter !== undefined && minStartDateFilter !== null)
      url_ += "MinStartDateFilter=" + encodeURIComponent(minStartDateFilter ? "" + minStartDateFilter.toJSON() : "") + "&";
  if (maxEndDateFilter !== undefined && maxEndDateFilter !== null)
      url_ += "MaxEndDateFilter=" + encodeURIComponent(maxEndDateFilter ? "" + maxEndDateFilter.toJSON() : "") + "&";
  if (minEndDateFilter !== undefined && minEndDateFilter !== null)
      url_ += "MinEndDateFilter=" + encodeURIComponent(minEndDateFilter ? "" + minEndDateFilter.toJSON() : "") + "&";
  if (maxReleaseDateFilter !== undefined && maxReleaseDateFilter !== null)
      url_ += "MaxReleaseDateFilter=" + encodeURIComponent(maxReleaseDateFilter ? "" + maxReleaseDateFilter.toJSON() : "") + "&";
  if (minReleaseDateFilter !== undefined && minReleaseDateFilter !== null)
      url_ += "MinReleaseDateFilter=" + encodeURIComponent(minReleaseDateFilter ? "" + minReleaseDateFilter.toJSON() : "") + "&";
  if (maxStoryPointsFilter !== undefined && maxStoryPointsFilter !== null)
      url_ += "MaxStoryPointsFilter=" + encodeURIComponent("" + maxStoryPointsFilter) + "&";
  if (minStoryPointsFilter !== undefined && minStoryPointsFilter !== null)
      url_ += "MinStoryPointsFilter=" + encodeURIComponent("" + minStoryPointsFilter) + "&";
  if (pMProjectProjectNameFilter !== undefined && pMProjectProjectNameFilter !== null)
      url_ += "PMProjectProjectNameFilter=" + encodeURIComponent("" + pMProjectProjectNameFilter) + "&";
  if (pMSprintStatusStatusFilter !== undefined && pMSprintStatusStatusFilter !== null)
      url_ += "PMSprintStatusStatusFilter=" + encodeURIComponent("" + pMSprintStatusStatusFilter) + "&";
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
if (projectId === null)
    url_ += "projectId=0&";
  else if (projectId !== undefined)
      url_ += "projectId=" + encodeURIComponent("" + projectId) + "&";
  url_ = url_.replace(/[?&]$/, "");

  return this.http.get<any>(url_).toPromise();
 }

 getAllPMProjectForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
  let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAllPMProjectForLookupTable?";
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

 getOpenSprints(sprintId):any{
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetOpenSprints?id="+sprintId;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
}

  getAllPMSprintStatusForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAllPMSprintStatusForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  
  getAllPMSprintForTableDropDownGuid(projectId):any{
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAllPMSprintForTableDropDownGuid?projectId="+projectId;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
}

  getAllPMSprintForTableDropDown(projectId):any{
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAllPMSprintForTableDropDown?projectId="+projectId;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
}


//#endregion
getSprintForView(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetPMSprintForView?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
}
 //#region CUD Epic Status

 createOrEdit(body: CreateOrEditPMSprintDto | undefined) {
  let url_ = environment.apiURL + "/api/services/app/PMSprints/CreateOrEdit";
  url_ = url_.replace(/[?&]$/, "");

  const content_ = JSON.stringify(body);
  return this.http.post<any>(url_, body).toPromise();
}

delete(id: number | undefined): any {
  let url_ = environment.apiURL + "/api/services/app/PMSprints/Delete?";
  if (id === null)
    throw new Error("The parameter 'id' cannot be null.");
  else if (id !== undefined)
    url_ += "Id=" + encodeURIComponent("" + id) + "&";
  url_ = url_.replace(/[?&]$/, "");

  return this.http.delete(url_).toPromise();

}

getMemberEstimationAndStories(id){
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetMemberEstimationAndStories?";
  if (id === null)
    throw new Error("The parameter 'id' cannot be null.");
  else if (id !== undefined)
    url_ += "sprintId=" + encodeURIComponent("" + id) + "&";
  url_ = url_.replace(/[?&]$/, "");
  return this.http.get<any>(url_).toPromise();

}
createOrEditEstimate(body: CreateOrEditUserStoryEstimationDto | undefined):any {
    let url_ = environment.apiURL + "/api/services/app/UserStoryEstimations/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    return this.http.post<any>(url_, body).toPromise();
}

//#endregion
}
export class CreateOrEditUserStoryEstimationDto {
    userId: number | undefined;
    pmStoryId: number | undefined;
    pmStoryEstimationId: number | undefined;
    id: string | undefined;
    isSelected: boolean;
}
