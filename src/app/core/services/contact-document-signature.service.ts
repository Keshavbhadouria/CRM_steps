import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactDocumentSignatureService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, signatureImagesUrlFilter: string | null | undefined, signatureDateFilter: string | null | undefined, fullNameFilter: string | null | undefined, contactDocumentDocumentNameFilter: string | null | undefined, userNameFilter: string | null | undefined, roleNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocumentSignatures/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (signatureImagesUrlFilter !== undefined && signatureImagesUrlFilter !== null)
      url_ += "SignatureImagesUrlFilter=" + encodeURIComponent("" + signatureImagesUrlFilter) + "&";
    if (signatureDateFilter !== undefined && signatureDateFilter !== null)
      url_ += "SignatureDateFilter=" + encodeURIComponent("" + signatureDateFilter) + "&";
    if (fullNameFilter !== undefined && fullNameFilter !== null)
      url_ += "FullNameFilter=" + encodeURIComponent("" + fullNameFilter) + "&";
    if (contactDocumentDocumentNameFilter !== undefined && contactDocumentDocumentNameFilter !== null)
      url_ += "ContactDocumentDocumentNameFilter=" + encodeURIComponent("" + contactDocumentDocumentNameFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (roleNameFilter !== undefined && roleNameFilter !== null)
      url_ += "RoleNameFilter=" + encodeURIComponent("" + roleNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditContactDocumentSignatureDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocumentSignatures/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getContactDocumentSignatureForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocumentSignatures/GetContactDocumentSignatureForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocumentSignatures/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllContactDocumentForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocumentSignatures/GetAllContactDocumentForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocumentSignatures/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllRoleForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocumentSignatures/GetAllRoleForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditContactDocumentSignatureDto {
  signatureImagesUrl!: string;
  signatureDate!: string | undefined;
  fullName!: string | undefined;
  contactDocumentId!: string | undefined;
  userId!: number | undefined;
  roleId!: number | undefined;
  id!: string | undefined;
}