import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
    providedIn: 'root'
})
export class DeploymentDetailsService {

    constructor(private http: HttpClient, private _router: Router) { }


    //#region Get Project
    getAll(filter: string | null | undefined, deploymentManagementNameFilter: string | null | undefined, pMtaskTitleFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DeploymentManagementDetails/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (deploymentManagementNameFilter !== undefined && deploymentManagementNameFilter !== null)
            url_ += "DeploymentManagementNameFilter=" + encodeURIComponent("" + deploymentManagementNameFilter) + "&";
        if (pMtaskTitleFilter !== undefined && pMtaskTitleFilter !== null)
            url_ += "PMtaskTitleFilter=" + encodeURIComponent("" + pMtaskTitleFilter) + "&";
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
    createOrEdit(body: CreateOrEditDeploymentManagementDetailDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DeploymentManagementDetails/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();

    }


    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: string | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DeploymentManagementDetails/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();

    }

    getAllPMtaskForTableDropdown() {
        let url_ = environment.apiURL + "/api/services/app/DeploymentManagementDetails/GetAllPMtaskForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllDeploymentManagementForTableDropdown() {
        let url_ = environment.apiURL + "/api/services/app/DeploymentManagementDetails/GetAllDeploymentManagementForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }


    //#endregion

}
export class CreateOrEditDeploymentManagementDetailDto {
    certified: boolean;
    deploymentId: number;
    taskId: number | undefined;
    id: string | undefined;
}