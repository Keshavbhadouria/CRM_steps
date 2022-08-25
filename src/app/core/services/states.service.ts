import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private http: HttpClient, private _router: Router) { }

  getAll(filter: string | null | undefined, stateNameFilter: string | null | undefined, isActiveFilter: number | null | undefined, cRMCountryCountryNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMStates/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (stateNameFilter !== undefined && stateNameFilter !== null)
        url_ += "StateNameFilter=" + encodeURIComponent("" + stateNameFilter) + "&";
    if (isActiveFilter !== undefined && isActiveFilter !== null)
        url_ += "IsActiveFilter=" + encodeURIComponent("" + isActiveFilter) + "&";
    if (cRMCountryCountryNameFilter !== undefined && cRMCountryCountryNameFilter !== null)
        url_ += "CRMCountryCountryNameFilter=" + encodeURIComponent("" + cRMCountryCountryNameFilter) + "&";
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



  createOrEdit(body: CreateOrEditCRMStateDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMStates/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);
      return this.http.post<any>(url_, body).toPromise();
  }


  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMStates/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();
  }

  getAllCRMCountryForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/CRMStates/GetAllCRMCountryForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  //#endregion

}

export class CreateOrEditCRMStateDto {
    stateName: string;
    isActive: boolean;
    crmCountryId: number;
    id: number | undefined;
}




