import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailHistoriesService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, subjectFilter: string | null | undefined, bodyMessageFilter: string | null | undefined, gatewayFilter: string | null | undefined, gatewayResponseFilter: string | null | undefined, attachmentUrlFilter: string | null | undefined, userNameFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactEmailHistories/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (subjectFilter !== undefined && subjectFilter !== null)
      url_ += "SubjectFilter=" + encodeURIComponent("" + subjectFilter) + "&";
    if (bodyMessageFilter !== undefined && bodyMessageFilter !== null)
      url_ += "BodyMessageFilter=" + encodeURIComponent("" + bodyMessageFilter) + "&";
    if (gatewayFilter !== undefined && gatewayFilter !== null)
      url_ += "GatewayFilter=" + encodeURIComponent("" + gatewayFilter) + "&";
    if (gatewayResponseFilter !== undefined && gatewayResponseFilter !== null)
      url_ += "GatewayResponseFilter=" + encodeURIComponent("" + gatewayResponseFilter) + "&";
    if (attachmentUrlFilter !== undefined && attachmentUrlFilter !== null)
      url_ += "AttachmentUrlFilter=" + encodeURIComponent("" + attachmentUrlFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
      url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
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
  createOrEdit(body: CreateOrEditContactEmailHistoryDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactEmailHistories/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getContactEmailHistoryForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactEmailHistories/GetContactEmailHistoryForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactEmailHistories/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
  //dropdown
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactEmailHistories/GetAllUserForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllContactForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactEmailHistories/GetAllContactForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditContactEmailHistoryDto {
  subject!: string;
  bodyMessage!: string;
  gateway!: string | undefined;
  gatewayResponse!: string | undefined;
  attachmentUrl!: string | undefined;
  userId!: number | undefined;
  contactId!: number | undefined;
  id!: string | undefined;
}