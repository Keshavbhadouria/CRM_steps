import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
    providedIn: 'root'
})
export class ServersService {

    constructor(private http: HttpClient, private _router: Router) { }


    //#region Get Project
    getAll(filter: string | null | undefined, serverNameFilter: string | null | undefined, serverDomainsFilter: string | null | undefined, iPsFilter: string | null | undefined, activePortsFilter: string | null | undefined, activeFilter: number | null | undefined, administratorFilter: string | null | undefined, adminPasswordFilter: string | null | undefined, cloudProviderNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ServerInventories/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (serverNameFilter !== undefined && serverNameFilter !== null)
            url_ += "ServerNameFilter=" + encodeURIComponent("" + serverNameFilter) + "&";
        if (serverDomainsFilter !== undefined && serverDomainsFilter !== null)
            url_ += "ServerDomainsFilter=" + encodeURIComponent("" + serverDomainsFilter) + "&";
        if (iPsFilter !== undefined && iPsFilter !== null)
            url_ += "IPsFilter=" + encodeURIComponent("" + iPsFilter) + "&";
        if (activePortsFilter !== undefined && activePortsFilter !== null)
            url_ += "ActivePortsFilter=" + encodeURIComponent("" + activePortsFilter) + "&";
        if (activeFilter !== undefined && activeFilter !== null)
            url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
        if (administratorFilter !== undefined && administratorFilter !== null)
            url_ += "AdministratorFilter=" + encodeURIComponent("" + administratorFilter) + "&";
        if (adminPasswordFilter !== undefined && adminPasswordFilter !== null)
            url_ += "AdminPasswordFilter=" + encodeURIComponent("" + adminPasswordFilter) + "&";
        if (cloudProviderNameFilter !== undefined && cloudProviderNameFilter !== null)
            url_ += "CloudProviderNameFilter=" + encodeURIComponent("" + cloudProviderNameFilter) + "&";
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
     createOrEdit(body: CreateOrEditServerInventoryDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ServerInventories/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.post<any>(url_, body).toPromise();

    }


    /**
     * @param id (optional)
     * @return Success
     */
     delete(id: string | undefined): any {
        let url_ =environment.apiURL + "/api/services/app/ServerInventories/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();

    }

    getAllCloudProviderForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/ServerInventories/GetAllCloudProviderForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.get<any>(url_).toPromise();
      }


    //#endregion

}
export class CreateOrEditServerInventoryDto {
    serverName: string;
    serverDomains: string;
    iPs: string;
    activePorts: string | undefined;
    cpu: string;
    ramgb: string | undefined;
    discGB: string | undefined;
    active: boolean;
    administrator: string;
    adminPassword: string | undefined;
    cloudProviderId: number;
    id: string | undefined;
}