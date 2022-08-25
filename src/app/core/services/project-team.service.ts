import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectTeamService {

  constructor(private http: HttpClient, private _router: Router) { }

  getAllByProject(projectId: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/PMTeamMembers/GetAllByProject?";
    if (projectId !== undefined && projectId !== null)
      url_ += "projectId=" +  projectId + "&";
    
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  //#endregion

  //#region CUD Project

  createOrEditAll(body: any | undefined) {
    let url_ = environment.apiURL + "/api/services/app/PMTeamMembers/createOrEditAll";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMTeamMembers/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }

  getAllForDropdownByProjectGuid(projectId):any{
    let url_ = environment.apiURL + "/api/services/app/PMTeamMembers/GetAllForDropdownByProjectGuid?";

    if (projectId !== undefined && projectId !== null)
      url_ += "projectId=" + encodeURIComponent("" + projectId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllForDropdownByProject(projectId):any{
    let url_ = environment.apiURL + "/api/services/app/PMTeamMembers/GetAllForDropdownByProject?";

    if (projectId !== undefined && projectId !== null)
      url_ += "projectId=" + encodeURIComponent("" + projectId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}
