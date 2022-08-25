import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditContactDto } from '../models/Customer/Contact';
import { CreateOrEditContactObjectionDto, GetObjectionEntityForViewDto } from '../models/Customer/ContactObjection';
import { DropdownDto } from '../models/Project/CreateOrEditPMProject';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  editObj: any;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  allTargetTitles: DropdownDto[];
  allLeadTemperatures: DropdownDto[];
  allLeadSources:      DropdownDto[];
  allLeadStages:       DropdownDto[];
  allLeadStatuss:      DropdownDto[];


  constructor(private http: HttpClient, private _router: Router) { }

  getAll(filter: string | null | undefined, companyFilter: string | null | undefined, firstnameFilter: string | null | undefined, lastnameFilter: string | null | undefined, emailFilter: string | null | undefined, phoneFilter: string | null | undefined, extensionFilter: string | null | undefined, maxPreferredTime1Filter: string | null | undefined, minPreferredTime1Filter: string | null | undefined, maxPreferredTime2Filter: string | null | undefined, minPreferredTime2Filter: string | null | undefined, address1Filter: string | null | undefined, address2Filter: string | null | undefined, cityFilter: string | null | undefined, stateFilter: string | null | undefined, countryFilter: string | null | undefined, zipcodeFilter: string | null | undefined, maxScoreFilter: number | null | undefined, minScoreFilter: number | null | undefined, maxActionTypeIdFilter: number | null | undefined, minActionTypeIdFilter: number | null | undefined, webURLFilter: string | null | undefined, targetTitleTitleFilter: string | null | undefined, leadTemperatureTemperatureFilter: string | null | undefined, leadSourceSourceNameFilter: string | null | undefined, leadStageStageNameFilter: string | null | undefined, leadStatusStatusNameFilter: string | null | undefined, fromDate: moment.Moment | null | undefined, toDate: moment.Moment | null | undefined, paralegalId: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Contacts/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (companyFilter !== undefined && companyFilter !== null)
        url_ += "CompanyFilter=" + encodeURIComponent("" + companyFilter) + "&";
    if (firstnameFilter !== undefined && firstnameFilter !== null)
        url_ += "FirstnameFilter=" + encodeURIComponent("" + firstnameFilter) + "&";
    if (lastnameFilter !== undefined && lastnameFilter !== null)
        url_ += "LastnameFilter=" + encodeURIComponent("" + lastnameFilter) + "&";
    if (emailFilter !== undefined && emailFilter !== null)
        url_ += "EmailFilter=" + encodeURIComponent("" + emailFilter) + "&";
    if (phoneFilter !== undefined && phoneFilter !== null)
        url_ += "PhoneFilter=" + encodeURIComponent("" + phoneFilter) + "&";
    if (extensionFilter !== undefined && extensionFilter !== null)
        url_ += "ExtensionFilter=" + encodeURIComponent("" + extensionFilter) + "&";
    if (maxPreferredTime1Filter !== undefined && maxPreferredTime1Filter !== null)
        url_ += "MaxPreferredTime1Filter=" + encodeURIComponent("" + maxPreferredTime1Filter) + "&";
    if (minPreferredTime1Filter !== undefined && minPreferredTime1Filter !== null)
        url_ += "MinPreferredTime1Filter=" + encodeURIComponent("" + minPreferredTime1Filter) + "&";
    if (maxPreferredTime2Filter !== undefined && maxPreferredTime2Filter !== null)
        url_ += "MaxPreferredTime2Filter=" + encodeURIComponent("" + maxPreferredTime2Filter) + "&";
    if (minPreferredTime2Filter !== undefined && minPreferredTime2Filter !== null)
        url_ += "MinPreferredTime2Filter=" + encodeURIComponent("" + minPreferredTime2Filter) + "&";
    if (address1Filter !== undefined && address1Filter !== null)
        url_ += "Address1Filter=" + encodeURIComponent("" + address1Filter) + "&";
    if (address2Filter !== undefined && address2Filter !== null)
        url_ += "Address2Filter=" + encodeURIComponent("" + address2Filter) + "&";
    if (cityFilter !== undefined && cityFilter !== null)
        url_ += "CityFilter=" + encodeURIComponent("" + cityFilter) + "&";
    if (stateFilter !== undefined && stateFilter !== null)
        url_ += "StateFilter=" + encodeURIComponent("" + stateFilter) + "&";
    if (countryFilter !== undefined && countryFilter !== null)
        url_ += "CountryFilter=" + encodeURIComponent("" + countryFilter) + "&";
    if (zipcodeFilter !== undefined && zipcodeFilter !== null)
        url_ += "ZipcodeFilter=" + encodeURIComponent("" + zipcodeFilter) + "&";
    if (maxScoreFilter !== undefined && maxScoreFilter !== null)
        url_ += "MaxScoreFilter=" + encodeURIComponent("" + maxScoreFilter) + "&";
    if (minScoreFilter !== undefined && minScoreFilter !== null)
        url_ += "MinScoreFilter=" + encodeURIComponent("" + minScoreFilter) + "&";
    if (maxActionTypeIdFilter !== undefined && maxActionTypeIdFilter !== null)
        url_ += "MaxActionTypeIdFilter=" + encodeURIComponent("" + maxActionTypeIdFilter) + "&";
    if (minActionTypeIdFilter !== undefined && minActionTypeIdFilter !== null)
        url_ += "MinActionTypeIdFilter=" + encodeURIComponent("" + minActionTypeIdFilter) + "&";
    if (webURLFilter !== undefined && webURLFilter !== null)
        url_ += "WebURLFilter=" + encodeURIComponent("" + webURLFilter) + "&";
    if (targetTitleTitleFilter !== undefined && targetTitleTitleFilter !== null)
        url_ += "TargetTitleTitleFilter=" + encodeURIComponent("" + targetTitleTitleFilter) + "&";
    if (leadTemperatureTemperatureFilter !== undefined && leadTemperatureTemperatureFilter !== null)
        url_ += "LeadTemperatureTemperatureFilter=" + encodeURIComponent("" + leadTemperatureTemperatureFilter) + "&";
    if (leadSourceSourceNameFilter !== undefined && leadSourceSourceNameFilter !== null)
        url_ += "LeadSourceSourceNameFilter=" + encodeURIComponent("" + leadSourceSourceNameFilter) + "&";
    if (leadStageStageNameFilter !== undefined && leadStageStageNameFilter !== null)
        url_ += "LeadStageStageNameFilter=" + encodeURIComponent("" + leadStageStageNameFilter) + "&";
    if (leadStatusStatusNameFilter !== undefined && leadStatusStatusNameFilter !== null)
        url_ += "LeadStatusStatusNameFilter=" + encodeURIComponent("" + leadStatusStatusNameFilter) + "&";
    if (fromDate !== undefined && fromDate !== null)
        url_ += "FromDate=" + encodeURIComponent(fromDate ? "" + fromDate.toJSON() : "") + "&";
    if (toDate !== undefined && toDate !== null)
        url_ += "ToDate=" + encodeURIComponent(toDate ? "" + toDate.toJSON() : "") + "&";
    if (paralegalId !== undefined && paralegalId !== null)
        url_ += "ParalegalId=" + encodeURIComponent("" + paralegalId) + "&";
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

  getAllTargetTitleForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/Contacts/GetAllTargetTitleForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllLeadTemperatureForTableDropdown(){
    let url_ = environment.apiURL + "/api/services/app/Contacts/GetAllLeadTemperatureForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllLeadSourceForTableDropdown(){
    let url_ = environment.apiURL + "/api/services/app/Contacts/GetAllLeadSourceForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllLeadStageForTableDropdown(){
    let url_ = environment.apiURL + "/api/services/app/Contacts/GetAllLeadStageForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getAllLeadStatusForTableDropdown(){
    let url_ = environment.apiURL + "/api/services/app/Contacts/GetAllLeadStatusForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getContactForEdit(id: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/Contacts/GetContactForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }


  getAllByContactId(filter: string | null | undefined, activeFilter: number | null | undefined, contactId: number | null | undefined, commentsFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, objectionEntityObjectionFilter: string | null | undefined, leadTemperatureTemperatureFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactObjections/GetAllByContactId?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
      url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (contactId !== undefined && contactId !== null)
      url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
    if (commentsFilter !== undefined && commentsFilter !== null)
      url_ += "CommentsFilter=" + encodeURIComponent("" + commentsFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
      url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (objectionEntityObjectionFilter !== undefined && objectionEntityObjectionFilter !== null)
      url_ += "ObjectionEntityObjectionFilter=" + encodeURIComponent("" + objectionEntityObjectionFilter) + "&";
    if (leadTemperatureTemperatureFilter !== undefined && leadTemperatureTemperatureFilter !== null)
      url_ += "LeadTemperatureTemperatureFilter=" + encodeURIComponent("" + leadTemperatureTemperatureFilter) + "&";
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



  getAllObjectionsByPromice() {
    let url_ = environment.apiURL + "/api/services/app/ObjectionEntities/GetAllObjections";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();

  }

  getAllObjections(): Observable<GetObjectionEntityForViewDto[]> {
    let url_ = environment.apiURL + "/api/services/app/ObjectionEntities/GetAllObjections";
    url_ = url_.replace(/[?&]$/, "");



    let options_ : any = {
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Accept": "text/plain"
        })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        return this.processGetAllObjections(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processGetAllObjections(<any>response_);
            } catch (e) {
                return <Observable<GetObjectionEntityForViewDto[]>><any>_observableThrow(e);
            }
        } else
            return <Observable<GetObjectionEntityForViewDto[]>><any>_observableThrow(response_);
    }));
  }

