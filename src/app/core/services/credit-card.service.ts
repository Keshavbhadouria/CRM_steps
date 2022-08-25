import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private _httpClient: HttpClient) { }

  getTenantCCList() {
    let url_ = environment.apiURL + "/api/services/app/UserCreditCards/GetAll?";
    url_ = url_.replace(/[?&]$/, "");
    return this._httpClient.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditUserCreditCardDto | undefined) {
    let url_ = environment.apiURL + "/api/services/app/UserCreditCards/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this._httpClient.post<any>(url_ , body).toPromise();
  }

  delete(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/UserCreditCards/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

      return this._httpClient.delete(url_).toPromise();
  }

}


export class CreateOrEditUserCreditCardDto {
  nameOnCard!: string;
  creditCardNo!: string;
  cvv!: string;
  expiryMonth!: string;
  expiryYear!: string;
  isDefault: boolean = false;
  creditCardTokenId!: string | undefined;
  address1!: string | undefined;
  address2!: string | undefined;
  city!: string | undefined;
  postalCode!: string | undefined;
  isSameAsCompanyAddress!: boolean;
  userId!: number;
  countryId!: string | undefined;
  stateId!: string | undefined;
  id!: string | undefined;
  cardType:string | undefined;

}
