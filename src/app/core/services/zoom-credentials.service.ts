import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoomCredentialsService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, zoomKeyFilter: string | null | undefined, zoomSecretFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ZoomCredentials/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (zoomKeyFilter !== undefined && zoomKeyFilter !== null)
      url_ += "ZoomKeyFilter=" + encodeURIComponent("" + zoomKeyFilter) + "&";
    if (zoomSecretFilter !== undefined && zoomSecretFilter !== null)
      url_ += "ZoomSecretFilter=" + encodeURIComponent("" + zoomSecretFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditZoomCredentialDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ZoomCredentials/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getZoomCredentialForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ZoomCredentials/GetZoomCredentialForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ZoomCredentials/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
  //dropdowns
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ZoomCredentials/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditZoomCredentialDto {
  zoomKey!: string | undefined;
  zoomSecret!: string | undefined;
  userId!: number | undefined;
  id!: string | undefined;
}