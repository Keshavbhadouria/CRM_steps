import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndPoint } from '../constants/endPoint';
import { CreateOrEditPMProjectDto } from '../models/Project/CreateOrEditPMProject';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTemplateService {
    constructor(private http: HttpClient, private _router: Router) { }
    getAll(filter: string | null | undefined, nameFilter: string | null | undefined, templateFilter: string | null | undefined, isDefaultFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/InvoiceTemplates/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (nameFilter !== undefined && nameFilter !== null)
            url_ += "NameFilter=" + encodeURIComponent("" + nameFilter) + "&";
        if (templateFilter !== undefined && templateFilter !== null)
            url_ += "TemplateFilter=" + encodeURIComponent("" + templateFilter) + "&";
        if (isDefaultFilter !== undefined && isDefaultFilter !== null)
            url_ += "IsDefaultFilter=" + encodeURIComponent("" + isDefaultFilter) + "&";
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
      createOrEdit(body: CreateOrEditInvoiceTemplateDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/InvoiceTemplates/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
      }

      delete(id: string | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/InvoiceTemplates/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.delete(url_).toPromise();
      }
}

export class CreateOrEditInvoiceTemplateDto {
    name: string;
    template: string;
    isDefault: boolean;
    id: string | undefined;
}