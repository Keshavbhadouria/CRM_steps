import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  impersonate(body: ImpersonateInput | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Account/Impersonate";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body);
  }

  backToImpersonate(): any {
    let url_ = environment.apiURL + "/api/services/app/Account/BackToImpersonator";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.post<any>(url_,'');
  }

  getAllCountryForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/Account/GetAllCountryForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  getStates(countryId: string | undefined) {
    let url_ = environment.apiURL  + "/api/services/app/Account/GetStates?";
    if (countryId === null)
      throw new Error("The parameter 'countryId' cannot be null.");
    else if (countryId !== undefined)
      url_ += "countryId=" + encodeURIComponent("" + countryId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }
}


export class ImpersonateInput {
  tenantId!: number | undefined;
  userId!: number;
}
