import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrEditContactProductQuestionDto } from '../models/Customer/ContactQuestions';

@Injectable({
  providedIn: 'root'
})
export class ContactQuestionsService {

  constructor(private http: HttpClient, private _router: Router) { }

  getAll(filter: string | null | undefined, questionsFilter: string | null | undefined, solvedFilter: number | null | undefined, contactId: number | null | undefined, contactCompanyFilter: string | null | undefined, lawfirmServiceServicesNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactProductQuestions/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (questionsFilter !== undefined && questionsFilter !== null)
        url_ += "QuestionsFilter=" + encodeURIComponent("" + questionsFilter) + "&";
    if (solvedFilter !== undefined && solvedFilter !== null)
        url_ += "SolvedFilter=" + encodeURIComponent("" + solvedFilter) + "&";
    if (contactId !== undefined && contactId !== null)
        url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
        url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
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



  createOrEdit(body: CreateOrEditContactProductQuestionDto | undefined): any {
    
    let url_ = environment.apiURL + "/api/services/app/ContactProductQuestions/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);
      return this.http.post<any>(url_, body).toPromise();
  }


  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactProductQuestions/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();
  }


  //#endregion

}





