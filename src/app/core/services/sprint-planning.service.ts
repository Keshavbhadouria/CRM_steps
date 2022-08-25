import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintPlanningService {

  constructor(private http: HttpClient) { }

  getAllPMSProjectForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAllPMProjectFoTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllSprintByProjectId(projectId): any {
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAllPMSprintForTableDropDown?projectId=" + projectId;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
  getAllSprintByProjectIdWithGuid(projectId): any {
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAllPMSprintForTableDropDownGuid?projectId=" + projectId;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllPMSprintForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetAllPMSprintsForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getStoriesBySprintId(sprintId): any {
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetStoriesBySprintId?sprintId=" + sprintId;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
  getUserEstimationByStoryId(storyId) {
    let url_ = environment.apiURL + "/api/services/app/PMSprints/GetuserEstimateByStoryId?storyId=" + storyId;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getPMStoryForView(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/GetPMStoryForView?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  updateVote(id: number | undefined, status): any {
    let url_ = environment.apiURL + "/api/services/app/PMStories/UpdateVote?";
    if (id !== undefined && id !== null)
      url_ += "storyId=" + encodeURIComponent("" + id) + "&";
    if (status !== undefined && status !== null)
      url_ += "isOpen=" + encodeURIComponent("" + status) + "&";

    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_).toPromise();
  }

}


