import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobDescriptionService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, titleFilter: string | null | undefined, descriptionFilter: string | null | undefined, functionsFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/JobDescriptions/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
        url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
        url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (functionsFilter !== undefined && functionsFilter !== null)
        url_ += "FunctionsFilter=" + encodeURIComponent("" + functionsFilter) + "&";
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

  createOrEdit(body: CreateOrEditJobDescriptionDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/JobDescriptions/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

 

  delete(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/JobDescriptions/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  getAllUserForTableDropdown():any {
    let url_ = environment.apiURL + "/api/services/app/JobDescriptions/GetAllUserForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
 
  //dropdown
 
}

export class CreateOrEditJobDescriptionDto {
  title: string;
  description: string | undefined;
  functions: string | undefined;
  directSupervisor: number | undefined;
  id: string | undefined;
}
