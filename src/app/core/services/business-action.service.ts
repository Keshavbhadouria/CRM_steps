import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
  providedIn: 'root'
})
export class BusinessActionService {

  constructor(private http: HttpClient, private _router: Router) { }

  getAll(filter: string | null | undefined, maxDayNoFilter: number | null | undefined, minDayNoFilter: number | null | undefined, contentScriptFilter: string | null | undefined, activeFilter: number | null | undefined, titleFilter: string | null | undefined, maxWeekNoFilter: number | null | undefined, minWeekNoFilter: number | null | undefined, actionTypeActionNameFilter: string | null | undefined, leadTemperatureTemperatureFilter: string | null | undefined, targetTitleTitleFilter: string | null | undefined, lawfirmServiceServicesNameFilter: string | null | undefined, serviceActivityActivityNameFilter: string | null | undefined, servicesActivityStepStepFilter: string | null | undefined, businessWorkflowId: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxDayNoFilter !== undefined && maxDayNoFilter !== null)
      url_ += "MaxDayNoFilter=" + encodeURIComponent("" + maxDayNoFilter) + "&";
    if (minDayNoFilter !== undefined && minDayNoFilter !== null)
      url_ += "MinDayNoFilter=" + encodeURIComponent("" + minDayNoFilter) + "&";
    if (contentScriptFilter !== undefined && contentScriptFilter !== null)
      url_ += "ContentScriptFilter=" + encodeURIComponent("" + contentScriptFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
      url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
      url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (maxWeekNoFilter !== undefined && maxWeekNoFilter !== null)
      url_ += "MaxWeekNoFilter=" + encodeURIComponent("" + maxWeekNoFilter) + "&";
    if (minWeekNoFilter !== undefined && minWeekNoFilter !== null)
      url_ += "MinWeekNoFilter=" + encodeURIComponent("" + minWeekNoFilter) + "&";
    if (actionTypeActionNameFilter !== undefined && actionTypeActionNameFilter !== null)
      url_ += "ActionTypeActionNameFilter=" + encodeURIComponent("" + actionTypeActionNameFilter) + "&";
    if (leadTemperatureTemperatureFilter !== undefined && leadTemperatureTemperatureFilter !== null)
      url_ += "LeadTemperatureTemperatureFilter=" + encodeURIComponent("" + leadTemperatureTemperatureFilter) + "&";
    if (targetTitleTitleFilter !== undefined && targetTitleTitleFilter !== null)
      url_ += "TargetTitleTitleFilter=" + encodeURIComponent("" + targetTitleTitleFilter) + "&";
    if (lawfirmServiceServicesNameFilter !== undefined && lawfirmServiceServicesNameFilter !== null)
      url_ += "LawfirmServiceServicesNameFilter=" + encodeURIComponent("" + lawfirmServiceServicesNameFilter) + "&";
    if (serviceActivityActivityNameFilter !== undefined && serviceActivityActivityNameFilter !== null)
      url_ += "ServiceActivityActivityNameFilter=" + encodeURIComponent("" + serviceActivityActivityNameFilter) + "&";
    if (servicesActivityStepStepFilter !== undefined && servicesActivityStepStepFilter !== null)
      url_ += "ServicesActivityStepStepFilter=" + encodeURIComponent("" + servicesActivityStepStepFilter) + "&";
    if (businessWorkflowId !== undefined && businessWorkflowId !== null)
      url_ += "BusinessWorkflowId=" + encodeURIComponent("" + businessWorkflowId) + "&";
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


  sendAutomationEmailsByBusinessActions() {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/SendBusinessActionsEmail";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, null).toPromise();
  }

  SendBusinessActionsSMS() {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/SendBusinessActionsSMS";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, null).toPromise();
  }

  CreateContactTaskByBusinessActions() {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/CreateContactTaskByBusinessActions";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, null).toPromise();
  }

  CreateOperationTaskByBusinessActions() {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/CreateOperationTaskByBusinessActions";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, null).toPromise();
  }


  /**
   * @param body (optional)
   * @return Success
   */
  createOrEdit(body: CreateOrEditBusinessActionScriptDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    return this.http.post<any>(url_, body).toPromise();
  }



  /**
   * @param id (optional)
   * @return Success
   */
  delete(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }



  /**
   * @return Success
   */
  getAllActionTypeForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/GetAllActionTypeForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  /**
   * @return Success
   */
  getAllLeadTemperatureForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/GetAllLeadTemperatureForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  /**
   * @return Success
   */
  getAllTargetTitleForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/GetAllTargetTitleForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllLawfirmServiceForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/GetAllLawfirmServiceForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllServiceActivityForTableDropdown(serviceId: number): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/GetAllServiceActivityForTableDropdown?serviceId=" + serviceId;
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getAllServicesActivityStepForTableDropdown(serviceActivityId: number): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessActionScripts/GetAllServicesActivityStepForTableDropdown?serviceActivityId=" + serviceActivityId;
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}


export class CreateOrEditBusinessActionScriptDto {
  dayNo!: number;
  contentScript!: string;
  htmlContentScript!: string | undefined;
  active!: boolean;
  title!: string;
  weekNo!: number;
  actionTypeId!: number;
  leadTemperatureId!: number | undefined;
  targetTitleId!: number | undefined;
  lawfirmServiceId!: number | undefined;
  serviceActivityId!: number | undefined;
  servicesActivityStepId!: number | undefined;
  businessWorkflowId!: string | undefined;
  id!: string | undefined;
}

