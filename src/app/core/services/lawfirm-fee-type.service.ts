import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditLawfirmFeeTypeDto } from '../models/Lawfirm/LawfirmFeeType';

@Injectable({
  providedIn: 'root'
})
export class LawfirmFeeTypeService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, typeNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/LawfirmFeeTypes/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (typeNameFilter !== undefined && typeNameFilter !== null)
        url_ += "TypeNameFilter=" + encodeURIComponent("" + typeNameFilter) + "&";
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


  // getAllPMEpicStatusForTableDropdown() {
  //   let url_ = environment.apiURL + "/api/services/app/Epics/GetAllPMEpicStatusForTableDropdown";
  //   url_ = url_.replace(/[?&]$/, "");
  //   return this.http.get<any>(url_).toPromise();
  // }

  // getAllContactForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
  //   let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllContactForLookupTable?";
  //   if (filter !== undefined && filter !== null)
  //     url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
  //   if (sorting !== undefined && sorting !== null)
  //     url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
  //   if (skipCount === null)
  //     throw new Error("The parameter 'skipCount' cannot be null.");
  //   else if (skipCount !== undefined)
  //     url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
  //   if (maxResultCount === null)
  //     throw new Error("The parameter 'maxResultCount' cannot be null.");
  //   else if (maxResultCount !== undefined)
  //     url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
  //   url_ = url_.replace(/[?&]$/, "");

  //   return this.http.get<any>(url_).toPromise();
  // }


//   getAllPMProjectForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
//     let url_ = environment.apiURL + "/api/services/app/Epics/GetAllPMProjectForLookupTable?";
//     if (filter !== undefined && filter !== null)
//         url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
//     if (sorting !== undefined && sorting !== null)
//         url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
//     if (skipCount === null)
//         throw new Error("The parameter 'skipCount' cannot be null.");
//     else if (skipCount !== undefined)
//         url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
//     if (maxResultCount === null)
//         throw new Error("The parameter 'maxResultCount' cannot be null.");
//     else if (maxResultCount !== undefined)
//         url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
//     url_ = url_.replace(/[?&]$/, "");

//     return this.http.get<any>(url_).toPromise();
// }



  //#endregion

  //#region CUD

  createOrEdit(body: CreateOrEditLawfirmFeeTypeDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/LawfirmFeeTypes/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LawfirmFeeTypes/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion

}
