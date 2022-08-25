import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PMStoryBoardService {
  constructor(private http: HttpClient, private _router: Router) { }

  getAll(userId: number | null | undefined, projectId: number | null | undefined, sprintId: number | null | undefined, filterText: string, selectedStatuses: any[]): any {
    let url_ = environment.apiURL + "/api/services/app/PMStoryBoard/LoadDashboardStoriesData";

    url_ = url_.replace(/[?&]$/, "");

    var body = {
      "userId":userId,
      "projectId":projectId,
      "sprintId": sprintId,
      "selectedStatuses":selectedStatuses,
      "filterText":filterText
    }

    return this.http.post<any>(url_, body).toPromise();
  }

 
  getAllPMProjectByUserIdForStoryboard(userId:number): any {
    let url_ = environment.apiURL + "/api/services/app/PMStoryBoard/GetAllPMProjectByUserIdForStoryboard?";

    if (userId !== undefined && userId !== null)
      url_ += "id=" + encodeURIComponent("" + userId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllUserByProjectIdForStoryboard(projectId:string, sprintId:string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStoryBoard/GetAllUserByProjectIdForStoryboard?";

    if (projectId !== undefined && projectId !== null)
      url_ += "id=" + encodeURIComponent("" + projectId) + "&";
    if (sprintId !== undefined && sprintId !== null)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}

export class GetPMStoryboardForViewDto {
  projectName: string;
  responsibleName: string;
  statusId: number;
  statusName: string;
  storyId: number;
  storyName: string;
}



