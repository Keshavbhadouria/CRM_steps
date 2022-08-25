import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrEditPMSprintStatusDto, CreateOrEditPMSprintTypeDto } from '../models/Project/Sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintTypesService {

  constructor(private http: HttpClient, private _router: Router) { }

 //#region Get Epic Status

 getAll(filter: string | null | undefined, typeFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
  let url_ = environment.apiURL + "/api/services/app/PMSprintTypes/GetAll?";
  if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
  if (typeFilter !== undefined && typeFilter !== null)
      url_ += "TypeFilter=" + encodeURIComponent("" + typeFilter) + "&";
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

//#endregion

 //#region CUD Epic Status

 createOrEdit(body: CreateOrEditPMSprintTypeDto | undefined) {
  let url_ = environment.apiURL + "/api/services/app/PMSprintTypes/CreateOrEdit";
  url_ = url_.replace(/[?&]$/, "");

  const content_ = JSON.stringify(body);
  return this.http.post<any>(url_, body).toPromise();
}

delete(id: number | undefined): any {
  let url_ = environment.apiURL + "/api/services/app/PMSprintTypes/Delete?";
  if (id === null)
    throw new Error("The parameter 'id' cannot be null.");
  else if (id !== undefined)
    url_ += "Id=" + encodeURIComponent("" + id) + "&";
  url_ = url_.replace(/[?&]$/, "");

  return this.http.delete(url_).toPromise();

}


//#endregion


}
