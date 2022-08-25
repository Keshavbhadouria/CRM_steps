import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditCollaboratorSkillDto } from '../models/Project/CreateOrEditCollaboratorSkills';
import { CreateOrEditPMRoleDto } from '../models/Project/CreateOrEditPMRoles';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorSkillsService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get Project




  getAll(filter: string | null | undefined, maxYearsExperienceFilter: number | null | undefined, minYearsExperienceFilter: number | null | undefined, collaboratorFullnameFilter: string | null | undefined, skillSkillNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxYearsExperienceFilter !== undefined && maxYearsExperienceFilter !== null)
        url_ += "MaxYearsExperienceFilter=" + encodeURIComponent("" + maxYearsExperienceFilter) + "&";
    if (minYearsExperienceFilter !== undefined && minYearsExperienceFilter !== null)
        url_ += "MinYearsExperienceFilter=" + encodeURIComponent("" + minYearsExperienceFilter) + "&";
    if (collaboratorFullnameFilter !== undefined && collaboratorFullnameFilter !== null)
        url_ += "CollaboratorFullnameFilter=" + encodeURIComponent("" + collaboratorFullnameFilter) + "&";
    if (skillSkillNameFilter !== undefined && skillSkillNameFilter !== null)
        url_ += "SkillSkillNameFilter=" + encodeURIComponent("" + skillSkillNameFilter) + "&";
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

  getAllCollaboratorForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/GetAllCollaboratorForLookupTable?";
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

  getAllSkillForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/GetAllSkillForLookupTable?";
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



  createOrEdit(body: CreateOrEditCollaboratorSkillDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CollaboratorSkills/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion
}
