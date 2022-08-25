import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, titleFilter: string | null | undefined, descriptionFilter: string | null | undefined, attachmentFilter: string | null | undefined, pMProjectProjectNameFilter: string | null | undefined, bugStatusStatusFilter: string | null | undefined, userNameFilter: string | null | undefined, pMtaskTitleFilter: string | null | undefined, pMSprintSprintFilter: string | null | undefined, severityFilter: string | null | undefined, bugScreenFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined, sprintId: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
      url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
      url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (attachmentFilter !== undefined && attachmentFilter !== null)
      url_ += "AttachmentFilter=" + encodeURIComponent("" + attachmentFilter) + "&";
    if (pMProjectProjectNameFilter !== undefined && pMProjectProjectNameFilter !== null)
      url_ += "PMProjectProjectNameFilter=" + encodeURIComponent("" + pMProjectProjectNameFilter) + "&";
    if (bugStatusStatusFilter !== undefined && bugStatusStatusFilter !== null)
      url_ += "BugStatusStatusFilter=" + encodeURIComponent("" + bugStatusStatusFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (pMtaskTitleFilter !== undefined && pMtaskTitleFilter !== null)
      url_ += "PMtaskTitleFilter=" + encodeURIComponent("" + pMtaskTitleFilter) + "&";
    if (pMSprintSprintFilter !== undefined && pMSprintSprintFilter !== null)
      url_ += "PMSprintSprintFilter=" + encodeURIComponent("" + pMSprintSprintFilter) + "&";
    if (severityFilter !== undefined && severityFilter !== null)
      url_ += "BugSeverityFilter=" + encodeURIComponent("" + severityFilter) + "&";

    if (bugScreenFilter !== undefined && bugScreenFilter !== null)
      url_ += "BugScreenFilter=" + encodeURIComponent("" + bugScreenFilter) + "&";

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


    if (sprintId === null)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";
    else if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  updateResponsible(body: UpdateResponsibleDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/UpdateResponsible";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  updateDueDate(body: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/UpdateDueDate";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  createOrEdit(body: CreateOrEditTaskBugDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }
  getTaskBugForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/GetTaskBugForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getTaskBugForEditByPublicId(publicId: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/GetTaskBugForEditByPublicId?";
    if (publicId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (publicId !== undefined)
      url_ += "publicId=" + encodeURIComponent("" + publicId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  GetTaskBugForView(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/GetTaskBugForView?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.get<any>(url_).toPromise();
  }

  getCommentsByBugId(userId: number): any {
    let url_ = environment.apiURL + "/api/services/app/PMBugComments/getCommentsByBugId?";

    if (userId !== undefined && userId !== null)
      url_ += "taskId=" + encodeURIComponent("" + userId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  createOrEditComment(body: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMBugComments/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }


  getAllBugStatusForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/GetAllBugStatusForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }


  getAllBugSeverityForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/GetAllBugSeverityForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  saveBugStatus(body: BugStatusUpdateDto) {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/SaveBugStatus";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getBugHistory(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/GetBugHistory?";
    if (id !== undefined && id !== null)
      url_ += "bugId=" + encodeURIComponent("" + id) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getTotalSpendTimeForTaskBug(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TaskBugs/GetTotalSpendTimeForTaskBug?";

    if (id !== undefined && id !== null)
      url_ += "bugId=" + encodeURIComponent("" + id);

    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  deleteComment(commentId): any {
    let url_ = environment.apiURL + "/api/services/app/PMBugComments/DeleteComment?";
    if (commentId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (commentId !== undefined)
      url_ += "commentId=" + encodeURIComponent("" + commentId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  DeleteCommentAttachment(commentId, attachmentId): any {
    let url_ = environment.apiURL + "/api/services/app/PMBugComments/DeleteCommentAttachment?";
    if (commentId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (commentId !== undefined)
      url_ += "commentId=" + encodeURIComponent("" + commentId) + "&";

    if (attachmentId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (attachmentId !== undefined)
      url_ += "attachmentId=" + encodeURIComponent("" + attachmentId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

}

export class CreateOrEditTaskBugDto {
  title!: string;
  description!: string;
  attachment!: string | undefined;
  project!: number | undefined;
  bugStatus!: number;
  responsible!: number | undefined;
  task!: number | undefined;
  sprint!: number | undefined;
  id!: number | undefined;
  severityId!: string | undefined;
  dueDate!: Date | undefined;
  screenName!: string;
}

export class UpdateResponsibleDto {
  id!: number;
  responsible!: number | undefined
}


export class BugStatusUpdateDto {
  bugId: number;
  statusId: number;
}