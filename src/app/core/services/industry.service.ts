import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})

export class PMIndustriesServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @param filter (optional) 
     * @param industryFilter (optional) 
     * @param sorting (optional) 
     * @param skipCount (optional) 
     * @param maxResultCount (optional) 
     * @return Success
     */
    getAll(filter: string | null | undefined, industryFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined):any {
        let url_ = environment.apiURL + "/api/services/app/PMIndustries/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (industryFilter !== undefined && industryFilter !== null)
            url_ += "IndustryFilter=" + encodeURIComponent("" + industryFilter) + "&";
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

        // let options_ : any = {
        //     observe: "response",
        //     responseType: "blob",
        //     headers: new HttpHeaders({
        //         "Accept": "text/plain"
        //     })
        // };

        // return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        //     return this.processGetAll(response_);
        // })).pipe(_observableCatch((response_: any) => {
        //     if (response_ instanceof HttpResponseBase) {
        //         try {
        //             return this.processGetAll(<any>response_);
        //         } catch (e) {
        //             return <Observable<PagedResultDtoOfGetPMIndustryForViewDto>><any>_observableThrow(e);
        //         }
        //     } else
        //         return <Observable<PagedResultDtoOfGetPMIndustryForViewDto>><any>_observableThrow(response_);
        // }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetPMIndustryForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PagedResultDtoOfGetPMIndustryForViewDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfGetPMIndustryForViewDto>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    getPMIndustryForView(id: number | undefined): Observable<GetPMIndustryForViewDto> {
        let url_ = this.baseUrl + "/api/services/app/PMIndustries/GetPMIndustryForView?";
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

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetPMIndustryForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPMIndustryForView(<any>response_);
                } catch (e) {
                    return <Observable<GetPMIndustryForViewDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetPMIndustryForViewDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetPMIndustryForView(response: HttpResponseBase): Observable<GetPMIndustryForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetPMIndustryForViewDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetPMIndustryForViewDto>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    getPMIndustryForEdit(id: number | undefined): Observable<GetPMIndustryForEditOutput> {
        let url_ = this.baseUrl + "/api/services/app/PMIndustries/GetPMIndustryForEdit?";
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

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetPMIndustryForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPMIndustryForEdit(<any>response_);
                } catch (e) {
                    return <Observable<GetPMIndustryForEditOutput>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetPMIndustryForEditOutput>><any>_observableThrow(response_);
        }));
    }

    protected processGetPMIndustryForEdit(response: HttpResponseBase): Observable<GetPMIndustryForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetPMIndustryForEditOutput.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetPMIndustryForEditOutput>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    createOrEdit(body: CreateOrEditPMIndustryDto | undefined):any {
        let url_ = environment.apiURL + "/api/services/app/PMIndustries/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");


         const content_ = JSON.stringify(body);

        return this.http.post<any>(url_, body).toPromise();

        // let options_ : any = {
        //     body: content_,
        //     observe: "response",
        //     responseType: "blob",
        //     headers: new HttpHeaders({
        //         "Content-Type": "application/json-patch+json",
        //     })
        // };

        // return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        //     return this.processCreateOrEdit(response_);
        // })).pipe(_observableCatch((response_: any) => {
        //     if (response_ instanceof HttpResponseBase) {
        //         try {
        //             return this.processCreateOrEdit(<any>response_);
        //         } catch (e) {
        //             return <Observable<void>><any>_observableThrow(e);
        //         }
        //     } else
        //         return <Observable<void>><any>_observableThrow(response_);
        // }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMIndustries/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();

        // let options_ : any = {
        //     observe: "response",
        //     responseType: "blob",
        //     headers: new HttpHeaders({
        //     })
        // };

        // return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        //     return this.processDelete(response_);
        // })).pipe(_observableCatch((response_: any) => {
        //     if (response_ instanceof HttpResponseBase) {
        //         try {
        //             return this.processDelete(<any>response_);
        //         } catch (e) {
        //             return <Observable<void>><any>_observableThrow(e);
        //         }
        //     } else
        //         return <Observable<void>><any>_observableThrow(response_);
        // }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    /**
     * @param filter (optional) 
     * @param industryFilter (optional) 
     * @return Success
     */
    getPMIndustriesToExcel(filter: string | null | undefined, industryFilter: string | null | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/PMIndustries/GetPMIndustriesToExcel?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (industryFilter !== undefined && industryFilter !== null)
            url_ += "IndustryFilter=" + encodeURIComponent("" + industryFilter) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetPMIndustriesToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPMIndustriesToExcel(<any>response_);
                } catch (e) {
                    return <Observable<FileDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetPMIndustriesToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = FileDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileDto>(<any>null);
    }
}


