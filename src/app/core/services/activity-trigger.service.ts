import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityTriggersService {

  constructor(private http: HttpClient, private _router: Router) { }

  getAll(filter: string | null | undefined, descriptionFilter: string | null | undefined, statusFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ActivityTriggers/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
        url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (statusFilter !== undefined && statusFilter !== null)
        url_ += "StatusFilter=" + encodeURIComponent("" + statusFilter) + "&";
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



  createOrEdit(body: CreateOrEditActivityTriggerDto | undefined): any{
    let url_ = environment.apiURL + "/api/services/app/ActivityTriggers/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");


    const content_ = JSON.stringify(body);
      return this.http.post<any>(url_, body).toPromise();
  }


  delete(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ActivityTriggers/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();
  }

 
  //#endregion

}


export class CreateOrEditActivityTriggerDto {
    description: string;
    status: boolean;
    id: string | undefined;
}




