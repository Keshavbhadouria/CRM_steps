import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeDoctorService {

  constructor(private http: HttpClient) { }

  getTimeDoctorData(body: WorkLogFilterDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TimeDoctor/GetTimeDoctorData";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getManualTrackedData(body: WorkLogFilterDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetDataForManualTracking";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getWorkLogRequest(companyId: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TimeDoctor/GetWorkLogRequest?";
    if (companyId === null)
      throw new Error("The parameter 'companyId' cannot be null.");
    else if (companyId !== undefined)
      url_ += "companyId=" + encodeURIComponent("" + companyId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getUsers(token: string, companyId: string): any {
    let url_ = environment.apiURL + "/api/services/app/TimeDoctor/GetUsersByCompany?";
    if (token === null)
      throw new Error("The parameter 'companyId' cannot be null.");
    else if (token !== undefined)
      url_ += "token=" + encodeURIComponent("" + token) + "&";

    if (companyId === null)
      throw new Error("The parameter 'companyId' cannot be null.");
    else if (companyId !== undefined)
      url_ += "companyId=" + encodeURIComponent("" + companyId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getProjectMembers(projectId: any): any {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetProjectMembers?";
    if (projectId === null)
      throw new Error("The parameter 'companyId' cannot be null.");
    else if (projectId !== undefined)
      url_ += "projectId=" + encodeURIComponent("" + projectId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}
export class WorkLogFilterDto {
  from!: string | undefined;
  to!: string | undefined;
  userId!: string | undefined;
  projectName!: string | undefined;
  companyId!: string | undefined;
  groupByType!: number;
  readToken!: string | undefined;
  taskId!: string | undefined;
  projectId!: number | undefined;
  users!: string[] | undefined;
}

export class WorkLogByDates {
  dateRange!: string | undefined;
  workLogs!: WorkLogByUser[] | undefined;
}

export class WorkLogByUser {
  userName!: string | undefined;
  groupByType!: number;
  totalUserTime!: string | undefined;
  userData!: ProjectTaskDto[] | undefined;
}

export class ProjectTaskDto {
  projectName!: string | undefined;
  projectId!: string | undefined;
  taskName!: string | undefined;
  taskId!: string | undefined;
  totalHour!: string | undefined;
  order!: number;
  totalTimeSpentInProject!: number;
  userId!: string | undefined;
  userName!: string | undefined;
}

export class WorkLogRequestDto {

}