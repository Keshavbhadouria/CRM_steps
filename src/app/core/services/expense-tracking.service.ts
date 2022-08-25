import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTrackingService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, attatchmentFilter: string | null | undefined, descriptionFilter: string | null | undefined, quickBookVendorIdFilter: string | null | undefined, maxStartDateFilter: Date | null | undefined, minStartDateFilter: Date | null | undefined, maxEndDateFilter: Date | null | undefined, minEndDateFilter: Date | null | undefined, lawfirmServiceServicesNameFilter: string | null | undefined, serviceExpenseTypeSpentTypeFilter: string | null | undefined, contactFirstnameFilter: string | null | undefined, cRMVendorFirstNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ExpenseTrackings/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (attatchmentFilter !== undefined && attatchmentFilter !== null)
      url_ += "AttatchmentFilter=" + encodeURIComponent("" + attatchmentFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
      url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (quickBookVendorIdFilter !== undefined && quickBookVendorIdFilter !== null)
      url_ += "QuickBookVendorIdFilter=" + encodeURIComponent("" + quickBookVendorIdFilter) + "&";
    if (maxStartDateFilter !== undefined && maxStartDateFilter !== null)
      url_ += "MaxStartDateFilter=" + encodeURIComponent(maxStartDateFilter ? "" + maxStartDateFilter : "") + "&";
    if (minStartDateFilter !== undefined && minStartDateFilter !== null)
      url_ += "MinStartDateFilter=" + encodeURIComponent(minStartDateFilter ? "" + minStartDateFilter : "") + "&";
    if (maxEndDateFilter !== undefined && maxEndDateFilter !== null)
      url_ += "MaxEndDateFilter=" + encodeURIComponent(maxEndDateFilter ? "" + maxEndDateFilter : "") + "&";
    if (minEndDateFilter !== undefined && minEndDateFilter !== null)
      url_ += "MinEndDateFilter=" + encodeURIComponent(minEndDateFilter ? "" + minEndDateFilter : "") + "&";
    if (lawfirmServiceServicesNameFilter !== undefined && lawfirmServiceServicesNameFilter !== null)
      url_ += "LawfirmServiceServicesNameFilter=" + encodeURIComponent("" + lawfirmServiceServicesNameFilter) + "&";
    if (serviceExpenseTypeSpentTypeFilter !== undefined && serviceExpenseTypeSpentTypeFilter !== null)
      url_ += "ServiceExpenseTypeSpentTypeFilter=" + encodeURIComponent("" + serviceExpenseTypeSpentTypeFilter) + "&";
    if (contactFirstnameFilter !== undefined && contactFirstnameFilter !== null)
      url_ += "ContactFirstnameFilter=" + encodeURIComponent("" + contactFirstnameFilter) + "&";
    if (cRMVendorFirstNameFilter !== undefined && cRMVendorFirstNameFilter !== null)
      url_ += "CRMVendorFirstNameFilter=" + encodeURIComponent("" + cRMVendorFirstNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditExpenseTrackingDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ExpenseTrackings/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getExpenseTrackingForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ExpenseTrackings/GetExpenseTrackingForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ExpenseTrackings/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdowns
  getAllContactForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ExpenseTrackings/GetAllContactForTableDropdown?";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  
  getAllCRMVendorForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ExpenseTrackings/GetAllCRMVendorForTableDropdown?";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllServiceExpenseTypeForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ExpenseTrackings/GetAllServiceExpenseTypeForTableDropdown?";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllLawfirmServiceForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ExpenseTrackings/GetAllLawfirmServiceForTableDropdown?";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditExpenseTrackingDto {
  attatchment!: string | undefined;
  description!: string;
  htmlDescription!: string | undefined;
  quickBookVendorId!: string | undefined;
  startDate!: Date | undefined;
  endDate!: Date | undefined;
  lawfirmServiceId!: number | undefined;
  serviceExpenseTypeId!: number | undefined;
  contactId!: number | undefined;
  crmVendorId!: string | undefined;
  amount!: number;
  tax!: number;
  totalAmount!: number;
  id!: string | undefined;
}