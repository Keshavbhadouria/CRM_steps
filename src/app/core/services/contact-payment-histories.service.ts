import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';
import { RefundPaymentDto } from '../models/Admin/Subscription';

@Injectable({
  providedIn: 'root'
})
export class ContactPaymentHistoriesService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, maxPaymentAmountFilter: number | null | undefined, minPaymentAmountFilter: number | null | undefined, maxPaymentDateFilter: Date | null | undefined, minPaymentDateFilter: Date | null | undefined, commentFilter: string | null | undefined, gatewayNameFilter: string | null | undefined, gatewayResponseFilter: string | null | undefined, refundedFilter: number | null | undefined, contactId: number | null | undefined, maxRefundDateFilter: Date | null | undefined, minRefundDateFilter: Date | null | undefined, voidFilter: number | null | undefined, maxVoidedDateFilter: Date | null | undefined, minVoidedDateFilter: Date | null | undefined, contactFirstnameFilter: string | null | undefined, userNameFilter: string | null | undefined, userName2Filter: string | null | undefined, contactPaymentHistoryGatewayNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactPaymentHistories/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxPaymentAmountFilter !== undefined && maxPaymentAmountFilter !== null)
        url_ += "MaxPaymentAmountFilter=" + encodeURIComponent("" + maxPaymentAmountFilter) + "&";
    if (minPaymentAmountFilter !== undefined && minPaymentAmountFilter !== null)
        url_ += "MinPaymentAmountFilter=" + encodeURIComponent("" + minPaymentAmountFilter) + "&";
    if (maxPaymentDateFilter !== undefined && maxPaymentDateFilter !== null)
        url_ += "MaxPaymentDateFilter=" + encodeURIComponent(maxPaymentDateFilter ? "" + maxPaymentDateFilter : "") + "&";
    if (minPaymentDateFilter !== undefined && minPaymentDateFilter !== null)
        url_ += "MinPaymentDateFilter=" + encodeURIComponent(minPaymentDateFilter ? "" + minPaymentDateFilter : "") + "&";
    if (commentFilter !== undefined && commentFilter !== null)
        url_ += "CommentFilter=" + encodeURIComponent("" + commentFilter) + "&";
    if (gatewayNameFilter !== undefined && gatewayNameFilter !== null)
        url_ += "GatewayNameFilter=" + encodeURIComponent("" + gatewayNameFilter) + "&";
    if (gatewayResponseFilter !== undefined && gatewayResponseFilter !== null)
        url_ += "GatewayResponseFilter=" + encodeURIComponent("" + gatewayResponseFilter) + "&";
    if (refundedFilter !== undefined && refundedFilter !== null)
        url_ += "RefundedFilter=" + encodeURIComponent("" + refundedFilter) + "&";
    if (contactId !== undefined && contactId !== null)
        url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
    if (maxRefundDateFilter !== undefined && maxRefundDateFilter !== null)
        url_ += "MaxRefundDateFilter=" + encodeURIComponent(maxRefundDateFilter ? "" + maxRefundDateFilter : "") + "&";
    if (minRefundDateFilter !== undefined && minRefundDateFilter !== null)
        url_ += "MinRefundDateFilter=" + encodeURIComponent(minRefundDateFilter ? "" + minRefundDateFilter : "") + "&";
    if (voidFilter !== undefined && voidFilter !== null)
        url_ += "VoidFilter=" + encodeURIComponent("" + voidFilter) + "&";
    if (maxVoidedDateFilter !== undefined && maxVoidedDateFilter !== null)
        url_ += "MaxVoidedDateFilter=" + encodeURIComponent(maxVoidedDateFilter ? "" + maxVoidedDateFilter : "") + "&";
    if (minVoidedDateFilter !== undefined && minVoidedDateFilter !== null)
        url_ += "MinVoidedDateFilter=" + encodeURIComponent(minVoidedDateFilter ? "" + minVoidedDateFilter : "") + "&";
    if (contactFirstnameFilter !== undefined && contactFirstnameFilter !== null)
        url_ += "ContactFirstnameFilter=" + encodeURIComponent("" + contactFirstnameFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
        url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (userName2Filter !== undefined && userName2Filter !== null)
        url_ += "UserName2Filter=" + encodeURIComponent("" + userName2Filter) + "&";
    if (contactPaymentHistoryGatewayNameFilter !== undefined && contactPaymentHistoryGatewayNameFilter !== null)
        url_ += "ContactPaymentHistoryGatewayNameFilter=" + encodeURIComponent("" + contactPaymentHistoryGatewayNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditContactPaymentHistoryDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPaymentHistories/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getContactPaymentHistoryForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPaymentHistories/GetContactPaymentHistoryForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPaymentHistories/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  refundPayment(body: RefundPaymentDto | undefined): Observable<number> {
    let url_ = environment.apiURL + "/api/services/app/ContactPaymentHistories/RefundPayment";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body);
  }

  //dropdowns
  getAllContactForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPaymentHistories/GetAllContactForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPaymentHistories/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllContactPaymentHistoryForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPaymentHistories/GetAllContactPaymentHistoryForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditContactPaymentHistoryDto {
  paymentAmount!: number;
  paymentDate!: Date | undefined;
  comment!: string | undefined;
  gatewayName!: string | undefined;
  gatewayResponse!: string | undefined;
  refunded!: boolean;
  refundDate!: Date | undefined;
  void!: boolean;
  voidedDate!: Date | undefined;
  contactId!: number | undefined;
  voidBy!: number | undefined;
  refundedBy!: number | undefined;
  contactPaymentHistoryId!: number | undefined;
  crmPaymentMethodId!: number | undefined;
  paymentReceiptURL!: string | undefined;
  referenceNo!: string | undefined;
  contactInvoiceHeaderId!: string | undefined;
  paymentPlanHeaderId!: string | undefined;
  paymentPlanDetailId!: string | undefined;
  agentId!: number | undefined;
  isInvoicePayment!: boolean;
  isCompletePayment!: boolean;
  id!: number | undefined;
}
