import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingInfoService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, cardNameFilter: string | null | undefined, cardNumberFilter: string | null | undefined, maxExpirationMonthFilter: number | null | undefined, minExpirationMonthFilter: number | null | undefined, maxExpirationYearFilter: number | null | undefined, minExpirationYearFilter: number | null | undefined, cVVFilter: string | null | undefined, address1Filter: string | null | undefined, address2Filter: string | null | undefined, cityFilter: string | null | undefined, stateFilter: string | null | undefined, countryFilter: string | null | undefined, zipcodeFilter: string | null | undefined, gatewayFilter: string | null | undefined, gatewayCustomerCodeFilter: string | null | undefined, gatewayTokenFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BillingInfos/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (cardNameFilter !== undefined && cardNameFilter !== null)
      url_ += "CardNameFilter=" + encodeURIComponent("" + cardNameFilter) + "&";
    if (cardNumberFilter !== undefined && cardNumberFilter !== null)
      url_ += "CardNumberFilter=" + encodeURIComponent("" + cardNumberFilter) + "&";
    if (maxExpirationMonthFilter !== undefined && maxExpirationMonthFilter !== null)
      url_ += "MaxExpirationMonthFilter=" + encodeURIComponent("" + maxExpirationMonthFilter) + "&";
    if (minExpirationMonthFilter !== undefined && minExpirationMonthFilter !== null)
      url_ += "MinExpirationMonthFilter=" + encodeURIComponent("" + minExpirationMonthFilter) + "&";
    if (maxExpirationYearFilter !== undefined && maxExpirationYearFilter !== null)
      url_ += "MaxExpirationYearFilter=" + encodeURIComponent("" + maxExpirationYearFilter) + "&";
    if (minExpirationYearFilter !== undefined && minExpirationYearFilter !== null)
      url_ += "MinExpirationYearFilter=" + encodeURIComponent("" + minExpirationYearFilter) + "&";
    if (cVVFilter !== undefined && cVVFilter !== null)
      url_ += "CVVFilter=" + encodeURIComponent("" + cVVFilter) + "&";
    if (address1Filter !== undefined && address1Filter !== null)
      url_ += "Address1Filter=" + encodeURIComponent("" + address1Filter) + "&";
    if (address2Filter !== undefined && address2Filter !== null)
      url_ += "Address2Filter=" + encodeURIComponent("" + address2Filter) + "&";
    if (cityFilter !== undefined && cityFilter !== null)
      url_ += "CityFilter=" + encodeURIComponent("" + cityFilter) + "&";
    if (stateFilter !== undefined && stateFilter !== null)
      url_ += "StateFilter=" + encodeURIComponent("" + stateFilter) + "&";
    if (countryFilter !== undefined && countryFilter !== null)
      url_ += "CountryFilter=" + encodeURIComponent("" + countryFilter) + "&";
    if (zipcodeFilter !== undefined && zipcodeFilter !== null)
      url_ += "ZipcodeFilter=" + encodeURIComponent("" + zipcodeFilter) + "&";
    if (gatewayFilter !== undefined && gatewayFilter !== null)
      url_ += "GatewayFilter=" + encodeURIComponent("" + gatewayFilter) + "&";
    if (gatewayCustomerCodeFilter !== undefined && gatewayCustomerCodeFilter !== null)
      url_ += "GatewayCustomerCodeFilter=" + encodeURIComponent("" + gatewayCustomerCodeFilter) + "&";
    if (gatewayTokenFilter !== undefined && gatewayTokenFilter !== null)
      url_ += "GatewayTokenFilter=" + encodeURIComponent("" + gatewayTokenFilter) + "&";
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

  createOrEdit(body: CreateOrEditBillingInfoDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BillingInfos/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getBillingInfoForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BillingInfos/GetBillingInfoForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BillingInfos/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
}

export class CreateOrEditBillingInfoDto {
  cardName!: string;
  cardNumber!: string;
  expirationMonth!: number;
  expirationYear!: number;
  cvv!: string | undefined;
  address1!: string | undefined;
  address2!: string | undefined;
  city!: string | undefined;
  state!: string | undefined;
  country!: string | undefined;
  zipcode!: string | undefined;
  gateway!: string | undefined;
  gatewayCustomerCode!: string | undefined;
  gatewayToken!: string | undefined;
  id!: number | undefined;
}