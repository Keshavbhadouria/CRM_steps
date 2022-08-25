import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, titleFilter: string | null | undefined, maxDependencyFilter: number | null | undefined, minDependencyFilter: number | null | undefined, descriptionFilter: string | null | undefined, acceptanceCriteriaFilter: string | null | undefined, maxStartDateFilter: Date | null | undefined, minStartDateFilter: Date | null | undefined, maxEndDateFilter: Date | null | undefined, minEndDateFilter: Date | null | undefined, attachmentFilter: string | null | undefined, epicNameFilter: string | null | undefined, pMProjectProjectNameFilter: string | null | undefined, pMSprintSprintFilter: string | null | undefined, pMStoryPriorityPriorityFilter: string | null | undefined, userNameFilter: string | null | undefined, pMStoryStatusStatusFilter: string | null | undefined, userName2Filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined, sprintId: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
      url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (maxDependencyFilter !== undefined && maxDependencyFilter !== null)
      url_ += "MaxDependencyFilter=" + encodeURIComponent("" + maxDependencyFilter) + "&";
    if (minDependencyFilter !== undefined && minDependencyFilter !== null)
      url_ += "MinDependencyFilter=" + encodeURIComponent("" + minDependencyFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
      url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (acceptanceCriteriaFilter !== undefined && acceptanceCriteriaFilter !== null)
      url_ += "AcceptanceCriteriaFilter=" + encodeURIComponent("" + acceptanceCriteriaFilter) + "&";
    if (maxStartDateFilter !== undefined && maxStartDateFilter !== null)
      url_ += "MaxStartDateFilter=" + encodeURIComponent(maxStartDateFilter ? "" + maxStartDateFilter : "") + "&";
    if (minStartDateFilter !== undefined && minStartDateFilter !== null)
      url_ += "MinStartDateFilter=" + encodeURIComponent(minStartDateFilter ? "" + minStartDateFilter : "") + "&";
    if (maxEndDateFilter !== undefined && maxEndDateFilter !== null)
      url_ += "MaxEndDateFilter=" + encodeURIComponent(maxEndDateFilter ? "" + maxEndDateFilter : "") + "&";
    if (minEndDateFilter !== undefined && minEndDateFilter !== null)
      url_ += "MinEndDateFilter=" + encodeURIComponent(minEndDateFilter ? "" + minEndDateFilter : "") + "&";
    if (attachmentFilter !== undefined && attachmentFilter !== null)
      url_ += "AttachmentFilter=" + encodeURIComponent("" + attachmentFilter) + "&";
    if (epicNameFilter !== undefined && epicNameFilter !== null)
      url_ += "EpicNameFilter=" + encodeURIComponent("" + epicNameFilter) + "&";
    if (pMProjectProjectNameFilter !== undefined && pMProjectProjectNameFilter !== null)
      url_ += "PMProjectProjectNameFilter=" + encodeURIComponent("" + pMProjectProjectNameFilter) + "&";
    if (pMSprintSprintFilter !== undefined && pMSprintSprintFilter !== null)
      url_ += "PMSprintSprintFilter=" + encodeURIComponent("" + pMSprintSprintFilter) + "&";
    if (pMStoryPriorityPriorityFilter !== undefined && pMStoryPriorityPriorityFilter !== null)
      url_ += "PMStoryPriorityPriorityFilter=" + encodeURIComponent("" + pMStoryPriorityPriorityFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (pMStoryStatusStatusFilter !== undefined && pMStoryStatusStatusFilter !== null)
      url_ += "PMStoryStatusStatusFilter=" + encodeURIComponent("" + pMStoryStatusStatusFilter) + "&";
    if (userName2Filter !== undefined && userName2Filter !== null)
      url_ += "UserName2Filter=" + encodeURIComponent("" + userName2Filter) + "&";
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
      url_ += "sprintId=0&";
    else if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  updateResponsible(body: UpdateResponsibleDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/UpdateResponsible";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  updateDueDate(body: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/UpdateDueDate";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  createOrEdit(body: CreateOrEditPMStoryDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getPMStoryForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetPMStoryForEdit?";
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

    return this.http.get<CreateOrEditPMStoryDto>(url_).toPromise();
  }

  getPMStoryForEditByPublicId(publicId: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetPMStoryForEditByPublicId?";
    if (publicId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (publicId !== undefined)
      url_ += "publicId=" + encodeURIComponent("" + publicId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.get<GetPMStoryForEditOutput>(url_).toPromise();
  }

  saveStoryStatus(body: StoryStatusUpdateDto) {
    let url_ = environment.apiURL + "/api/services/app/PMStories/SaveStoryStatus";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getPMStoryForDetail(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetPMStoryForDetail?";
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

  getStoryForView(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetPMStoryForView?";
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

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdowns



  getAllPMStoryForTableDropDown(projectId): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/getAllPMStoryForTableDropDown?projectId=" + projectId;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  // getAllUserForTableDropdown(): any {
  //   let url_ = environment.apiURL + "/api/services/app/PMStories/GetAllUserForTableDropdown";
  //   url_ = url_.replace(/[?&]$/, "");

  //   return this.http.get<any>(url_).toPromise();
  // }

  getAllPMStoryPriorityForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetAllPMStoryPriorityForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllPMStoryStatusForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetAllPMStoryStatusForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getStoryHistory(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetStoryHistory?";
    if (id !== undefined && id !== null)
      url_ += "storyId=" + encodeURIComponent("" + id) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllPMStoriesForTableDropdown(projectId: number | undefined, id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetAllPMStoriesForTableDropdown?";
    if (projectId !== undefined && projectId !== null)
      url_ += "projectId=" + encodeURIComponent("" + projectId) + "&";
    if (id !== undefined && id !== null)
      url_ += "storyId=" + encodeURIComponent("" + id) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getTotalSpendTimeForStory(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetTotalSpendTimeForStory?";

    if (id !== undefined && id !== null)
      url_ += "storyId=" + encodeURIComponent("" + id);

    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditPMStoryDto {
  title!: string;
  dependency!: number;
  description!: string;
  acceptanceCriteria!: string;
  startDate!: Date;
  endDate!: Date;
  attachment!: string | undefined;
  epicId!: number | undefined;
  pmProjectId!: number;
  pmSprintId!: number | undefined;
  pmStoryPriorityId!: number;
  owner!: number | undefined;
  pmStoryStatusId!: number;
  initialResponsible!: number | undefined;
  id!: number | undefined;
  estimationHours! : number | undefined;
  estimationMinutes! : number | undefined;
  executionHours! : number | undefined;
  executionMinutes! : number | undefined;
  pmSprintPublicId! : string | undefined;
}

export class UpdateResponsibleDto {
  id!: number;
  responsible!: number | undefined
}

export class StoryStatusUpdateDto {
  storyId: number;
  statusId: number;
}

export class GetPMStoryForEditOutput {
  pmStory: CreateOrEditPMStoryDto;
  epicName: string | undefined;
  pmProjectProjectName: string | undefined;
  pmSprintSprint: string | undefined;
  pmStoryPriorityPriority: string | undefined;
  userName: string | undefined;
  pmStoryStatusStatus: string | undefined;
  userName2: string | undefined;
}