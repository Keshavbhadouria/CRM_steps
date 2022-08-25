import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, fullNameFilter: string | null | undefined, emailFilter: string | null | undefined, phoneFilter: string | null | undefined, specialCodeFilter: string | null | undefined, activeFilter: number | null | undefined, affiliateTierTierNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Affiliates/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (fullNameFilter !== undefined && fullNameFilter !== null)
      url_ += "FullNameFilter=" + encodeURIComponent("" + fullNameFilter) + "&";
    if (emailFilter !== undefined && emailFilter !== null)
      url_ += "EmailFilter=" + encodeURIComponent("" + emailFilter) + "&";
    if (phoneFilter !== undefined && phoneFilter !== null)
      url_ += "PhoneFilter=" + encodeURIComponent("" + phoneFilter) + "&";
    if (specialCodeFilter !== undefined && specialCodeFilter !== null)
      url_ += "SpecialCodeFilter=" + encodeURIComponent("" + specialCodeFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
      url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (affiliateTierTierNameFilter !== undefined && affiliateTierTierNameFilter !== null)
      url_ += "AffiliateTierTierNameFilter=" + encodeURIComponent("" + affiliateTierTierNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditAffiliateDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Affiliates/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getAffiliateForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Affiliates/GetAffiliateForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Affiliates/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllAffiliateTierForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/Affiliates/GetAllAffiliateTierForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  
}

export class CreateOrEditAffiliateDto {
  fullName!: string;
  email!: string | undefined;
  phone!: string | undefined;
  specialCode!: string | undefined;
  active!: boolean;
  affiliateTierId!: number;
  id!: string | undefined;
}