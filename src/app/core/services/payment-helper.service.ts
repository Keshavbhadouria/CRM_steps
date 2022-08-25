import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EditionSelectDto } from '../models/Admin/select-edition';
import { EditionPaymentType, PaymentPeriodType, SubscriptionPaymentGatewayType } from '../models/Admin/Subscription';

@Injectable({
  providedIn: 'root'
})
export class PaymentHelperService {

  constructor(private http: HttpClient, private _router: Router) { }


  getPaymentGatewayType(gatewayType) {
    if (parseInt(gatewayType) === SubscriptionPaymentGatewayType.Paypal) {
        return 'Paypal';
    }

    return 'Stripe';
}


  getEditionPaymentType(editionPaymentType) {
    if (parseInt(editionPaymentType) === EditionPaymentType.BuyNow) {
        return 'BuyNow';
    } else if (parseInt(editionPaymentType) === EditionPaymentType.Extend) {
        return 'Extend';
    } else if (parseInt(editionPaymentType) === EditionPaymentType.NewRegistration) {
        return 'NewRegistration';
    }

    return 'Upgrade';
  }

  getInitialSelectedPaymentPeriodType(edition: EditionSelectDto) {
    if (edition.dailyPrice > 0) {
        return PaymentPeriodType.Daily;
    } else if (edition.weeklyPrice > 0) {
        return PaymentPeriodType.Weekly;
    } else if (edition.monthlyPrice > 0) {
        return PaymentPeriodType.Monthly;
    } else if (edition.annualPrice > 0) {
        return PaymentPeriodType.Annual;
    }

    return undefined;
}


}
