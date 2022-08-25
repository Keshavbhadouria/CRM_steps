import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SprintCreateEditModalComponent } from 'src/app/pages/project-management/sprint/sprint/sprint-create-edit-modal/sprint-create-edit-modal.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PMTaskBoardService {
  constructor(private http: HttpClient, private _router: Router) { }

  getAll(userId: number | null | undefined, projectId: number | null | undefined, sprintId: number | null | undefined, filterText: string,selectedStages: any[]): any {
    let url_ = environment.apiURL + "/api/services/app/PMTaskBoard/LoadDashboardTaskData";

    url_ = url_.replace(/[?&]$/, "");

    var body = {
      "userId":userId,
      "projectId":projectId,
      "sprintId": sprintId,
      "filterText":filterText,
      "selectedStages":selectedStages
    }

    return this.http.post<any>(url_, body).toPromise();
  }

  getAllPMProjectByUserIdForTaskboard(userId:number): any {
    let url_ = environment.apiURL + "/api/services/app/PMTaskBoard/GetAllPMProjectByUserIdForTaskboard?";

    if (userId !== undefined && userId !== null)
      url_ += "id=" + encodeURIComponent("" + userId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllUserByProjectIdForTaskboard(projectId:number, sprintId:number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMTaskBoard/GetAllUserByProjectIdForTaskboard?";

    if (projectId !== undefined && projectId !== null)
      url_ += "id=" + encodeURIComponent("" + projectId) + "&";
    if (sprintId !== undefined && sprintId !== null)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}

export class GetPMTaskboardForViewDto {
  projectName: string;
  responsibleName: string;
  stageId: number;
  stageName: string;
  taskId: number;
  taskName: string;
}



