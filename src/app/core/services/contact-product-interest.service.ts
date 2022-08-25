import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateOrEditContactPreferrenceDto } from '../models/Customer/Preference';

@Injectable({
  providedIn: 'root'
})
export class ContactProductInterestService {

  constructor(private http: HttpClient,) { }


  getContactProductInterest(contactId: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactProductInterests/GetContactProductInterest?";
    if (contactId === null)
        throw new Error("The parameter 'contactId' cannot be null.");
    else if (contactId !== undefined)
        url_ += "contactId=" + encodeURIComponent("" + contactId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}
