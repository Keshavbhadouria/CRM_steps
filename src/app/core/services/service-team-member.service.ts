import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceTeamMemberService {

  constructor(private http: HttpClient, private _router: Router) { }

  getAllByServiceId(serviceId: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/GetAllByServiceId?";
    if (serviceId !== undefined && serviceId !== null)
      url_ += "ServiceId=" +  serviceId + "&";
    
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getServiceTeamMemberForView(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/GetServiceTeamMemberForView?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getServiceTeamMemberForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/GetServiceTeamMemberForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditServiceTeamMemberDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, body).toPromise();
  }
  createOrEditAll(body: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/CreateOrEditAll";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, body).toPromise();
  }
  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.delete(url_).toPromise();
  }
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/GetAllUserForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
  getAllLawfirmServiceForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/GetAllLawfirmServiceForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
  getAllRoleForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceTeamMembers/GetAllRoleForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditServiceTeamMemberDto {
  hoursLimit: number | undefined;
  userId: number;
  lawfirmServiceId: number;
  roleId: number | undefined;
  id: number | undefined;
}