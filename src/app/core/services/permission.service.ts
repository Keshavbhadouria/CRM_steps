import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getAllPermissions(): any {
    let url_ = environment.apiURL + "/api/services/app/Permission/GetAllPermissions";
    
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}
