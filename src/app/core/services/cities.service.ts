import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditContactDto } from '../models/Customer/Contact';
import { CreateOrEditContactObjectionDto, GetObjectionEntityForViewDto } from '../models/Customer/ContactObjection';
import { DropdownDto } from '../models/Project/CreateOrEditPMProject';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient, private _router: Router) { }

  getAll(filter: string | null | undefined, cityNameFilter: string | null | undefined, isActiveFilter: number | null | undefined, cRMStateStateNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCities/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (cityNameFilter !== undefined && cityNameFilter !== null)
        url_ += "CityNameFilter=" + encodeURIComponent("" + cityNameFilter) + "&";
    if (isActiveFilter !== undefined && isActiveFilter !== null)
        url_ += "IsActiveFilter=" + encodeURIComponent("" + isActiveFilter) + "&";
    if (cRMStateStateNameFilter !== undefined && cRMStateStateNameFilter !== null)
        url_ += "CRMStateStateNameFilter=" + encodeURIComponent("" + cRMStateStateNameFilter) + "&";
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



  createOrEdit(body: CreateOrEditCRMCityDto | undefined):any {
    let url_ = environment.apiURL + "/api/services/app/CRMCities/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);
      return this.http.post<any>(url_, body).toPromise();
  }


  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCities/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();
  }

  getAllCRMStateForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/CRMCities/GetAllCRMStateForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  //#endregion

}

export class CreateOrEditCRMCityDto {
    cityName: string;
    isActive: boolean;
    crmStateId: number;
    id: number | undefined;
}




