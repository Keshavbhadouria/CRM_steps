import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditReteinerDto } from '../models/Retainer/Retainer';

@Injectable({
  providedIn: 'root'
})
export class RetainerService {
  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, maxExpirationDateFilter: moment.Moment | null | undefined, minExpirationDateFilter: moment.Moment | null | undefined, maxTotalAmountFilter: number | null | undefined, minTotalAmountFilter: number | null | undefined, paymentPlanFilter: number | null | undefined, maxDownpaymentFilter: number | null | undefined, minDownpaymentFilter: number | null | undefined, maxPaymentsFilter: number | null | undefined, minPaymentsFilter: number | null | undefined, maxPaymentAmountFilter: number | null | undefined, minPaymentAmountFilter: number | null | undefined, maxInitialPaymentDateFilter: moment.Moment | null | undefined, minInitialPaymentDateFilter: moment.Moment | null | undefined, signatureRequiredFilter: number | null | undefined, contactFirstnameFilter: string | null | undefined, userNameFilter: string | null | undefined, contracTemplateNameContractNameFilter: string | null | undefined, contractTemplateNameId: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Reteiners/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxExpirationDateFilter !== undefined && maxExpirationDateFilter !== null)
        url_ += "MaxExpirationDateFilter=" + encodeURIComponent(maxExpirationDateFilter ? "" + maxExpirationDateFilter.toJSON() : "") + "&";
    if (minExpirationDateFilter !== undefined && minExpirationDateFilter !== null)
        url_ += "MinExpirationDateFilter=" + encodeURIComponent(minExpirationDateFilter ? "" + minExpirationDateFilter.toJSON() : "") + "&";
    if (maxTotalAmountFilter !== undefined && maxTotalAmountFilter !== null)
        url_ += "MaxTotalAmountFilter=" + encodeURIComponent("" + maxTotalAmountFilter) + "&";
    if (minTotalAmountFilter !== undefined && minTotalAmountFilter !== null)
        url_ += "MinTotalAmountFilter=" + encodeURIComponent("" + minTotalAmountFilter) + "&";
    if (paymentPlanFilter !== undefined && paymentPlanFilter !== null)
        url_ += "PaymentPlanFilter=" + encodeURIComponent("" + paymentPlanFilter) + "&";
    if (maxDownpaymentFilter !== undefined && maxDownpaymentFilter !== null)
        url_ += "MaxDownpaymentFilter=" + encodeURIComponent("" + maxDownpaymentFilter) + "&";
    if (minDownpaymentFilter !== undefined && minDownpaymentFilter !== null)
        url_ += "MinDownpaymentFilter=" + encodeURIComponent("" + minDownpaymentFilter) + "&";
    if (maxPaymentsFilter !== undefined && maxPaymentsFilter !== null)
        url_ += "MaxPaymentsFilter=" + encodeURIComponent("" + maxPaymentsFilter) + "&";
    if (minPaymentsFilter !== undefined && minPaymentsFilter !== null)
        url_ += "MinPaymentsFilter=" + encodeURIComponent("" + minPaymentsFilter) + "&";
    if (maxPaymentAmountFilter !== undefined && maxPaymentAmountFilter !== null)
        url_ += "MaxPaymentAmountFilter=" + encodeURIComponent("" + maxPaymentAmountFilter) + "&";
    if (minPaymentAmountFilter !== undefined && minPaymentAmountFilter !== null)
        url_ += "MinPaymentAmountFilter=" + encodeURIComponent("" + minPaymentAmountFilter) + "&";
    if (maxInitialPaymentDateFilter !== undefined && maxInitialPaymentDateFilter !== null)
        url_ += "MaxInitialPaymentDateFilter=" + encodeURIComponent(maxInitialPaymentDateFilter ? "" + maxInitialPaymentDateFilter.toJSON() : "") + "&";
    if (minInitialPaymentDateFilter !== undefined && minInitialPaymentDateFilter !== null)
        url_ += "MinInitialPaymentDateFilter=" + encodeURIComponent(minInitialPaymentDateFilter ? "" + minInitialPaymentDateFilter.toJSON() : "") + "&";
    if (signatureRequiredFilter !== undefined && signatureRequiredFilter !== null)
        url_ += "SignatureRequiredFilter=" + encodeURIComponent("" + signatureRequiredFilter) + "&";
    if (contactFirstnameFilter !== undefined && contactFirstnameFilter !== null)
        url_ += "ContactFirstnameFilter=" + encodeURIComponent("" + contactFirstnameFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
        url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (contracTemplateNameContractNameFilter !== undefined && contracTemplateNameContractNameFilter !== null)
        url_ += "ContracTemplateNameContractNameFilter=" + encodeURIComponent("" + contracTemplateNameContractNameFilter) + "&";
    if (contractTemplateNameId !== undefined && contractTemplateNameId !== null)
        url_ += "ContractTemplateNameId=" + encodeURIComponent("" + contractTemplateNameId) + "&";
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

  getAllContactForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Reteiners/GetAllContactForLookupTable?";
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
    let url_ = environment.apiURL + "/api/services/app/Reteiners/GetAllUserForLookupTable?";
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

  createOrEdit(body: CreateOrEditReteinerDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Reteiners/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Reteiners/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion



}
