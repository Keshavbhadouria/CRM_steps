
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignObjetivesServiceProxy {
  constructor(private http: HttpClient, private _router: Router) { }

  /**
   * @param filter (optional) 
   * @param objetiveFilter (optional) 
   * @param sorting (optional) 
   * @param skipCount (optional) 
   * @param maxResultCount (optional) 
   * @return Success
   */
  getAll(filter: string | null | undefined, objetiveFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/CampaignObjetives/GetAll?";
      if (filter !== undefined && filter !== null)
          url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
      if (objetiveFilter !== undefined && objetiveFilter !== null)
          url_ += "ObjetiveFilter=" + encodeURIComponent("" + objetiveFilter) + "&";
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

 

  /**
   * @param id (optional) 
   * @return Success
   */
  getCampaignObjetiveForView(id: number | undefined): any {
      let url_ =environment.apiURL + "/api/services/app/CampaignObjetives/GetCampaignObjetiveForView?";
      if (id === null)
          throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
          url_ += "id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get<any>(url_).toPromise();
  }


  /**
   * @param id (optional) 
   * @return Success
   */
  getCampaignObjetiveForEdit(id: number | undefined): any {
      let url_ =environment.apiURL + "/api/services/app/CampaignObjetives/GetCampaignObjetiveForEdit?";
      if (id === null)
          throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
          url_ += "Id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.get<any>(url_).toPromise();
  }

 

  /**
   * @param body (optional) 
   * @return Success
   */
  createOrEdit(body: CreateOrEditCampaignObjetiveDto | undefined): any {
      let url_ =environment.apiURL + "/api/services/app/CampaignObjetives/CreateOrEdit";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.post<any>(url_, body).toPromise();
  }

  /**
   * @param id (optional) 
   * @return Success
   */
  delete(id: number | undefined): any {
      let url_ =environment.apiURL + "/api/services/app/CampaignObjetives/Delete?";
      if (id === null)
          throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
          url_ += "Id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();
  }


  /**
   * @param filter (optional) 
   * @param objetiveFilter (optional) 
   * @return Success
   */
}

export class CreateOrEditCampaignObjetiveDto {
  objetive!: string;
  id!: number | undefined;
}