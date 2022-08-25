import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient, private _router: Router) { }

  getAll(filter: string | null | undefined, countryNameFilter: string | null | undefined, countryCodeFilter: string | null | undefined, isActiveFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCountries/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (countryNameFilter !== undefined && countryNameFilter !== null)
        url_ += "CountryNameFilter=" + encodeURIComponent("" + countryNameFilter) + "&";
    if (countryCodeFilter !== undefined && countryCodeFilter !== null)
        url_ += "CountryCodeFilter=" + encodeURIComponent("" + countryCodeFilter) + "&";
    if (isActiveFilter !== undefined && isActiveFilter !== null)
        url_ += "IsActiveFilter=" + encodeURIComponent("" + isActiveFilter) + "&";
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



  createOrEdit(body: CreateOrEditCRMCountryDto | undefined): any {
    
    let url_ = environment.apiURL + "/api/services/app/CRMCountries/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);
      return this.http.post<any>(url_, body).toPromise();
  }


  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CRMCountries/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();
  }


  //#endregion

}
export class CreateOrEditCRMCountryDto {
  countryName: string;
  countryCode: string | undefined;
  isActive: boolean;
  id: number | undefined;
}




