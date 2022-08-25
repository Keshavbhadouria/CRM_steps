import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingCommentsService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, commentsFilter: string | null | undefined, attachmentUrlFilter: string | null | undefined, contactZoomCallMeetingZoomMeetingUrlFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallCommentses/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (commentsFilter !== undefined && commentsFilter !== null)
      url_ += "CommentsFilter=" + encodeURIComponent("" + commentsFilter) + "&";
    if (attachmentUrlFilter !== undefined && attachmentUrlFilter !== null)
      url_ += "AttachmentUrlFilter=" + encodeURIComponent("" + attachmentUrlFilter) + "&";
    if (contactZoomCallMeetingZoomMeetingUrlFilter !== undefined && contactZoomCallMeetingZoomMeetingUrlFilter !== null)
      url_ += "ContactZoomCallMeetingZoomMeetingUrlFilter=" + encodeURIComponent("" + contactZoomCallMeetingZoomMeetingUrlFilter) + "&";
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

  createOrEdit(body: CreateOrEditContactZoomCallCommentsDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallCommentses/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getContactZoomCallCommentsForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallCommentses/GetContactZoomCallCommentsForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallCommentses/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllContactZoomCallMeetingForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallCommentses/GetAllContactZoomCallMeetingForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallCommentses/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditContactZoomCallCommentsDto {
  comments!: string;
  htmlComments!: string | undefined;
  attachmentUrl!: string | undefined;
  contactZoomCallMeetingId!: string | undefined;
  userId!: number | undefined;
  id!: string | undefined;
}