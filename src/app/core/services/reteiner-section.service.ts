import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReteinerSectionService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, maxSortIndexFilter: number | null | undefined, minSortIndexFilter: number | null | undefined, paragraphNoFilter: string | null | undefined, contractSectionTitleFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ReteinerSectionses/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxSortIndexFilter !== undefined && maxSortIndexFilter !== null)
      url_ += "MaxSortIndexFilter=" + encodeURIComponent("" + maxSortIndexFilter) + "&";
    if (minSortIndexFilter !== undefined && minSortIndexFilter !== null)
      url_ += "MinSortIndexFilter=" + encodeURIComponent("" + minSortIndexFilter) + "&";
    if (paragraphNoFilter !== undefined && paragraphNoFilter !== null)
      url_ += "ParagraphNoFilter=" + encodeURIComponent("" + paragraphNoFilter) + "&";
    if (contractSectionTitleFilter !== undefined && contractSectionTitleFilter !== null)
      url_ += "ContractSectionTitleFilter=" + encodeURIComponent("" + contractSectionTitleFilter) + "&";
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

  createOrEdit(body: CreateOrEditReteinerSectionsDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ReteinerSectionses/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getReteinerSectionsForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ReteinerSectionses/GetReteinerSectionsForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ReteinerSectionses/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdowm
  getAllContractSectionForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ReteinerSectionses/GetAllContractSectionForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditReteinerSectionsDto {
  sortIndex!: number;
  paragraphNo!: string | undefined;
  contractSectionId!: string;
  id!: string | undefined;
}