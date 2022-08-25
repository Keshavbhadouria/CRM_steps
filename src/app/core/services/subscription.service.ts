import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EditionSelectDto } from '../models/Admin/select-edition';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {


  constructor(private http: HttpClient, private _router: Router) { }


  disableRecurringPayments() {
    let url_ = environment.apiURL + "/api/services/app/Subscription/DisableRecurringPayments";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  enableRecurringPayments() {
    let url_ = environment.apiURL + "/api/services/app/Subscription/EnableRecurringPayments";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  getPaymentHistory(sorting: string | null | undefined, maxResultCount: number | undefined, skipCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Payment/GetPaymentHistory?";
    if (sorting !== undefined && sorting !== null)
      url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }


  getAllPaymentHistory(tenantName: string | null | undefined, paymentPeriodId: number | null | undefined, statusId: number | null | undefined, paymentGatewayId: number | null | undefined, selectedEditionId: number | null | undefined,creationStartDate:Date | null | undefined, creationEndDate:Date | null | undefined, subscriptionStartDate:Date | null | undefined,  subscriptionEndDate:Date | null | undefined, sorting: string | null | undefined, maxResultCount: number | undefined, skipCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Payment/GetAllPaymentHistory?";
    if (tenantName !== undefined && tenantName !== null)
      url_ += "TenantName=" + encodeURIComponent("" + tenantName) + "&";
    if (paymentPeriodId !== undefined && paymentPeriodId !== null)
      url_ += "PaymentPeriodId=" + encodeURIComponent("" + paymentPeriodId) + "&";
    if (statusId !== undefined && statusId !== null)
      url_ += "StatusId=" + encodeURIComponent("" + statusId) + "&";
    if (paymentGatewayId !== undefined && paymentGatewayId !== null)
      url_ += "PaymentGatewayId=" + encodeURIComponent("" + paymentGatewayId) + "&";
    if (selectedEditionId !== undefined && selectedEditionId !== null)
      url_ += "EditionId=" + encodeURIComponent("" + selectedEditionId) + "&";

      if (creationStartDate !== undefined && creationStartDate !== null)
      url_ += "CreationStartDate=" + encodeURIComponent("" + creationStartDate) + "&";
      if (creationEndDate !== undefined && creationEndDate !== null)
      url_ += "CreationEndDate=" + encodeURIComponent("" + creationEndDate) + "&";
      if (subscriptionStartDate !== undefined && subscriptionStartDate !== null)
      url_ += "SubscriptionStartDate=" + encodeURIComponent("" + subscriptionStartDate) + "&";
      if (subscriptionEndDate !== undefined && subscriptionEndDate !== null)
      url_ += "SubscriptionEndDate=" + encodeURIComponent("" + subscriptionEndDate) + "&";

    if (sorting !== undefined && sorting !== null)
      url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }


  getEditionsForSelect() {
    let url_ = environment.apiURL + "/api/services/app/TenantRegistration/GetEditionsForSelect";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  isEditionFree(edition: EditionSelectDto): boolean {
    return !edition.dailyPrice && !edition.weeklyPrice && !edition.monthlyPrice && !edition.annualPrice;
  }

}
