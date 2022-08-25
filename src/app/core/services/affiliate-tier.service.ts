import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffiliateTierService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, tierNameFilter: string | null | undefined, tierBadgeFilter: string | null | undefined, tierHexaColorFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/AffiliateTiers/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (tierNameFilter !== undefined && tierNameFilter !== null)
      url_ += "TierNameFilter=" + encodeURIComponent("" + tierNameFilter) + "&";
    if (tierBadgeFilter !== undefined && tierBadgeFilter !== null)
      url_ += "TierBadgeFilter=" + encodeURIComponent("" + tierBadgeFilter) + "&";
    if (tierHexaColorFilter !== undefined && tierHexaColorFilter !== null)
      url_ += "TierHexaColorFilter=" + encodeURIComponent("" + tierHexaColorFilter) + "&";
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

  createOrEdit(body: CreateOrEditAffiliateTierDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/AffiliateTiers/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getAffiliateTierForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/AffiliateTiers/GetAffiliateTierForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/AffiliateTiers/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
}

export class CreateOrEditAffiliateTierDto {
  tierName!: string;
  tierBadge!: string | undefined;
  tierHexaColor!: string | undefined;
  id!: number | undefined;
}