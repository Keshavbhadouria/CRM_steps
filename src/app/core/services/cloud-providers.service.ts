import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
    providedIn: 'root'
})
export class CloudProvidersService {

    constructor(private http: HttpClient, private _router: Router) { }


    //#region Get Project
    getAll(filter: string | null | undefined, nameFilter: string | null | undefined, activeFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/CloudProviders/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (nameFilter !== undefined && nameFilter !== null)
            url_ += "NameFilter=" + encodeURIComponent("" + nameFilter) + "&";
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
     * @param body (optional)
     * @return Success
     */
     createOrEdit(body: CreateOrEditCloudProviderDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/CloudProviders/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();

    }


    /**
     * @param id (optional)
     * @return Success
     */
     delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/CloudProviders/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();

    }

   


    //#endregion

}
export class CreateOrEditCloudProviderDto {
    name: string;
    active: boolean;
    id: number | undefined;
}