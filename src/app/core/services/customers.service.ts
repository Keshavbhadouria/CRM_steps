import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, firstNameFilter: string | null | undefined, emailFilter: string | null | undefined, phoneNumberFilter: string | null | undefined, companyNameFilter: string | null | undefined, websiteFilter: string | null | undefined, addressFilter: string | null | undefined, addressSeconderyFilter: string | null | undefined, zipCodeFilter: string | null | undefined, isActiveFilter: number | null | undefined, quickbooksCutomerIdFilter: string | null | undefined, cRMCountryCountryNameFilter: string | null | undefined, cRMStateStateNameFilter: string | null | undefined, cRMCityCityNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCustomers/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (firstNameFilter !== undefined && firstNameFilter !== null)
      url_ += "FirstNameFilter=" + encodeURIComponent("" + firstNameFilter) + "&";
    if (emailFilter !== undefined && emailFilter !== null)
      url_ += "EmailFilter=" + encodeURIComponent("" + emailFilter) + "&";
    if (phoneNumberFilter !== undefined && phoneNumberFilter !== null)
      url_ += "PhoneNumberFilter=" + encodeURIComponent("" + phoneNumberFilter) + "&";
    if (companyNameFilter !== undefined && companyNameFilter !== null)
      url_ += "CompanyNameFilter=" + encodeURIComponent("" + companyNameFilter) + "&";
    if (websiteFilter !== undefined && websiteFilter !== null)
      url_ += "WebsiteFilter=" + encodeURIComponent("" + websiteFilter) + "&";
    if (addressFilter !== undefined && addressFilter !== null)
      url_ += "AddressFilter=" + encodeURIComponent("" + addressFilter) + "&";
    if (addressSeconderyFilter !== undefined && addressSeconderyFilter !== null)
      url_ += "AddressSeconderyFilter=" + encodeURIComponent("" + addressSeconderyFilter) + "&";
    if (zipCodeFilter !== undefined && zipCodeFilter !== null)
      url_ += "ZipCodeFilter=" + encodeURIComponent("" + zipCodeFilter) + "&";
    if (isActiveFilter !== undefined && isActiveFilter !== null)
      url_ += "IsActiveFilter=" + encodeURIComponent("" + isActiveFilter) + "&";
    if (quickbooksCutomerIdFilter !== undefined && quickbooksCutomerIdFilter !== null)
      url_ += "QuickbooksCutomerIdFilter=" + encodeURIComponent("" + quickbooksCutomerIdFilter) + "&";
    if (cRMCountryCountryNameFilter !== undefined && cRMCountryCountryNameFilter !== null)
      url_ += "CRMCountryCountryNameFilter=" + encodeURIComponent("" + cRMCountryCountryNameFilter) + "&";
    if (cRMStateStateNameFilter !== undefined && cRMStateStateNameFilter !== null)
      url_ += "CRMStateStateNameFilter=" + encodeURIComponent("" + cRMStateStateNameFilter) + "&";
    if (cRMCityCityNameFilter !== undefined && cRMCityCityNameFilter !== null)
      url_ += "CRMCityCityNameFilter=" + encodeURIComponent("" + cRMCityCityNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditCRMCustomerDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCustomers/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCustomers/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    this.http.delete(url_).toPromise();
  }


  

  getAllCRMCountryForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCustomers/GetAllCRMCountryForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get(url_).toPromise();
  }

  getAllCRMStates(): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCustomers/GetAllCRMStates";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get(url_).toPromise();
  }
  getAllCRMCities(): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCustomers/GetAllCRMCities";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get(url_).toPromise();
  }

  getAllCRMStateForTableDropdown(countryId):any {
    let url_ = environment.apiURL + "/api/services/app/CRMCustomers/GetAllCRMStateForTableDropdown?";
    if (countryId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (countryId !== undefined)
      url_ += "countryId=" + encodeURIComponent("" + countryId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get(url_).toPromise();
  }

  getAllCRMCityForTableDropdown(stateId):any {
    let url_ = environment.apiURL + "/api/services/app/CRMCustomers/GetAllCRMCityForTableDropdown?";
    if (stateId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (stateId !== undefined)
      url_ += "stateId=" + encodeURIComponent("" + stateId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get(url_).toPromise();
  }

}

export class CreateOrEditCRMCustomerDto {
  firstName: string;
  email: string | undefined;
  phoneNumber: string | undefined;
  companyName: string | undefined;
  website: string | undefined;
  address: string | undefined;
  addressSecondery: string | undefined;
  zipCode: string | undefined;
  isActive: boolean;
  quickbooksCutomerId: string | undefined;
  crmCountryId: number;
  crmStateId: number;
  crmCityId: number;
  crmCountryName: string | undefined;
  crmStateName: string | undefined;
  crmCityName: string | undefined;
  id: string | undefined;
}



