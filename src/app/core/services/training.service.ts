import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class trainingService {

    constructor(private http: HttpClient, private _router: Router) { }

    getAll(filter: string | null | undefined, titleFilter: string | null | undefined, descriptionFilter: string | null | undefined, urlFilter: string | null | undefined, downloadableTemplateFilter: string | null | undefined, lawfirmServiceServicesNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/TrainingVideoses/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (titleFilter !== undefined && titleFilter !== null)
            url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
        if (descriptionFilter !== undefined && descriptionFilter !== null)
            url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
        if (urlFilter !== undefined && urlFilter !== null)
            url_ += "UrlFilter=" + encodeURIComponent("" + urlFilter) + "&";
        if (downloadableTemplateFilter !== undefined && downloadableTemplateFilter !== null)
            url_ += "DownloadableTemplateFilter=" + encodeURIComponent("" + downloadableTemplateFilter) + "&";
        if (lawfirmServiceServicesNameFilter !== undefined && lawfirmServiceServicesNameFilter !== null)
            url_ += "LawfirmServiceServicesNameFilter=" + encodeURIComponent("" + lawfirmServiceServicesNameFilter) + "&";
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

    createOrEdit(body: CreateOrEditTrainingVideosDto | undefined): any {
        
        let url_ = environment.apiURL + "/api/services/app/TrainingVideoses/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }


    delete(id: string | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/TrainingVideoses/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }

    getAllLawfirmServiceForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/TrainingVideoses/GetAllLawfirmServiceForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }
    //#endregion
    getAllWithoutFilter(filter):any{
        let url_ = environment.apiURL + "/api/services/app/TrainingVideoses/GetAllWithoutFilter?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

}

export class CreateOrEditTrainingVideosDto {
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    downloadableTemplate: string | undefined;
    lawfirmServiceId: number | undefined;
    id: string | undefined;
}




