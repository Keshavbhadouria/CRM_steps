import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
  providedIn: 'root'
})
export class DeploymentManagementService {

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
    getAll(filter: string | null | undefined, nameFilter: string | null | undefined, maxReleaseDateFilter: moment.Moment | null | undefined, minReleaseDateFilter: moment.Moment | null | undefined, clientApplicationApplicationNameFilter: string | null | undefined, userNameFilter: string | null | undefined, pMProjectProjectNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined):any {
        let url_ = environment.apiURL + "/api/services/app/DeploymentManagements/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (nameFilter !== undefined && nameFilter !== null)
            url_ += "NameFilter=" + encodeURIComponent("" + nameFilter) + "&";
        if (maxReleaseDateFilter !== undefined && maxReleaseDateFilter !== null)
            url_ += "MaxReleaseDateFilter=" + encodeURIComponent(maxReleaseDateFilter ? "" + maxReleaseDateFilter.toJSON() : "") + "&";
        if (minReleaseDateFilter !== undefined && minReleaseDateFilter !== null)
            url_ += "MinReleaseDateFilter=" + encodeURIComponent(minReleaseDateFilter ? "" + minReleaseDateFilter.toJSON() : "") + "&";
        if (clientApplicationApplicationNameFilter !== undefined && clientApplicationApplicationNameFilter !== null)
            url_ += "ClientApplicationApplicationNameFilter=" + encodeURIComponent("" + clientApplicationApplicationNameFilter) + "&";
        if (userNameFilter !== undefined && userNameFilter !== null)
            url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
        if (pMProjectProjectNameFilter !== undefined && pMProjectProjectNameFilter !== null)
            url_ += "PMProjectProjectNameFilter=" + encodeURIComponent("" + pMProjectProjectNameFilter) + "&";
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
    createOrEdit(body: CreateOrEditDeploymentManagementDto | undefined): any{
        let url_ = environment.apiURL + "/api/services/app/DeploymentManagements/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        return this.http.post<any>(url_, body).toPromise();
    }

   
    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DeploymentManagements/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }

 

    getAllClientApplicationForTableDropdown() {
      let url_ = environment.apiURL + "/api/services/app/DeploymentManagements/GetAllClientApplicationForTableDropdown";
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get<any>(url_).toPromise();
    }

    getAllUserForTableDropdown() {
      let url_ = environment.apiURL + "/api/services/app/DeploymentManagements/GetAllUserForTableDropdown";
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get<any>(url_).toPromise();
    }
    getAllPMProjectForTableDropdown() {
      let url_ = environment.apiURL + "/api/services/app/DeploymentManagements/GetAllPMProjectForTableDropdown";
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get<any>(url_).toPromise();
    }


  //#endregion

}
export class CreateOrEditDeploymentManagementDto {
  name: string;
  releaseDate: Date;
  deploymentProcess: string;
  revertProcess: string | undefined;
  approved: boolean;
  application: number;
  responsible: number;
  project: number | undefined;
  id: number | undefined;
}