export class FileDto implements IFileDto {
  fileName!: string;
  fileType!: string | undefined;
  fileToken!: string;

  constructor(data?: IFileDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.fileName = _data["fileName"];
          this.fileType = _data["fileType"];
          this.fileToken = _data["fileToken"];
      }
  }

  static fromJS(data: any): FileDto {
      data = typeof data === 'object' ? data : {};
      let result = new FileDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["fileName"] = this.fileName;
      data["fileType"] = this.fileType;
      data["fileToken"] = this.fileToken;
      return data; 
  }
}

export interface IFileDto {
  fileName: string;
  fileType: string | undefined;
  fileToken: string;
}


export class PMIndustryDto implements IPMIndustryDto {
  industry!: string | undefined;
  id!: number;

  constructor(data?: IPMIndustryDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.industry = _data["industry"];
          this.id = _data["id"];
      }
  }

  static fromJS(data: any): PMIndustryDto {
      data = typeof data === 'object' ? data : {};
      let result = new PMIndustryDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["industry"] = this.industry;
      data["id"] = this.id;
      return data; 
  }
}

export interface IPMIndustryDto {
  industry: string | undefined;
  id: number;
}

export class GetPMIndustryForViewDto implements IGetPMIndustryForViewDto {
  pmIndustry!: PMIndustryDto;

  constructor(data?: IGetPMIndustryForViewDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.pmIndustry = _data["pmIndustry"] ? PMIndustryDto.fromJS(_data["pmIndustry"]) : <any>undefined;
      }
  }

  static fromJS(data: any): GetPMIndustryForViewDto {
      data = typeof data === 'object' ? data : {};
      let result = new GetPMIndustryForViewDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["pmIndustry"] = this.pmIndustry ? this.pmIndustry.toJSON() : <any>undefined;
      return data; 
  }
}

export interface IGetPMIndustryForViewDto {
  pmIndustry: PMIndustryDto;
}

export class PagedResultDtoOfGetPMIndustryForViewDto implements IPagedResultDtoOfGetPMIndustryForViewDto {
  totalCount!: number;
  items!: GetPMIndustryForViewDto[] | undefined;

  constructor(data?: IPagedResultDtoOfGetPMIndustryForViewDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.totalCount = _data["totalCount"];
          if (Array.isArray(_data["items"])) {
              this.items = [] as any;
              for (let item of _data["items"])
                  this.items!.push(GetPMIndustryForViewDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): PagedResultDtoOfGetPMIndustryForViewDto {
      data = typeof data === 'object' ? data : {};
      let result = new PagedResultDtoOfGetPMIndustryForViewDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["totalCount"] = this.totalCount;
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      return data; 
  }
}

export interface IPagedResultDtoOfGetPMIndustryForViewDto {
  totalCount: number;
  items: GetPMIndustryForViewDto[] | undefined;
}

export class CreateOrEditPMIndustryDto implements ICreateOrEditPMIndustryDto {
  industry!: string;
  id!: number | undefined;

  constructor(data?: ICreateOrEditPMIndustryDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.industry = _data["industry"];
          this.id = _data["id"];
      }
  }

  static fromJS(data: any): CreateOrEditPMIndustryDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreateOrEditPMIndustryDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["industry"] = this.industry;
      data["id"] = this.id;
      return data; 
  }
}

export interface ICreateOrEditPMIndustryDto {
  industry: string;
  id: number | undefined;
}

export class GetPMIndustryForEditOutput implements IGetPMIndustryForEditOutput {
  pmIndustry!: CreateOrEditPMIndustryDto;

  constructor(data?: IGetPMIndustryForEditOutput) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.pmIndustry = _data["pmIndustry"] ? CreateOrEditPMIndustryDto.fromJS(_data["pmIndustry"]) : <any>undefined;
      }
  }

  static fromJS(data: any): GetPMIndustryForEditOutput {
      data = typeof data === 'object' ? data : {};
      let result = new GetPMIndustryForEditOutput();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["pmIndustry"] = this.pmIndustry ? this.pmIndustry.toJSON() : <any>undefined;
      return data; 
  }
}

export interface IGetPMIndustryForEditOutput {
  pmIndustry: CreateOrEditPMIndustryDto;
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