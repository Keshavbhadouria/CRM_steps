
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PMTaskTypesServiceProxy {
    constructor(private http: HttpClient, private _router: Router) { }

    /**
     * @param filter (optional) 
     * @param typeFilter (optional) 
     * @param sorting (optional) 
     * @param skipCount (optional) 
     * @param maxResultCount (optional) 
     * @return Success
     */
    getAll(filter: string | null | undefined, typeFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskTypes/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (typeFilter !== undefined && typeFilter !== null)
            url_ += "TypeFilter=" + encodeURIComponent("" + typeFilter) + "&";
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

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }

   

    /**
     * @param id (optional) 
     * @return Success
     */
    getPMTaskTypeForView(id: number | undefined): any{
        let url_ = environment.apiURL + "/api/services/app/PMTaskTypes/GetPMTaskTypeForView?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }

   

    /**
     * @param id (optional) 
     * @return Success
     */
    getPMTaskTypeForEdit(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskTypes/GetPMTaskTypeForEdit?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }

    

    /**
     * @param body (optional) 
     * @return Success
     */
    createOrEdit(body: CreateOrEditPMTaskTypeDto | undefined):any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskTypes/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };

        return this.http.post<any>(url_, body).toPromise();
    }

   
    /**
     * @param id (optional) 
     * @return Success
     */
    delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskTypes/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.delete(url_).toPromise();
    }
}

export class CreateOrEditPMTaskTypeDto implements ICreateOrEditPMTaskTypeDto {
    type!: string;
    id!: number | undefined;

    constructor(data?: ICreateOrEditPMTaskTypeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): CreateOrEditPMTaskTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditPMTaskTypeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["id"] = this.id;
        return data; 
    }
}

export interface ICreateOrEditPMTaskTypeDto {
    type: string;
    id: number | undefined;
}
