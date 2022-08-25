import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePaymentDto, PaymentGatewayModel, RefundPaymentDto, SubscriptionPaymentDto } from '../models/Admin/Subscription';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private _router: Router) { }

  switchBetweenFreeEditions(upgradeEditionId: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Payment/SwitchBetweenFreeEditions?";
    if (upgradeEditionId === null)
      throw new Error("The parameter 'upgradeEditionId' cannot be null.");
    else if (upgradeEditionId !== undefined)
      url_ += "upgradeEditionId=" + encodeURIComponent("" + upgradeEditionId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.post<any>(url_, null);
  }

  hasAnyPayment(): Observable<boolean> {
    let url_ =  environment.apiURL + "/api/services/app/Payment/HasAnyPayment";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  getPaymentInfo(upgradeEditionId: number | null | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Payment/GetPaymentInfo?";
    if (upgradeEditionId !== undefined && upgradeEditionId !== null)
      url_ += "UpgradeEditionId=" + encodeURIComponent("" + upgradeEditionId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  upgradeSubscriptionCostsLessThenMinAmount(editionId: number | undefined): Observable<void> {
    let url_ = environment.apiURL + "/api/services/app/Payment/UpgradeSubscriptionCostsLessThenMinAmount?";
    if (editionId === null)
      throw new Error("The parameter 'editionId' cannot be null.");
    else if (editionId !== undefined)
      url_ += "editionId=" + encodeURIComponent("" + editionId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  getLastCompletedPayment(): Observable<SubscriptionPaymentDto> {
    let url_ = environment.apiURL + "/api/services/app/Payment/GetLastCompletedPayment";
    url_ = url_.replace(/[?&]$/, "");


    return this.http.get<any>(url_);
  }


  getActiveGateways(recurringPaymentsEnabled: boolean | null | undefined): Observable<PaymentGatewayModel[]> {
    let url_ = environment.apiURL + "/api/services/app/Payment/GetActiveGateways?";
    if (recurringPaymentsEnabled !== undefined && recurringPaymentsEnabled !== null)
      url_ += "RecurringPaymentsEnabled=" + encodeURIComponent("" + recurringPaymentsEnabled) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  createPayment(body: CreatePaymentDto | undefined): Observable<number> {
    let url_ = environment.apiURL + "/api/services/app/Payment/CreatePayment";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body);
  }

  refundPayment(body: RefundPaymentDto | undefined): Observable<number> {
    let url_ = environment.apiURL + "/api/services/app/Payment/RefundPayment";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body);
  }

  getPayment(paymentId: number | undefined): Observable<SubscriptionPaymentDto> {
    let url_ =  environment.apiURL + "/api/services/app/Payment/GetPayment?";
    if (paymentId === null)
      throw new Error("The parameter 'paymentId' cannot be null.");
    else if (paymentId !== undefined)
      url_ += "paymentId=" + encodeURIComponent("" + paymentId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  getRefundReasons(): any {
    let url_ = environment.apiURL + "/api/services/app/RefundPaymentReasons/GetAllLookup";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

}
