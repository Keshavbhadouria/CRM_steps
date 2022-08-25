import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LmsformService {

  constructor(private _httpClient: HttpClient) { }

  
  getAll(filter: string | null | undefined, nameFilter: string | null | undefined, maxOrderNumFilter: number | null | undefined, minOrderNumFilter: number | null | undefined, lMSFormTypeNameFilter: string | null | undefined, lMSDisplayTypeNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LMSForms/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (nameFilter !== undefined && nameFilter !== null)
        url_ += "NameFilter=" + encodeURIComponent("" + nameFilter) + "&";
    if (maxOrderNumFilter !== undefined && maxOrderNumFilter !== null)
        url_ += "MaxOrderNumFilter=" + encodeURIComponent("" + maxOrderNumFilter) + "&";
    if (minOrderNumFilter !== undefined && minOrderNumFilter !== null)
        url_ += "MinOrderNumFilter=" + encodeURIComponent("" + minOrderNumFilter) + "&";
    if (lMSFormTypeNameFilter !== undefined && lMSFormTypeNameFilter !== null)
        url_ += "LMSFormTypeNameFilter=" + encodeURIComponent("" + lMSFormTypeNameFilter) + "&";
    if (lMSDisplayTypeNameFilter !== undefined && lMSDisplayTypeNameFilter !== null)
        url_ += "LMSDisplayTypeNameFilter=" + encodeURIComponent("" + lMSDisplayTypeNameFilter) + "&";
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

    return this._httpClient.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditLMSFormDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LMSForms/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.post<any>(url_, body).toPromise();
  }

  getLMSFormForEdit(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/LMSForms/GetLMSFormForEdit?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this._httpClient.get<any>(url_).toPromise();
}


delete(id: string | undefined): any {
  let url_ = environment.apiURL + "/api/services/app/LMSForms/Delete?";
  if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
  else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
  url_ = url_.replace(/[?&]$/, "");

    return this._httpClient.delete<any>(url_).toPromise();
  }

  getAllLMSFormTypeForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/LMSForms/GetAllLMSFormTypeForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.get<any>(url_).toPromise();
  }

  getAllLMSDisplayTypeForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/LMSForms/GetAllLMSDisplayTypeForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.get<any>(url_).toPromise();
  }
}

export class CreateOrEditLMSFormDto {
  name: string;
  orderNum: number;
  lmsFormTypeId: string | undefined;
  lmsDisplayTypeId: string | undefined;
  id: string | undefined;
}

export class CreatetLMSForm {
  name: string;
  orderNum: number;
  lmsFormTypeId: string | undefined;
  lmsDisplayTypeId: string | undefined;
  id: string | undefined;
}
export class QuestionDto{
  question!: string;
  questionType!: string | undefined;
  isRequired!: boolean;
  lmsFormId!: string | undefined;
  id!: string | undefined;
  QuestionOptions: QuestionOption[] = [];
}

export class QuestionOption{
  name: string;
  isCorrect: boolean;
  lmsFormQuestionId: string | undefined;
  id: string | undefined;
}