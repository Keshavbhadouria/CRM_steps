
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskVelocitiesServiceProxy {
    constructor(private http: HttpClient, private _router: Router) { }
    /**
     * @param filter (optional) 
     * @param velocityFilter (optional) 
     * @param sorting (optional) 
     * @param skipCount (optional) 
     * @param maxResultCount (optional) 
     * @return Success
     */
    getAll(filter: string | null | undefined, velocityFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/TaskVelocities/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (velocityFilter !== undefined && velocityFilter !== null)
            url_ += "VelocityFilter=" + encodeURIComponent("" + velocityFilter) + "&";
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
    getTaskVelocityForView(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/TaskVelocities/GetTaskVelocityForView?";
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
    getTaskVelocityForEdit(id: number | undefined): any {
        let url_ =  environment.apiURL + "/api/services/app/TaskVelocities/GetTaskVelocityForEdit?";
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
    createOrEdit(body: CreateOrEditTaskVelocityDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/TaskVelocities/CreateOrEdit";
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
        let url_ = environment.apiURL  + "/api/services/app/TaskVelocities/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }
}

export class CreateOrEditTaskVelocityDto implements ICreateOrEditTaskVelocityDto {
    velocity!: string;
    id!: number | undefined;

    constructor(data?: ICreateOrEditTaskVelocityDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.velocity = _data["velocity"];
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): CreateOrEditTaskVelocityDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditTaskVelocityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["velocity"] = this.velocity;
        data["id"] = this.id;
        return data; 
    }
}

export interface ICreateOrEditTaskVelocityDto {
    velocity: string;
    id: number | undefined;
}