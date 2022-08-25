import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppPoliciesService {

    constructor(private http: HttpClient, private _router: Router) { }


  getAll(filter: string | null | undefined, typeFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/AppPolicies/GetAll?";
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

    return this.http.get<any>(url_);
  }

    getAllPoliciesByTenant(): any {
        let url_ = environment.apiURL + "/api/services/app/AppPolicies/GetAllPoliciesByTenant";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }
    getPoliciesByName(name: string | null | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/AppPolicies/GetPoliciesByName?";
        if (name !== undefined && name !== null)
            url_ += "name=" + encodeURIComponent("" + name) + "&";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllPolicies(): any {
        let url_ = environment.apiURL + "/api/services/app/AppPolicies/GetAllPolicies";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }
    //#endregion
    createOrEdit(body: CreateOrEditAppPolicyDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/AppPolicies/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        return this.http.post<any>(url_, body).toPromise();
    }
    delete(id: string | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/AppPolicies/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.delete(url_).toPromise();
    }
}

export class CreateOrEditAppPolicyDto {
    type: string;
    description: string;
    id: string | undefined;
}






