import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditLawfirmServiceDto } from '../models/Lawfirm/LawfirmServices';

@Injectable({
  providedIn: 'root'
})
export class LawfirmServicesService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, servicesNameFilter: string | null | undefined, maxPriceFilter: number | null | undefined, minPriceFilter: number | null | undefined, activeFilter: number | null | undefined, descriptionFilter: string | null | undefined, lawfirmFeeTypeTypeNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/LawfirmServices/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (servicesNameFilter !== undefined && servicesNameFilter !== null)
        url_ += "ServicesNameFilter=" + encodeURIComponent("" + servicesNameFilter) + "&";
    if (maxPriceFilter !== undefined && maxPriceFilter !== null)
        url_ += "MaxPriceFilter=" + encodeURIComponent("" + maxPriceFilter) + "&";
    if (minPriceFilter !== undefined && minPriceFilter !== null)
        url_ += "MinPriceFilter=" + encodeURIComponent("" + minPriceFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
        url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
        url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (lawfirmFeeTypeTypeNameFilter !== undefined && lawfirmFeeTypeTypeNameFilter !== null)
        url_ += "LawfirmFeeTypeTypeNameFilter=" + encodeURIComponent("" + lawfirmFeeTypeTypeNameFilter) + "&";
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
    let url_ = environment.apiURL + "/api/services/app/LawfirmServices/GetAllLawfirmFeeTypeForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  //#endregion

  //#region CUD

  createOrEdit(body: CreateOrEditLawfirmServiceDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/LawfirmServices/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LawfirmServices/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion



}
