import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditEpicDto } from '../models/Project/CreateOrEditEpic';

@Injectable({
  providedIn: 'root'
})
export class EpicService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get Epic Status

  getAll(filter: string | null | undefined, nameFilter: string | null | undefined, descriptionFilter: string | null | undefined, businessOutcomeHypotesisFilter: string | null | undefined, inScopeFilter: string | null | undefined, outScopeFilter: string | null | undefined, noFunctionalRequirementsFilter: string | null | undefined, mVP_FeaturesFilter: string | null | undefined, additionalPotentialFeaturesFilter: string | null | undefined, analysisSummaryFilter: string | null | undefined, userAffectedFilter: string | null | undefined, businessImpactFilter: string | null | undefined, pMProjectProjectNameFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, pMEpicStatusStatusFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined, projectId: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Epics/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (nameFilter !== undefined && nameFilter !== null)
        url_ += "NameFilter=" + encodeURIComponent("" + nameFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
        url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (businessOutcomeHypotesisFilter !== undefined && businessOutcomeHypotesisFilter !== null)
        url_ += "BusinessOutcomeHypotesisFilter=" + encodeURIComponent("" + businessOutcomeHypotesisFilter) + "&";
    if (inScopeFilter !== undefined && inScopeFilter !== null)
        url_ += "InScopeFilter=" + encodeURIComponent("" + inScopeFilter) + "&";
    if (outScopeFilter !== undefined && outScopeFilter !== null)
        url_ += "OutScopeFilter=" + encodeURIComponent("" + outScopeFilter) + "&";
    if (noFunctionalRequirementsFilter !== undefined && noFunctionalRequirementsFilter !== null)
        url_ += "NoFunctionalRequirementsFilter=" + encodeURIComponent("" + noFunctionalRequirementsFilter) + "&";
    if (mVP_FeaturesFilter !== undefined && mVP_FeaturesFilter !== null)
        url_ += "MVP_FeaturesFilter=" + encodeURIComponent("" + mVP_FeaturesFilter) + "&";
    if (additionalPotentialFeaturesFilter !== undefined && additionalPotentialFeaturesFilter !== null)
        url_ += "AdditionalPotentialFeaturesFilter=" + encodeURIComponent("" + additionalPotentialFeaturesFilter) + "&";
    if (analysisSummaryFilter !== undefined && analysisSummaryFilter !== null)
        url_ += "AnalysisSummaryFilter=" + encodeURIComponent("" + analysisSummaryFilter) + "&";
    if (userAffectedFilter !== undefined && userAffectedFilter !== null)
        url_ += "UserAffectedFilter=" + encodeURIComponent("" + userAffectedFilter) + "&";
    if (businessImpactFilter !== undefined && businessImpactFilter !== null)
        url_ += "BusinessImpactFilter=" + encodeURIComponent("" + businessImpactFilter) + "&";
    if (pMProjectProjectNameFilter !== undefined && pMProjectProjectNameFilter !== null)
        url_ += "PMProjectProjectNameFilter=" + encodeURIComponent("" + pMProjectProjectNameFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
        url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (pMEpicStatusStatusFilter !== undefined && pMEpicStatusStatusFilter !== null)
        url_ += "PMEpicStatusStatusFilter=" + encodeURIComponent("" + pMEpicStatusStatusFilter) + "&";
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

    if (projectId === null)
      url_ += "projectId=0&";
    else if (projectId !== undefined)
        url_ += "projectId=" + projectId + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllEpicForTableDropdown(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Epics/GetAllEpicForTableDropdown?";
    if (id !== undefined && id !== null)
      url_ += "projectId=" + encodeURIComponent("" + id) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllPMEpicStatusForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/Epics/GetAllPMEpicStatusForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllContactForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllContactForLookupTable?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
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


  getAllPMProjectForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Epics/GetAllPMProjectForLookupTable?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
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



  //#endregion

  //#region CUD Epic Status

  createOrEdit(body: CreateOrEditEpicDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Epics/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Epics/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion

}
