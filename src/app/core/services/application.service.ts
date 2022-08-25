import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

    constructor(private http: HttpClient) { }
    getAll(filter: string | null | undefined, applicationNameFilter: string | null | undefined, domainNameFilter: string | null | undefined, maxSLAHoursFilter: number | null | undefined, minSLAHoursFilter: number | null | undefined, liveEnvironmentDetailFilter: string | null | undefined, qualityAssuranceEnvironmentFilter: string | null | undefined, certificationEnvironmentFilter: string | null | undefined, pMProjectProjectNameFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, userNameFilter: string | null | undefined, serverInventoryServerNameFilter: string | null | undefined, clientApplicationStatusStatusNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ClientApplications/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (applicationNameFilter !== undefined && applicationNameFilter !== null)
            url_ += "ApplicationNameFilter=" + encodeURIComponent("" + applicationNameFilter) + "&";
        if (domainNameFilter !== undefined && domainNameFilter !== null)
            url_ += "DomainNameFilter=" + encodeURIComponent("" + domainNameFilter) + "&";
        if (maxSLAHoursFilter !== undefined && maxSLAHoursFilter !== null)
            url_ += "MaxSLAHoursFilter=" + encodeURIComponent("" + maxSLAHoursFilter) + "&";
        if (minSLAHoursFilter !== undefined && minSLAHoursFilter !== null)
            url_ += "MinSLAHoursFilter=" + encodeURIComponent("" + minSLAHoursFilter) + "&";
        if (liveEnvironmentDetailFilter !== undefined && liveEnvironmentDetailFilter !== null)
            url_ += "LiveEnvironmentDetailFilter=" + encodeURIComponent("" + liveEnvironmentDetailFilter) + "&";
        if (qualityAssuranceEnvironmentFilter !== undefined && qualityAssuranceEnvironmentFilter !== null)
            url_ += "QualityAssuranceEnvironmentFilter=" + encodeURIComponent("" + qualityAssuranceEnvironmentFilter) + "&";
        if (certificationEnvironmentFilter !== undefined && certificationEnvironmentFilter !== null)
            url_ += "CertificationEnvironmentFilter=" + encodeURIComponent("" + certificationEnvironmentFilter) + "&";
        if (pMProjectProjectNameFilter !== undefined && pMProjectProjectNameFilter !== null)
            url_ += "PMProjectProjectNameFilter=" + encodeURIComponent("" + pMProjectProjectNameFilter) + "&";
        if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
            url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
        if (userNameFilter !== undefined && userNameFilter !== null)
            url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
        if (serverInventoryServerNameFilter !== undefined && serverInventoryServerNameFilter !== null)
            url_ += "ServerInventoryServerNameFilter=" + encodeURIComponent("" + serverInventoryServerNameFilter) + "&";
        if (clientApplicationStatusStatusNameFilter !== undefined && clientApplicationStatusStatusNameFilter !== null)
            url_ += "ClientApplicationStatusStatusNameFilter=" + encodeURIComponent("" + clientApplicationStatusStatusNameFilter) + "&";
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
    createOrEdit(body: CreateOrEditClientApplicationDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ClientApplications/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }
    delete(id: number | undefined):any {
        let url_ = environment.apiURL + "/api/services/app/ClientApplications/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }

    getAllPMProjectForTableDropdown(){
        let url_ = environment.apiURL + "/api/services/app/ClientApplications/GetAllPMProjectForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllServerInventoryForTableDropdown(){
        let url_ = environment.apiURL + "/api/services/app/ClientApplications/GetAllServerInventoryForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllContactForTableDropdown(){
        let url_ = environment.apiURL + "/api/services/app/ClientApplications/GetAllContactForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllUserForTableDropdown(){
        let url_ = environment.apiURL + "/api/services/app/ClientApplications/GetAllUserForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllClientApplicationStatusForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/ClientApplications/GetAllClientApplicationStatusForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }


}
export class CreateOrEditClientApplicationDto {
    applicationName: string;
    description: string | undefined;
    domainName: string | undefined;
    slaHours: number;
    devEnvironmentDetail: string | undefined;
    liveEnvironmentDetail: string | undefined;
    qualityAssuranceEnvironment: string | undefined;
    certificationEnvironment: string | undefined;
    projectId: number;
    contactId: number | undefined;
    responsibleId: number;
    serverId: string;
    statusId: number;
    id: number | undefined;
}