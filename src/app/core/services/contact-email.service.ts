import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditLawfirmFeeTypeDto } from '../models/Lawfirm/LawfirmFeeType';
import { CreateOrEditContactEmailHistoryDto } from './email-histories.service';

@Injectable({
  providedIn: 'root'
})
export class ContactEmailService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, subjectFilter: string | null | undefined, bodyMessageFilter: string | null | undefined, gatewayFilter: string | null | undefined, gatewayResponseFilter: string | null | undefined, attachmentUrlFilter: string | null | undefined, userNameFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
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

  getAllByFilters(filter: string | null | undefined, subjectFilter: string | null | undefined, bodyMessageFilter: string | null | undefined, gatewayFilter: string | null | undefined, gatewayResponseFilter: string | null | undefined, attachmentUrlFilter: string | null | undefined, userNameFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, contactId: number | null | undefined, lawyerId: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactEmailHistories/GetAllByFilters?";
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
    if (contactId !== undefined && contactId !== null)
      url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
    if (lawyerId !== undefined && lawyerId !== null)
      url_ += "LawyerId=" + encodeURIComponent("" + lawyerId) + "&";
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

  //#endregion

  //#region CUD

  createOrEdit(body: CreateOrEditContactEmailHistoryDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactEmailHistories/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
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

  //#endregion

}
