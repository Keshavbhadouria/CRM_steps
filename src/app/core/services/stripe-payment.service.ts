import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnyComponent } from 'preact';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StripeCreatePaymentSessionInput, StripePaymentResultOutput, SubscriptionPaymentDto } from '../models/Admin/Subscription';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentService {

  constructor(private http: HttpClient, private _router: Router) { }


  getConfiguration(): Observable<any> {
    let url_ = environment.apiURL + "/api/services/app/StripePayment/GetConfiguration";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  createPaymentSession(body: StripeCreatePaymentSessionInput | undefined): Observable<string> {
    let url_ = environment.apiURL + "/api/services/app/StripePayment/CreatePaymentSession";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_,body);

  }


  getPayment(stripeSessionId: string | null | undefined): Observable<SubscriptionPaymentDto> {
    let url_ = environment.apiURL + "/api/services/app/StripePayment/GetPayment?";
    if (stripeSessionId !== undefined && stripeSessionId !== null)
      url_ += "StripeSessionId=" + encodeURIComponent("" + stripeSessionId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  getPaymentResult(paymentId: number | undefined): Observable<StripePaymentResultOutput> {
    let url_ = environment.apiURL + "/api/services/app/StripePayment/GetPaymentResult?";
    if (paymentId === null)
      throw new Error("The parameter 'paymentId' cannot be null.");
    else if (paymentId !== undefined)
      url_ += "PaymentId=" + encodeURIComponent("" + paymentId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

}
