import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditServiceActivityDto } from '../models/Lawfirm/ServiceActivities';
import { CreateOrEditStepDocumentsDto } from '../models/Lawfirm/StepDocuments';

@Injectable({
  providedIn: 'root'
})
export class StepDocumentService {



  serviceId: number;
  serviceName: string;
  activityId: number;
  activityName: string;
  stepId: number;
  stepName: string;


  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get Epic Status

  getAll(filter: string | null | undefined, documentFilter: string | null | undefined, uploadByClientOrDeliverByLawyerFilter: number | null | undefined, notifyAdminFilter: number | null | undefined, notifyCustomerFilter: number | null | undefined, notifyLaywerFilter: number | null | undefined, maxFeeFilter: number | null | undefined, minFeeFilter: number | null | undefined, servicesActivityStepStepFilter: string | null | undefined, lawfirmFeeTypeTypeNameFilter: string | null | undefined, lawfirmServiceServicesNameFilter: string | null | undefined, serviceActivityActivityNameFilter: string | null | undefined, lawfirmStepId: number | null | undefined, lawfirmActivityId: number | null | undefined, lawfirmServicesId: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/StepDocumentses/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (documentFilter !== undefined && documentFilter !== null)
        url_ += "DocumentFilter=" + encodeURIComponent("" + documentFilter) + "&";
    if (uploadByClientOrDeliverByLawyerFilter !== undefined && uploadByClientOrDeliverByLawyerFilter !== null)
        url_ += "UploadByClientOrDeliverByLawyerFilter=" + encodeURIComponent("" + uploadByClientOrDeliverByLawyerFilter) + "&";
    if (notifyAdminFilter !== undefined && notifyAdminFilter !== null)
        url_ += "NotifyAdminFilter=" + encodeURIComponent("" + notifyAdminFilter) + "&";
    if (notifyCustomerFilter !== undefined && notifyCustomerFilter !== null)
        url_ += "NotifyCustomerFilter=" + encodeURIComponent("" + notifyCustomerFilter) + "&";
    if (notifyLaywerFilter !== undefined && notifyLaywerFilter !== null)
        url_ += "NotifyLaywerFilter=" + encodeURIComponent("" + notifyLaywerFilter) + "&";
    if (maxFeeFilter !== undefined && maxFeeFilter !== null)
        url_ += "MaxFeeFilter=" + encodeURIComponent("" + maxFeeFilter) + "&";
    if (minFeeFilter !== undefined && minFeeFilter !== null)
        url_ += "MinFeeFilter=" + encodeURIComponent("" + minFeeFilter) + "&";
    if (servicesActivityStepStepFilter !== undefined && servicesActivityStepStepFilter !== null)
        url_ += "ServicesActivityStepStepFilter=" + encodeURIComponent("" + servicesActivityStepStepFilter) + "&";
    if (lawfirmFeeTypeTypeNameFilter !== undefined && lawfirmFeeTypeTypeNameFilter !== null)
        url_ += "LawfirmFeeTypeTypeNameFilter=" + encodeURIComponent("" + lawfirmFeeTypeTypeNameFilter) + "&";
    if (lawfirmServiceServicesNameFilter !== undefined && lawfirmServiceServicesNameFilter !== null)
        url_ += "LawfirmServiceServicesNameFilter=" + encodeURIComponent("" + lawfirmServiceServicesNameFilter) + "&";
    if (serviceActivityActivityNameFilter !== undefined && serviceActivityActivityNameFilter !== null)
        url_ += "ServiceActivityActivityNameFilter=" + encodeURIComponent("" + serviceActivityActivityNameFilter) + "&";
    if (lawfirmStepId !== undefined && lawfirmStepId !== null)
        url_ += "LawfirmStepId=" + encodeURIComponent("" + lawfirmStepId) + "&";
    if (lawfirmActivityId !== undefined && lawfirmActivityId !== null)
        url_ += "LawfirmActivityId=" + encodeURIComponent("" + lawfirmActivityId) + "&";
    if (lawfirmServicesId !== undefined && lawfirmServicesId !== null)
        url_ += "LawfirmServicesId=" + encodeURIComponent("" + lawfirmServicesId) + "&";
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

  getAllLawfirmFeeTypeForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/StepDocumentses/GetAllLawfirmFeeTypeForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  //#endregion

  //#region CUD

  createOrEdit(body: CreateOrEditStepDocumentsDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/StepDocumentses/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/StepDocumentses/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion

}
