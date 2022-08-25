import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
  providedIn: 'root'
})
export class OnlineToolsService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get Project

    /**
     * @param filter (optional)
     * @param uRLFilter (optional)
     * @param serviceNameFilter (optional)
     * @param descriptionFilter (optional)
     * @param usernameFilter (optional)
     * @param passwordFilter (optional)
     * @param maxMonthlyFeeFilter (optional)
     * @param minMonthlyFeeFilter (optional)
     * @param activeFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | null | undefined, uRLFilter: string | null | undefined, serviceNameFilter: string | null | undefined, descriptionFilter: string | null | undefined, usernameFilter: string | null | undefined, passwordFilter: string | null | undefined, maxMonthlyFeeFilter: number | null | undefined, minMonthlyFeeFilter: number | null | undefined, activeFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/OnlineToolses/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (uRLFilter !== undefined && uRLFilter !== null)
            url_ += "URLFilter=" + encodeURIComponent("" + uRLFilter) + "&";
        if (serviceNameFilter !== undefined && serviceNameFilter !== null)
            url_ += "ServiceNameFilter=" + encodeURIComponent("" + serviceNameFilter) + "&";
        if (descriptionFilter !== undefined && descriptionFilter !== null)
            url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
        if (usernameFilter !== undefined && usernameFilter !== null)
            url_ += "UsernameFilter=" + encodeURIComponent("" + usernameFilter) + "&";
        if (passwordFilter !== undefined && passwordFilter !== null)
            url_ += "PasswordFilter=" + encodeURIComponent("" + passwordFilter) + "&";
        if (maxMonthlyFeeFilter !== undefined && maxMonthlyFeeFilter !== null)
            url_ += "MaxMonthlyFeeFilter=" + encodeURIComponent("" + maxMonthlyFeeFilter) + "&";
        if (minMonthlyFeeFilter !== undefined && minMonthlyFeeFilter !== null)
            url_ += "MinMonthlyFeeFilter=" + encodeURIComponent("" + minMonthlyFeeFilter) + "&";
        if (activeFilter !== undefined && activeFilter !== null)
            url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
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

    
    /**
     * @param id (optional)
     * @return Success
     */
    
    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditOnlineToolsDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/OnlineToolses/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.post<any>(url_, body).toPromise();
    }

  

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: string | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/OnlineToolses/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }
}

export class CreateOrEditOnlineToolsDto {
  url!: string;
  serviceName!: string;
  description!: string | undefined;
  username!: string | undefined;
  password!: string | undefined;
  monthlyFee!: number;
  active!: boolean;
  id!: string | undefined;
}