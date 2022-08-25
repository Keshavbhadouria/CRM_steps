import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, firstNameFilter: string | null | undefined, lastNameFilter: string | null | undefined, companyFilter: string | null | undefined, emailFilter: string | null | undefined, phoneNoFilter: string | null | undefined, serviceFilter: string | null | undefined, payToFilter: string | null | undefined, primaryAddressFilter: string | null | undefined, secondaryAddressFilter: string | null | undefined, zipCodeFilter: string | null | undefined, quickBooksVendorIdFilter: string | null | undefined, cRMCountryCountryNameFilter: string | null | undefined, cRMStateStateNameFilter: string | null | undefined, cRMCityCityNameFilter: string | null | undefined, cRMInvoiceTermTermNameFilter: string | null | undefined, cRMPaymentMethodNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (firstNameFilter !== undefined && firstNameFilter !== null)
      url_ += "FirstNameFilter=" + encodeURIComponent("" + firstNameFilter) + "&";
    if (lastNameFilter !== undefined && lastNameFilter !== null)
      url_ += "LastNameFilter=" + encodeURIComponent("" + lastNameFilter) + "&";
    if (companyFilter !== undefined && companyFilter !== null)
      url_ += "CompanyFilter=" + encodeURIComponent("" + companyFilter) + "&";
    if (emailFilter !== undefined && emailFilter !== null)
      url_ += "EmailFilter=" + encodeURIComponent("" + emailFilter) + "&";
    if (phoneNoFilter !== undefined && phoneNoFilter !== null)
      url_ += "PhoneNoFilter=" + encodeURIComponent("" + phoneNoFilter) + "&";
    if (serviceFilter !== undefined && serviceFilter !== null)
      url_ += "ServiceFilter=" + encodeURIComponent("" + serviceFilter) + "&";
    if (payToFilter !== undefined && payToFilter !== null)
      url_ += "PayToFilter=" + encodeURIComponent("" + payToFilter) + "&";
    if (primaryAddressFilter !== undefined && primaryAddressFilter !== null)
      url_ += "PrimaryAddressFilter=" + encodeURIComponent("" + primaryAddressFilter) + "&";
    if (secondaryAddressFilter !== undefined && secondaryAddressFilter !== null)
      url_ += "SecondaryAddressFilter=" + encodeURIComponent("" + secondaryAddressFilter) + "&";
    if (zipCodeFilter !== undefined && zipCodeFilter !== null)
      url_ += "ZipCodeFilter=" + encodeURIComponent("" + zipCodeFilter) + "&";
    if (quickBooksVendorIdFilter !== undefined && quickBooksVendorIdFilter !== null)
      url_ += "QuickBooksVendorIdFilter=" + encodeURIComponent("" + quickBooksVendorIdFilter) + "&";
    if (cRMCountryCountryNameFilter !== undefined && cRMCountryCountryNameFilter !== null)
      url_ += "CRMCountryCountryNameFilter=" + encodeURIComponent("" + cRMCountryCountryNameFilter) + "&";
    if (cRMStateStateNameFilter !== undefined && cRMStateStateNameFilter !== null)
      url_ += "CRMStateStateNameFilter=" + encodeURIComponent("" + cRMStateStateNameFilter) + "&";
    if (cRMCityCityNameFilter !== undefined && cRMCityCityNameFilter !== null)
      url_ += "CRMCityCityNameFilter=" + encodeURIComponent("" + cRMCityCityNameFilter) + "&";
    if (cRMInvoiceTermTermNameFilter !== undefined && cRMInvoiceTermTermNameFilter !== null)
      url_ += "CRMInvoiceTermTermNameFilter=" + encodeURIComponent("" + cRMInvoiceTermTermNameFilter) + "&";
    if (cRMPaymentMethodNameFilter !== undefined && cRMPaymentMethodNameFilter !== null)
      url_ += "CRMPaymentMethodNameFilter=" + encodeURIComponent("" + cRMPaymentMethodNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditCRMVendorDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise()
  }

  getCRMVendorForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/GetCRMVendorForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdowm
  getAllCRMCountryForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/GetAllCRMCountryForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getAllCRMInvoiceTermForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/GetAllCRMInvoiceTermForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getAllCRMPaymentMethodForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/GetAllCRMPaymentMethodForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  //state
  getAllCRMStateForTableDropdown(countryId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/GetAllCRMStateForTableDropdown?";
    if (countryId !== undefined)
      url_ += "countryId=" + encodeURIComponent("" + countryId) + "&";

    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_).toPromise();
  }
  //city
  getAllCRMCityForTableDropdown(stateId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMVendors/GetAllCRMCityForTableDropdown?";
    if (stateId !== undefined)
      url_ += "stateId=" + encodeURIComponent("" + stateId) + "&";

    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_).toPromise();
  }

}

export class CreateOrEditCRMVendorDto {
  firstName!: string | undefined;
  lastName!: string | undefined;
  company!: string | undefined;
  email!: string | undefined;
  phoneNo!: string | undefined;
  service!: string | undefined;
  payTo!: string | undefined;
  primaryAddress!: string | undefined;
  secondaryAddress!: string | undefined;
  zipCode!: string | undefined;
  quickBooksVendorId!: string | undefined;
  crmCountryId!: number;
  crmCountryName!: string | undefined;
  crmStateId!: number;
  crmStateName!: string | undefined;
  crmCityId!: number;
  crmCityName!: string | undefined;
  crmInvoiceTermId!: number;
  crmInvoiceTermName!: string | undefined;
  crmPaymentMethodId!: number | undefined;
  crmPaymentMethodName!: string | undefined;
  id!: string | undefined;
}
