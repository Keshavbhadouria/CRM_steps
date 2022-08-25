import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditServicesActivityStepDto } from '../models/Lawfirm/ServiceActivitySteps';

@Injectable({
  providedIn: 'root'
})
export class ServiceActivityStepsService {

  serviceActivityId: number;
  serviceActivityName: string;
  serviceId: number;
  serviceName: string;

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get Epic Status

  getAll(filter: string | null | undefined, stepFilter: string | null | undefined, maxSortIndexFilter: number | null | undefined, minSortIndexFilter: number | null | undefined, activeFilter: number | null | undefined, maxDoOnDayFilter: number | null | undefined, minDoOnDayFilter: number | null | undefined, a_OverDueFilter: number | null | undefined, a_CompletedFilter: number | null | undefined, a_UpdatedFilter: number | null | undefined, l_OverdueFilter: number | null | undefined, l_CompletedFilter: number | null | undefined, l_UpdateFilter: number | null | undefined, c_OverdueFilter: number | null | undefined, c_CompletedFilter: number | null | undefined, c_UpdateFilter: number | null | undefined, descriptionFilter: string | null | undefined, serviceActivityActivityNameFilter: string | null | undefined, lawfirmServiceServicesNameFilter: string | null | undefined, contactTaskRoleRoleNameFilter: string | null | undefined, lawfirmActivityId: number | null | undefined, lawfirmServicesId: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ServicesActivitySteps/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (stepFilter !== undefined && stepFilter !== null)
        url_ += "StepFilter=" + encodeURIComponent("" + stepFilter) + "&";
    if (maxSortIndexFilter !== undefined && maxSortIndexFilter !== null)
        url_ += "MaxSortIndexFilter=" + encodeURIComponent("" + maxSortIndexFilter) + "&";
    if (minSortIndexFilter !== undefined && minSortIndexFilter !== null)
        url_ += "MinSortIndexFilter=" + encodeURIComponent("" + minSortIndexFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
        url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (maxDoOnDayFilter !== undefined && maxDoOnDayFilter !== null)
        url_ += "MaxDoOnDayFilter=" + encodeURIComponent("" + maxDoOnDayFilter) + "&";
    if (minDoOnDayFilter !== undefined && minDoOnDayFilter !== null)
        url_ += "MinDoOnDayFilter=" + encodeURIComponent("" + minDoOnDayFilter) + "&";
    if (a_OverDueFilter !== undefined && a_OverDueFilter !== null)
        url_ += "A_OverDueFilter=" + encodeURIComponent("" + a_OverDueFilter) + "&";
    if (a_CompletedFilter !== undefined && a_CompletedFilter !== null)
        url_ += "A_CompletedFilter=" + encodeURIComponent("" + a_CompletedFilter) + "&";
    if (a_UpdatedFilter !== undefined && a_UpdatedFilter !== null)
        url_ += "A_UpdatedFilter=" + encodeURIComponent("" + a_UpdatedFilter) + "&";
    if (l_OverdueFilter !== undefined && l_OverdueFilter !== null)
        url_ += "L_OverdueFilter=" + encodeURIComponent("" + l_OverdueFilter) + "&";
    if (l_CompletedFilter !== undefined && l_CompletedFilter !== null)
        url_ += "L_CompletedFilter=" + encodeURIComponent("" + l_CompletedFilter) + "&";
    if (l_UpdateFilter !== undefined && l_UpdateFilter !== null)
        url_ += "L_UpdateFilter=" + encodeURIComponent("" + l_UpdateFilter) + "&";
    if (c_OverdueFilter !== undefined && c_OverdueFilter !== null)
        url_ += "C_OverdueFilter=" + encodeURIComponent("" + c_OverdueFilter) + "&";
    if (c_CompletedFilter !== undefined && c_CompletedFilter !== null)
        url_ += "C_CompletedFilter=" + encodeURIComponent("" + c_CompletedFilter) + "&";
    if (c_UpdateFilter !== undefined && c_UpdateFilter !== null)
        url_ += "C_UpdateFilter=" + encodeURIComponent("" + c_UpdateFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
        url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (serviceActivityActivityNameFilter !== undefined && serviceActivityActivityNameFilter !== null)
        url_ += "ServiceActivityActivityNameFilter=" + encodeURIComponent("" + serviceActivityActivityNameFilter) + "&";
    if (lawfirmServiceServicesNameFilter !== undefined && lawfirmServiceServicesNameFilter !== null)
        url_ += "LawfirmServiceServicesNameFilter=" + encodeURIComponent("" + lawfirmServiceServicesNameFilter) + "&";
    if (contactTaskRoleRoleNameFilter !== undefined && contactTaskRoleRoleNameFilter !== null)
        url_ += "ContactTaskRoleRoleNameFilter=" + encodeURIComponent("" + contactTaskRoleRoleNameFilter) + "&";
    if (lawfirmActivityId !== undefined && lawfirmActivityId !== null)
        url_ += "LawfirmActivityId=" + encodeURIComponent("" + lawfirmActivityId) + "&";
    if (lawfirmServicesId !== undefined && lawfirmServicesId !== null)
        url_ += "LawfirmServicesId=" + encodeURIComponent("" + lawfirmServicesId) + "&";
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

  getAllServiceActivityForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/ServicesActivitySteps/GetAllServiceActivityForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllLawfirmServiceForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/ServicesActivitySteps/GetAllLawfirmServiceForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllContactTaskRoleForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ServicesActivitySteps/GetAllContactTaskRoleForLookupTable?";
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

  //#region CUD

  createOrEdit(body: CreateOrEditServicesActivityStepDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ServicesActivitySteps/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ServicesActivitySteps/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion

}
