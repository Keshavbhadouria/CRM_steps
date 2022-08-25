import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateTenantWithUserDto } from '../models/Tenant/CreateTenant';

@Injectable({
  providedIn: 'root'
})
export class TenantRegistrationService {

  constructor(private http: HttpClient, private _router: Router) { }

  getEdition(editionId: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/TenantRegistration/GetEdition?";
    if (editionId === null)
      throw new Error("The parameter 'editionId' cannot be null.");
    else if (editionId !== undefined)
      url_ += "editionId=" + encodeURIComponent("" + editionId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  getText() {
    let url_ = environment.apiURL + "/api/services/app/TenantRegistration/getText";
    
    url_ = url_.replace(/[?&]$/, "");

    let headers: HttpHeaders = new HttpHeaders();
    
      headers = new HttpHeaders()
        .set('.AspNetCore.Culture', 'c=en|uic=en');

    const requestOptions = { headers: headers };

    return this.http.get<any>(url_, requestOptions);
  }

  registerTenantWithUser(body: CreateTenantWithUserDto | undefined) {
    
    let url_ = environment.apiURL + "/api/services/app/TenantRegistration/RegisterTenantWithUser";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let headers: HttpHeaders = new HttpHeaders();
    
      headers = new HttpHeaders()
        .set('.AspNetCore.Culture', 'c=en|uic=en-US');

    const requestOptions = { headers: headers };
    
    return this.http.post<any>(url_ , body, requestOptions); //, requestOptions
  }



}
