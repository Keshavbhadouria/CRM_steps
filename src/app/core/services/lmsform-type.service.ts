import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LMSFormTypeService {

  constructor(private _httpClient: HttpClient) { }

  getAll(filter: string | null | undefined, nameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LMSFormTypes/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (nameFilter !== undefined && nameFilter !== null)
      url_ += "NameFilter=" + encodeURIComponent("" + nameFilter) + "&";
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

    return this._httpClient.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditLMSFormTypeDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LMSFormTypes/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.post<any>(url_, body).toPromise();
  }

  getLMSFormTypeForEdit(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LMSFormTypes/GetLMSFormTypeForEdit?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this._httpClient.get<any>(url_).toPromise();
}


  delete(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LMSFormTypes/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this._httpClient.delete<any>(url_).toPromise();
  }
}
export class CreateOrEditLMSFormTypeDto {
    name: string;
    id: string | undefined;
}