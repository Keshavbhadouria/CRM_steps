import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateOrEditSupportTicketCommentDto } from './support-comment.service';

@Injectable({
  providedIn: 'root'
})
export class SupportsService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, contactNameFilter: string | null | undefined, emailFilter: string | null | undefined, subjectFilter: string | null | undefined, bodyMessageFilter: string | null | undefined, attatchmentUrlFilter: string | null | undefined, userNameFilter: string | null | undefined, helpDeskStatusStatusNameFilter: string | null | undefined, creationDateStart: Date | null | undefined, creationDateEnd: Date | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Supports/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (contactNameFilter !== undefined && contactNameFilter !== null)
      url_ += "ContactNameFilter=" + encodeURIComponent("" + contactNameFilter) + "&";
    if (emailFilter !== undefined && emailFilter !== null)
      url_ += "EmailFilter=" + encodeURIComponent("" + emailFilter) + "&";
    if (subjectFilter !== undefined && subjectFilter !== null)
      url_ += "SubjectFilter=" + encodeURIComponent("" + subjectFilter) + "&";
    if (bodyMessageFilter !== undefined && bodyMessageFilter !== null)
      url_ += "BodyMessageFilter=" + encodeURIComponent("" + bodyMessageFilter) + "&";
    if (attatchmentUrlFilter !== undefined && attatchmentUrlFilter !== null)
      url_ += "AttatchmentUrlFilter=" + encodeURIComponent("" + attatchmentUrlFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (helpDeskStatusStatusNameFilter !== undefined && helpDeskStatusStatusNameFilter !== null)
      url_ += "HelpDeskStatusStatusNameFilter=" + encodeURIComponent("" + helpDeskStatusStatusNameFilter) + "&";
    if (creationDateStart !== undefined && creationDateStart !== null)
      url_ += "CreationDateStart=" + encodeURIComponent(creationDateStart ? "" + creationDateStart : "") + "&";
    if (creationDateEnd !== undefined && creationDateEnd !== null)
      url_ += "CreationDateEnd=" + encodeURIComponent(creationDateEnd ? "" + creationDateEnd : "") + "&";
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

  //support tiles
  getSupportTicketTiles(): any {
    let url_ = environment.apiURL + "/api/services/app/Supports/GetSupportTicketTiles";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditSupportDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Supports/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getSupportForEdit(id: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Supports/GetSupportForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Supports/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  loadUserImage(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Profile/GetProfilePictureByUser?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "userId=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get(url_).toPromise();
  }

  //dropdowm
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/Supports/GetAllUserForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getAllHelpDeskStatusForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/Supports/GetAllHelpDeskStatusForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}


export class CreateOrEditSupportDto {
  contactName!: string;
  email!: string;
  subject!: string;
  bodyMessage!: string;
  htmlBodyMessages!: string | undefined;
  attatchmentUrl!: string | undefined;
  userId!: number | undefined;
  helpDeskStatusId!: number | undefined;
  id!: string | undefined;
  comments : CreateOrEditSupportTicketCommentDto[]
}

export class NameValueDto {
  name!: string | undefined;
  value!: string | undefined;
}