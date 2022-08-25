import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {  CreateOrEditCustomerContractSignatureDto } from '../models/Retainer/ContractTemplateDetail';

@Injectable({
  providedIn: 'root'
})
export class CustomerContractSignatureService {



  constructor(private http: HttpClient, private _router: Router) { }

  getAll(filter: string | null | undefined, maxAgreementDateFilter: moment.Moment | null | undefined, minAgreementDateFilter: moment.Moment | null | undefined, signatureUrlFilter: string | null | undefined, customerContratTemplateContractNameFilter: string | null | undefined, userNameFilter: string | null | undefined, customerContratTemplateId: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CustomerContractSignatures/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxAgreementDateFilter !== undefined && maxAgreementDateFilter !== null)
        url_ += "MaxAgreementDateFilter=" + encodeURIComponent(maxAgreementDateFilter ? "" + maxAgreementDateFilter.toJSON() : "") + "&";
    if (minAgreementDateFilter !== undefined && minAgreementDateFilter !== null)
        url_ += "MinAgreementDateFilter=" + encodeURIComponent(minAgreementDateFilter ? "" + minAgreementDateFilter.toJSON() : "") + "&";
    if (signatureUrlFilter !== undefined && signatureUrlFilter !== null)
        url_ += "SignatureUrlFilter=" + encodeURIComponent("" + signatureUrlFilter) + "&";
    if (customerContratTemplateContractNameFilter !== undefined && customerContratTemplateContractNameFilter !== null)
        url_ += "CustomerContratTemplateContractNameFilter=" + encodeURIComponent("" + customerContratTemplateContractNameFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
        url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditCustomerContractSignatureDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/CustomerContractSignatures/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CustomerContractSignatures/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion



}
