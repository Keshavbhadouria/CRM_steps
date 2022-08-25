import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestSprintPlanningService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, pMStoryTitleFilter: string | null | undefined, userNameFilter: string | null | undefined, pMStoryEstimationEstimationFilter: string | null | undefined, pMSprintSprintFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/StoryEstimationVotes/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (pMStoryTitleFilter !== undefined && pMStoryTitleFilter !== null)
      url_ += "PMStoryTitleFilter=" + encodeURIComponent("" + pMStoryTitleFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (pMStoryEstimationEstimationFilter !== undefined && pMStoryEstimationEstimationFilter !== null)
      url_ += "PMStoryEstimationEstimationFilter=" + encodeURIComponent("" + pMStoryEstimationEstimationFilter) + "&";
    if (pMSprintSprintFilter !== undefined && pMSprintSprintFilter !== null)
      url_ += "PMSprintSprintFilter=" + encodeURIComponent("" + pMSprintSprintFilter) + "&";
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
  createOrEdit(body: CreateOrEditStoryEstimationVoteDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/StoryEstimationVotes/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/StoryEstimationVotes/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdowns
  getAllPMStoryForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/StoryEstimationVotes/GetAllPMStoryForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/StoryEstimationVotes/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllPMStoryEstimationForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/StoryEstimationVotes/GetAllPMStoryEstimationForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllPMSprintForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/StoryEstimationVotes/GetAllPMSprintForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditStoryEstimationVoteDto {
  storyId!: number;
  userId!: number;
  storyEstimationId!: number;
  sprintId!: number | undefined;
  id!: string | undefined;
}

