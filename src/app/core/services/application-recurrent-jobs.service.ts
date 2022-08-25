import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRecurrentJobsService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, jobNameFilter: string | null | undefined, maxRunningAtTimeFilter: Date | null | undefined, minRunningAtTimeFilter: Date | null | undefined, saturdayFilter: number | null | undefined, clientApplicationApplicationNameFilter: string | null | undefined, serverInventoryServerNameFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ApplicationRecurrentJobs/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (jobNameFilter !== undefined && jobNameFilter !== null)
      url_ += "JobNameFilter=" + encodeURIComponent("" + jobNameFilter) + "&";
    if (maxRunningAtTimeFilter !== undefined && maxRunningAtTimeFilter !== null)
      url_ += "MaxRunningAtTimeFilter=" + encodeURIComponent(maxRunningAtTimeFilter ? "" + maxRunningAtTimeFilter : "") + "&";
    if (minRunningAtTimeFilter !== undefined && minRunningAtTimeFilter !== null)
      url_ += "MinRunningAtTimeFilter=" + encodeURIComponent(minRunningAtTimeFilter ? "" + minRunningAtTimeFilter : "") + "&";
    if (saturdayFilter !== undefined && saturdayFilter !== null)
      url_ += "SaturdayFilter=" + encodeURIComponent("" + saturdayFilter) + "&";
    if (clientApplicationApplicationNameFilter !== undefined && clientApplicationApplicationNameFilter !== null)
      url_ += "ClientApplicationApplicationNameFilter=" + encodeURIComponent("" + clientApplicationApplicationNameFilter) + "&";
    if (serverInventoryServerNameFilter !== undefined && serverInventoryServerNameFilter !== null)
      url_ += "ServerInventoryServerNameFilter=" + encodeURIComponent("" + serverInventoryServerNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditApplicationRecurrentJobDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ApplicationRecurrentJobs/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getApplicationRecurrentJobForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ApplicationRecurrentJobs/GetApplicationRecurrentJobForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ApplicationRecurrentJobs/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
  //dropdown
  getAllClientApplicationForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ApplicationRecurrentJobs/GetAllClientApplicationForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllServerInventoryForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ApplicationRecurrentJobs/GetAllServerInventoryForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ApplicationRecurrentJobs/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditApplicationRecurrentJobDto {
  jobName!: string;
  runningAtTime!: Date;
  dayOfTheMonth!: number;
  monday!: boolean;
  tuesday!: boolean;
  wednesday!: boolean;
  thursday!: boolean;
  friday!: boolean;
  saturday!: boolean;
  sunday!: boolean;
  applicationId!: number;
  serverInventoryId!: string;
  responsibleId!: number;
  id!: number | undefined;
}
