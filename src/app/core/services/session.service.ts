import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(private http: HttpClient, private _router: Router) { }


  getCurrentLoginInformations() {
    let url_ = environment.apiURL + "/api/services/app/Session/GetCurrentLoginInformations";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }
  
}
