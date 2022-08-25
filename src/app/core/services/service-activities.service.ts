import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrEditServiceActivityDto } from '../models/Lawfirm/ServiceActivities';

@Injectable({
  providedIn: 'root'
})
export class ServiceActivitiesService {


  lawfirmService: any;
  lawfirmServiceId: number;
  serviceName: string;


  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get Epic Status

  getAll(filter: string | null | undefined, activityNameFilter: string | null | undefined, maxSortIndexFilter: number | null | undefined, minSortIndexFilter: number | null | undefined, activeFilter: number | null | undefined, descriptionFilter: string | null | undefined, lawfirmServicesId: number | null | undefined, lawfirmServiceServicesNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ServiceActivities/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (activityNameFilter !== undefined && activityNameFilter !== null)
        url_ += "ActivityNameFilter=" + encodeURIComponent("" + activityNameFilter) + "&";
    if (maxSortIndexFilter !== undefined && maxSortIndexFilter !== null)
        url_ += "MaxSortIndexFilter=" + encodeURIComponent("" + maxSortIndexFilter) + "&";
    if (minSortIndexFilter !== undefined && minSortIndexFilter !== null)
        url_ += "MinSortIndexFilter=" + encodeURIComponent("" + minSortIndexFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
        url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
        url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (lawfirmServicesId !== undefined && lawfirmServicesId !== null)
        url_ += "LawfirmServicesId=" + encodeURIComponent("" + lawfirmServicesId) + "&";
    if (lawfirmServiceServicesNameFilter !== undefined && lawfirmServiceServicesNameFilter !== null)
        url_ += "LawfirmServiceServicesNameFilter=" + encodeURIComponent("" + lawfirmServiceServicesNameFilter) + "&";
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

  getAllLawfirmServiceForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/ServiceActivities/GetAllLawfirmServiceForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  //#endregion

  //#region CUD

  createOrEdit(body: CreateOrEditServiceActivityDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ServiceActivities/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ServiceActivities/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion

  getAllSteps(activityId: number ,serviceId: number) {
    let url_ = environment.apiURL + "/api/services/app/ServiceActivities/GetAllSteps?";
    if (activityId !== undefined && activityId !== null)
        url_ += "ActivityId=" + encodeURIComponent("" + activityId) + "&";
    if (serviceId !== undefined && serviceId !== null)
        url_ += "ServiceId=" + encodeURIComponent("" + serviceId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllDocWithoutFilter(stepId: number ,activityId: number ,serviceId: number){
    let url_ = environment.apiURL + "/api/services/app/StepDocumentses/GetAllDocWithoutFilter?";
    if (stepId !== undefined && stepId !== null)
        url_ += "StepId=" + encodeURIComponent("" + stepId) + "&";
    if (activityId !== undefined && activityId !== null)
        url_ += "ActivityId=" + encodeURIComponent("" + activityId) + "&";
    if (serviceId !== undefined && serviceId !== null)
        url_ += "ServiceId=" + encodeURIComponent("" + serviceId) + "&";
   
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}
