import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommissionTrackingService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, maxEarnedAmountFilter: number | null | undefined, minEarnedAmountFilter: number | null | undefined, maxPaymentDateFilter: Date | null | undefined, minPaymentDateFilter: Date | null | undefined, campaignCampaignNameFilter: string | null | undefined, invoiceInvoiceNoFilter: string | null | undefined, commissionStatusStatusFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionTrackings/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxEarnedAmountFilter !== undefined && maxEarnedAmountFilter !== null)
      url_ += "MaxEarnedAmountFilter=" + encodeURIComponent("" + maxEarnedAmountFilter) + "&";
    if (minEarnedAmountFilter !== undefined && minEarnedAmountFilter !== null)
      url_ += "MinEarnedAmountFilter=" + encodeURIComponent("" + minEarnedAmountFilter) + "&";
    if (maxPaymentDateFilter !== undefined && maxPaymentDateFilter !== null)
      url_ += "MaxPaymentDateFilter=" + encodeURIComponent(maxPaymentDateFilter ? "" + maxPaymentDateFilter : "") + "&";
    if (minPaymentDateFilter !== undefined && minPaymentDateFilter !== null)
      url_ += "MinPaymentDateFilter=" + encodeURIComponent(minPaymentDateFilter ? "" + minPaymentDateFilter : "") + "&";
    if (campaignCampaignNameFilter !== undefined && campaignCampaignNameFilter !== null)
      url_ += "CampaignCampaignNameFilter=" + encodeURIComponent("" + campaignCampaignNameFilter) + "&";
    if (invoiceInvoiceNoFilter !== undefined && invoiceInvoiceNoFilter !== null)
      url_ += "InvoiceInvoiceNoFilter=" + encodeURIComponent("" + invoiceInvoiceNoFilter) + "&";
    if (commissionStatusStatusFilter !== undefined && commissionStatusStatusFilter !== null)
      url_ += "CommissionStatusStatusFilter=" + encodeURIComponent("" + commissionStatusStatusFilter) + "&";
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

  createOrEdit(body: CreateOrEditCommissionTrackingDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionTrackings/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getCommissionTrackingForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionTrackings/GetCommissionTrackingForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionTrackings/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllCampaignForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionTrackings/GetAllCampaignForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllInvoiceForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionTrackings/GetAllInvoiceForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllCommissionStatusForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CommissionTrackings/GetAllCommissionStatusForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditCommissionTrackingDto {
  earnedAmount!: number;
  paymentDate!: Date;
  campaignId!: number;
  invoiceId!: number;
  commissionStatusId!: number | undefined;
  id!: number | undefined;
}
