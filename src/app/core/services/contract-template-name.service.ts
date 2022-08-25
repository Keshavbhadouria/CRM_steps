import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditLawfirmServiceDto } from '../models/Lawfirm/LawfirmServices';
import { CreateOrEditContracTemplateNameDto } from '../models/Retainer/ContractTemplateName';

@Injectable({
  providedIn: 'root'
})
export class ContractTemplateNameService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

 getAll(filter: string | null | undefined, contractNameFilter: string | null | undefined, activeFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
        let url_ = environment.apiURL + "/api/services/app/ContracTemplateNames/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (contractNameFilter !== undefined && contractNameFilter !== null)
            url_ += "ContractNameFilter=" + encodeURIComponent("" + contractNameFilter) + "&";
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

  getAllLawfirmFeeTypeForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/LawfirmServices/GetAllLawfirmFeeTypeForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  //#endregion

  //#region CUD

  createOrEdit(body: CreateOrEditContracTemplateNameDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContracTemplateNames/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContracTemplateNames/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion



}
