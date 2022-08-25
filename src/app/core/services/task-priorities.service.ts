
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PMTaskPrioritiesServiceProxy {
    constructor(private http: HttpClient, private _router: Router) { }

    /**
     * @param filter (optional) 
     * @param priorityFilter (optional) 
     * @param sorting (optional) 
     * @param skipCount (optional) 
     * @param maxResultCount (optional) 
     * @return Success
     */
    getAll(filter: string | null | undefined, priorityFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskPriorities/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (priorityFilter !== undefined && priorityFilter !== null)
            url_ += "PriorityFilter=" + encodeURIComponent("" + priorityFilter) + "&";
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
    getPMTaskPriorityForView(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskPriorities/GetPMTaskPriorityForView?";
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
    getPMTaskPriorityForEdit(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskPriorities/GetPMTaskPriorityForEdit?";
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
    createOrEdit(body: CreateOrEditPMTaskPriorityDto | undefined): any{
        let url_ = environment.apiURL + "/api/services/app/PMTaskPriorities/CreateOrEdit";
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
    delete(id: number | undefined): any{
        let url_ = environment.apiURL + "/api/services/app/PMTaskPriorities/Delete?";
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

export class CreateOrEditPMTaskPriorityDto implements ICreateOrEditPMTaskPriorityDto {
    priority!: string;
    id!: number | undefined;

    constructor(data?: ICreateOrEditPMTaskPriorityDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.priority = _data["priority"];
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): CreateOrEditPMTaskPriorityDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditPMTaskPriorityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["priority"] = this.priority;
        data["id"] = this.id;
        return data; 
    }
}

export interface ICreateOrEditPMTaskPriorityDto {
    priority: string;
    id: number | undefined;
}