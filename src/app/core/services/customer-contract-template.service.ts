import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditCustomerContratTemplateDto } from '../models/Retainer/ContractTemplateName';

@Injectable({
  providedIn: 'root'
})
export class CustomerContractTemplateService {
  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, contractNameFilter: string | null | undefined, physicalFileUrlFilter: string | null | undefined, maxCreatedOnFilter: moment.Moment | null | undefined, minCreatedOnFilter: moment.Moment | null | undefined, contactCompanyFilter: string | null | undefined, contracTemplateNameContractNameFilter: string | null | undefined, contractStatusStatusNameFilter: string | null | undefined, userNameFilter: string | null | undefined, contractTemplateId: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CustomerContratTemplates/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (contractNameFilter !== undefined && contractNameFilter !== null)
        url_ += "ContractNameFilter=" + encodeURIComponent("" + contractNameFilter) + "&";
    if (physicalFileUrlFilter !== undefined && physicalFileUrlFilter !== null)
        url_ += "PhysicalFileUrlFilter=" + encodeURIComponent("" + physicalFileUrlFilter) + "&";
    if (maxCreatedOnFilter !== undefined && maxCreatedOnFilter !== null)
        url_ += "MaxCreatedOnFilter=" + encodeURIComponent(maxCreatedOnFilter ? "" + maxCreatedOnFilter.toJSON() : "") + "&";
    if (minCreatedOnFilter !== undefined && minCreatedOnFilter !== null)
        url_ += "MinCreatedOnFilter=" + encodeURIComponent(minCreatedOnFilter ? "" + minCreatedOnFilter.toJSON() : "") + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
        url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (contracTemplateNameContractNameFilter !== undefined && contracTemplateNameContractNameFilter !== null)
        url_ += "ContracTemplateNameContractNameFilter=" + encodeURIComponent("" + contracTemplateNameContractNameFilter) + "&";
    if (contractStatusStatusNameFilter !== undefined && contractStatusStatusNameFilter !== null)
        url_ += "ContractStatusStatusNameFilter=" + encodeURIComponent("" + contractStatusStatusNameFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
        url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (contractTemplateId !== undefined && contractTemplateId !== null)
        url_ += "contractTemplateId=" + encodeURIComponent("" + contractTemplateId) + "&";
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

  createOrEdit(body: CreateOrEditCustomerContratTemplateDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CustomerContratTemplates/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CustomerContratTemplates/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion



}
