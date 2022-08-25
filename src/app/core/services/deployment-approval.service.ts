import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
    providedIn: 'root'
})
export class DeploymentApprovalService {

    constructor(private http: HttpClient, private _router: Router) { }


    //#region Get Project


    /**
     * @param filter (optional)
     * @param nameFilter (optional)
     * @param maxReleaseDateFilter (optional)
     * @param minReleaseDateFilter (optional)
     * @param clientApplicationApplicationNameFilter (optional)
     * @param userNameFilter (optional)
     * @param pMProjectProjectNameFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | null | undefined, approvalSignatureFilter: string | null | undefined, signatureCompletedFilter: number | null | undefined, deploymentManagementNameFilter: string | null | undefined, roleNameFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DeploymentApprovalProcesses/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (approvalSignatureFilter !== undefined && approvalSignatureFilter !== null)
            url_ += "ApprovalSignatureFilter=" + encodeURIComponent("" + approvalSignatureFilter) + "&";
        if (signatureCompletedFilter !== undefined && signatureCompletedFilter !== null)
            url_ += "SignatureCompletedFilter=" + encodeURIComponent("" + signatureCompletedFilter) + "&";
        if (deploymentManagementNameFilter !== undefined && deploymentManagementNameFilter !== null)
            url_ += "DeploymentManagementNameFilter=" + encodeURIComponent("" + deploymentManagementNameFilter) + "&";
        if (roleNameFilter !== undefined && roleNameFilter !== null)
            url_ += "RoleNameFilter=" + encodeURIComponent("" + roleNameFilter) + "&";
        if (userNameFilter !== undefined && userNameFilter !== null)
            url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
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
    createOrEdit(body: CreateOrEditDeploymentApprovalProcessDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DeploymentApprovalProcesses/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);


        return this.http.post<any>(url_, body).toPromise();
    }


    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: string | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DeploymentApprovalProcesses/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }



    getAllUserForTableDropdown() {
        let url_ = environment.apiURL + "/api/services/app/DeploymentApprovalProcesses/GetAllUserForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }


    getAllRoleForTableDropdown() {
        let url_ = environment.apiURL + "/api/services/app/DeploymentApprovalProcesses/GetAllRoleForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllDeploymentManagementForTableDropdown() {
        let url_ = environment.apiURL + "/api/services/app/DeploymentApprovalProcesses/GetAllDeploymentManagementForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }
    //#endregion

}
export class CreateOrEditDeploymentApprovalProcessDto {
    approvalOrder: number;
    approvalDate: Date;
    approvalSignature: string | undefined;
    signatureCompleted: boolean;
    deployment: number;
    role: number;
    approvedBy: number | undefined;
    id: string | undefined;
}