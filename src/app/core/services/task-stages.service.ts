
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PMTaskStagesServiceProxy {
   
    constructor(private http: HttpClient, private _router: Router) { }
    /**
     * @param filter (optional) 
     * @param stageFilter (optional) 
     * @param hexacolorFilter (optional) 
     * @param sorting (optional) 
     * @param skipCount (optional) 
     * @param maxResultCount (optional) 
     * @return Success
     */
    getAll(filter: string | null | undefined, stageFilter: string | null | undefined, hexacolorFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskStages/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (stageFilter !== undefined && stageFilter !== null)
            url_ += "StageFilter=" + encodeURIComponent("" + stageFilter) + "&";
        if (hexacolorFilter !== undefined && hexacolorFilter !== null)
            url_ += "HexacolorFilter=" + encodeURIComponent("" + hexacolorFilter) + "&";
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
    getPMTaskStageForView(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskStages/GetPMTaskStageForView?";
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
    getPMTaskStageForEdit(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMTaskStages/GetPMTaskStageForEdit?";
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
    createOrEdit(body: CreateOrEditPMTaskStageDto | undefined): any {

        let url_ = environment.apiURL + "/api/services/app/PMTaskStages/CreateOrEdit";
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
        let url_ = environment.apiURL + "/api/services/app/PMTaskStages/Delete?";
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

export class CreateOrEditPMTaskStageDto implements ICreateOrEditPMTaskStageDto {
    stage!: string;
    hexacolor!: string;
    id!: number | undefined;
    orderNum!:number|undefined;

    constructor(data?: ICreateOrEditPMTaskStageDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.stage = _data["stage"];
            this.hexacolor = _data["hexacolor"];
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): CreateOrEditPMTaskStageDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditPMTaskStageDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["stage"] = this.stage;
        data["hexacolor"] = this.hexacolor;
        data["id"] = this.id;
        return data; 
    }
}

export interface ICreateOrEditPMTaskStageDto {
    stage: string;
    hexacolor: string;
    id: number | undefined;
    orderNum:number|undefined;
}
