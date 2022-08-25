import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  constructor(private http: HttpClient, private _router: Router) { }


    getAll(filter: string | null | undefined, actionNameFilter: string | null | undefined, maxPriorityFilter: number | null | undefined, minPriorityFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ActionTypes/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (actionNameFilter !== undefined && actionNameFilter !== null)
            url_ += "ActionNameFilter=" + encodeURIComponent("" + actionNameFilter) + "&";
        if (maxPriorityFilter !== undefined && maxPriorityFilter !== null)
            url_ += "MaxPriorityFilter=" + encodeURIComponent("" + maxPriorityFilter) + "&";
        if (minPriorityFilter !== undefined && minPriorityFilter !== null)
            url_ += "MinPriorityFilter=" + encodeURIComponent("" + minPriorityFilter) + "&";
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

   

    createOrEdit(body: CreateOrEditActionTypeDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ActionTypes/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
      
    }

    delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ActionTypes/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }

   
}

export class CreateOrEditActionTypeDto {
  actionName!: string;
  priority!: number;
  id!: number | undefined;
}

