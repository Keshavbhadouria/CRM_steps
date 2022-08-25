import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateOrEditContactPreferrenceDto } from '../models/Customer/Preference';

@Injectable({
  providedIn: 'root'
})
export class ContactPreferenceService {

  constructor(private http: HttpClient,) { }


  getAllByContactId(contactId: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactPreferrences/GetAllByContactId?";
    if (contactId === null)
      throw new Error("The parameter 'contactId' cannot be null.");
    else if (contactId !== undefined)
      url_ += "contactId=" + encodeURIComponent("" + contactId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditContactPreferrenceDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactPreferrences/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }


}
