import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CollaboratorAbsense, CollaboratorNotice, CollaboratorSkillsDto, CreateOrEditCollaboratorDto } from '../models/Project/CreateOrEditCollaborator';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get Project




  getAll(filter: string | null | undefined, timezoneFilter: string | null | undefined, maxWeeklyHoursAvailabiltyFilter: number | null | undefined, minWeeklyHoursAvailabiltyFilter: number | null | undefined, workingTimeFromToEstTimeFilter: string | null | undefined, activeFilter: number | null | undefined, maxVelocityFilter: number | null | undefined, minVelocityFilter: number | null | undefined, maxPerformanceFilter: number | null | undefined, minPerformanceFilter: number | null | undefined, fullnameFilter: string | null | undefined, userNameFilter: string | null | undefined, jobDescriptionTitleFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorNew/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (timezoneFilter !== undefined && timezoneFilter !== null)
        url_ += "TimezoneFilter=" + encodeURIComponent("" + timezoneFilter) + "&";
    if (maxWeeklyHoursAvailabiltyFilter !== undefined && maxWeeklyHoursAvailabiltyFilter !== null)
        url_ += "MaxWeeklyHoursAvailabiltyFilter=" + encodeURIComponent("" + maxWeeklyHoursAvailabiltyFilter) + "&";
    if (minWeeklyHoursAvailabiltyFilter !== undefined && minWeeklyHoursAvailabiltyFilter !== null)
        url_ += "MinWeeklyHoursAvailabiltyFilter=" + encodeURIComponent("" + minWeeklyHoursAvailabiltyFilter) + "&";
    if (workingTimeFromToEstTimeFilter !== undefined && workingTimeFromToEstTimeFilter !== null)
        url_ += "WorkingTimeFromToEstTimeFilter=" + encodeURIComponent("" + workingTimeFromToEstTimeFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
        url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (maxVelocityFilter !== undefined && maxVelocityFilter !== null)
        url_ += "MaxVelocityFilter=" + encodeURIComponent("" + maxVelocityFilter) + "&";
    if (minVelocityFilter !== undefined && minVelocityFilter !== null)
        url_ += "MinVelocityFilter=" + encodeURIComponent("" + minVelocityFilter) + "&";
    if (maxPerformanceFilter !== undefined && maxPerformanceFilter !== null)
        url_ += "MaxPerformanceFilter=" + encodeURIComponent("" + maxPerformanceFilter) + "&";
    if (minPerformanceFilter !== undefined && minPerformanceFilter !== null)
        url_ += "MinPerformanceFilter=" + encodeURIComponent("" + minPerformanceFilter) + "&";
    if (fullnameFilter !== undefined && fullnameFilter !== null)
        url_ += "FullnameFilter=" + encodeURIComponent("" + fullnameFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
        url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (jobDescriptionTitleFilter !== undefined && jobDescriptionTitleFilter !== null)
        url_ += "JobDescriptionTitleFilter=" + encodeURIComponent("" + jobDescriptionTitleFilter) + "&";
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

  GetCollaboratorNewForEdit(id: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorNew/GetCollaboratorForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getRoles() {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorNew/GetRoles";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllJobDescriptionForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorNew/GetAllJobDescriptionForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllCountryForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/Account/GetAllCountryForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  //#endregion

  //#region CUD Project



  createOrEdit(body: CreateOrEditCollaboratorDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorNew/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }



  delete(id: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorNew/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion


  //#region Skills

  getAllSkills(collaboratorNewId: string | null | undefined,sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/GetAll?";
    if (collaboratorNewId !== undefined && collaboratorNewId !== null)
      url_ += "CollaboratorNewId=" + encodeURIComponent("" + collaboratorNewId) + "&";
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

  GetAllSkillForLookupTable() {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/GetAllSkillForLookupTable";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

 createOrEditSkills(body: CollaboratorSkillsDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  deleteSkill(id: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion

  //#region Absense

  getAllAbsense(collaboratorNewId: string | null | undefined,sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorAbsenses/GetAll?";
    if (collaboratorNewId !== undefined && collaboratorNewId !== null)
      url_ += "CollaboratorNewId=" + encodeURIComponent("" + collaboratorNewId) + "&";
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



 createOrEditAbsense(body: CollaboratorAbsense | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorAbsenses/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  deleteAbsense(id: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorAbsenses/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion


    //#region Notice

    getAllNotice(collaboratorNewId: string | null | undefined,sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
      let url_ = environment.apiURL + "/api/services/app/CollaboratorNotices/GetAll?";
      if (collaboratorNewId !== undefined && collaboratorNewId !== null)
        url_ += "CollaboratorNewId=" + encodeURIComponent("" + collaboratorNewId) + "&";
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



   createOrEditNotice(body: CollaboratorNotice | undefined) {
      let url_ = environment.apiURL + "/api/services/app/CollaboratorNotices/CreateOrEdit";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);
      return this.http.post<any>(url_, body).toPromise();
    }

    deleteNotice(id: any | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/CollaboratorNotices/Delete?";
      if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();

    }


    //#endregion



}





