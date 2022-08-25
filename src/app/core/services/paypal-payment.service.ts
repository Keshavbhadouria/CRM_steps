import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PayPalConfigurationDto } from '../models/Admin/Subscription';

@Injectable({
  providedIn: 'root'
})
export class PaypalPaymentService {

  constructor(private http: HttpClient, private _router: Router) { }

  getConfiguration(): Observable<PayPalConfigurationDto> {
    let url_ = environment.apiURL + "/api/services/app/PayPalPayment/GetConfiguration";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  confirmPayment(paymentId: number | undefined, paypalOrderId: string | null | undefined): Observable<void> {
    let url_ = environment.apiURL + "/api/services/app/PayPalPayment/ConfirmPayment?";
    if (paymentId === null)
      throw new Error("The parameter 'paymentId' cannot be null.");
    else if (paymentId !== undefined)
      url_ += "paymentId=" + encodeURIComponent("" + paymentId) + "&";
    if (paypalOrderId !== undefined && paypalOrderId !== null)
      url_ += "paypalOrderId=" + encodeURIComponent("" + paypalOrderId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    // const content_ = JSON.stringify(body);
    return this.http.post<any>(url_,null);
  }


}
