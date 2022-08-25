import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditLawfirmFeeTypeDto } from '../models/Lawfirm/LawfirmFeeType';
import { ContactAssignLawyerParalegalDTO } from '../models/StaffAssignment/StaffAssignment';

@Injectable({
  providedIn: 'root'
})
export class StaffAssignmentService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, contactFirstnameFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactAssignParalegals/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (contactFirstnameFilter !== undefined && contactFirstnameFilter !== null)
        url_ += "ContactFirstnameFilter=" + encodeURIComponent("" + contactFirstnameFilter) + "&";
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

  getAllContactForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/ContactAssignParalegals/GetAllContactForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllUserForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/ContactAssignParalegals/GetAllUserForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllLawyersForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/ContactAssignParalegals/GetAllLawyersForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllParalegalForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/ContactAssignParalegals/GetAllParalegalForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getContactAssignParalegalForCustomEdit(id: string | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactAssignParalegals/GetContactAssignParalegalForCustomEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  //#endregion

  //#region CUD

  createOrEdit(body: ContactAssignLawyerParalegalDTO | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactAssignParalegals/CreateOrEditLawyerParalegalAssignment";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactAssignParalegals/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion

}