protected processGetAllObjections(response: HttpResponseBase): Observable<GetObjectionEntityForViewDto[]> {
  const status = response.status;
  const responseBlob =
      response instanceof HttpResponse ? response.body :
      (<any>response).error instanceof Blob ? (<any>response).error : undefined;

  let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
  if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      let result200: any = null;
      let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
      if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200)
              result200!.push(GetObjectionEntityForViewDto.fromJS(item));
      }
      return _observableOf(result200);
      }));
  } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
  }
  return _observableOf<GetObjectionEntityForViewDto[]>(<any>null);
}

  //#region  CUD


  createOrEditObjection(body: CreateOrEditContactObjectionDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactObjections/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);

    return this.http.post<any>(url_, body).toPromise();

  }


  createOrEdit(body: CreateOrEditContactDto | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/Contacts/CreateOrEdit";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);
      return this.http.post<any>(url_, body);
  }


  delete(id: number | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/Contacts/Delete?";
      if (id === null)
          throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
          url_ += "Id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();

  }


  //#endregion

}






// Helper Methods Of Observables
export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
      super();

      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
      return obj.isApiException === true;
  }
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
      if (!blob) {
          observer.next("");
          observer.complete();
      } else {
          let reader = new FileReader();
          reader.onload = event => {
              observer.next((<any>event.target).result);
              observer.complete();
          };
          reader.readAsText(blob);
      }
  });
}



function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
      return _observableThrow(result);
  else
      return _observableThrow(new ApiException(message, status, response, headers, null));
}

