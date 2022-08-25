import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportCommentService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, commentFilter: string | null | undefined, attatchmentUrlFilter: string | null | undefined, userNameFilter: string | null | undefined, supportSubjectFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/SupportTicketComments/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (commentFilter !== undefined && commentFilter !== null)
      url_ += "CommentFilter=" + encodeURIComponent("" + commentFilter) + "&";
    if (attatchmentUrlFilter !== undefined && attatchmentUrlFilter !== null)
      url_ += "AttatchmentUrlFilter=" + encodeURIComponent("" + attatchmentUrlFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (supportSubjectFilter !== undefined && supportSubjectFilter !== null)
      url_ += "SupportSubjectFilter=" + encodeURIComponent("" + supportSubjectFilter) + "&";
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

  createOrEdit(body: CreateOrEditSupportTicketCommentDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/SupportTicketComments/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getSupportForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/SupportTicketComments/GetSupportTicketCommentForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/SupportTicketComments/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  getBySupportId(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/SupportTicketComments/getBySupportId?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "supportId=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get(url_).toPromise();
  }

  //dropdowm
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/SupportTicketComments/GetAllUserForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getAllSupportForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/SupportTicketComments/GetAllSupportForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditSupportTicketCommentDto {
  comment!: string;
  attatchmentUrl!: string | undefined;
  userId!: number | undefined;
  supportId!: string | undefined;
  id!: number | undefined;
  userImageBlob!: string;
  userName : string | undefined;
  createdDate : string | undefined
}