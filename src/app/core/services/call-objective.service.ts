import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallObjectiveService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, objetiveNameFilter: string | null | undefined, activeFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PhoneCallObjetives/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (objetiveNameFilter !== undefined && objetiveNameFilter !== null)
      url_ += "ObjetiveNameFilter=" + encodeURIComponent("" + objetiveNameFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
      url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
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
  createOrEdit(body: CreateOrEditPhoneCallObjetiveDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PhoneCallObjetives/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getPhoneCallObjetiveForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PhoneCallObjetives/GetPhoneCallObjetiveForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PhoneCallObjetives/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
}
export class CreateOrEditPhoneCallObjetiveDto {
  objetiveName!: string;
  active!: boolean;
  id!: number | undefined;
}