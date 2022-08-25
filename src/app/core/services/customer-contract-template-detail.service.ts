import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditCustomerContractDetailDto } from '../models/Retainer/ContractTemplateDetail';
import { CreateOrEditCustomerContratTemplateDto } from '../models/Retainer/ContractTemplateName';

@Injectable({
  providedIn: 'root'
})
export class CustomerContractTemplateDetailService {
  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, titleFilter: string | null | undefined, contentFilter: string | null | undefined, maxSortIndexFilter: number | null | undefined, minSortIndexFilter: number | null | undefined, customerContratTemplateContractNameFilter: string | null | undefined, customerContratTemplateId: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CustomerContractDetails/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
        url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (contentFilter !== undefined && contentFilter !== null)
        url_ += "ContentFilter=" + encodeURIComponent("" + contentFilter) + "&";
    if (maxSortIndexFilter !== undefined && maxSortIndexFilter !== null)
        url_ += "MaxSortIndexFilter=" + encodeURIComponent("" + maxSortIndexFilter) + "&";
    if (minSortIndexFilter !== undefined && minSortIndexFilter !== null)
        url_ += "MinSortIndexFilter=" + encodeURIComponent("" + minSortIndexFilter) + "&";
    if (customerContratTemplateContractNameFilter !== undefined && customerContratTemplateContractNameFilter !== null)
        url_ += "CustomerContratTemplateContractNameFilter=" + encodeURIComponent("" + customerContratTemplateContractNameFilter) + "&";
    if (customerContratTemplateId !== undefined && customerContratTemplateId !== null)
        url_ += "CustomerContratTemplateId=" + encodeURIComponent("" + customerContratTemplateId) + "&";
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

  getAllLawfirmFeeTypeForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/LawfirmServices/GetAllLawfirmFeeTypeForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllContactForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CustomerContratTemplates/GetAllContactForLookupTable?";
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

  getAllUserForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CustomerContratTemplates/GetAllUserForLookupTable?";
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

  getAllContractStatusForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/CustomerContratTemplates/GetAllContractStatusForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();

  }


  //#endregion

  //#region CUD

  createOrEdit(body: CreateOrEditCustomerContractDetailDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CustomerContractDetails/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CustomerContractDetails/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion



}
