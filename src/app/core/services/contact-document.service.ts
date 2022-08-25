import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditContactDocumentSignatureDto } from './contact-document-signature.service';
import { CreateOrEditContactEmailHistoryDto } from './email-histories.service';

@Injectable({
  providedIn: 'root'
})
export class ContactDocumentService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, documentNameFilter: string | null | undefined, location_AisleFilter: string | null | undefined, location_BoxFilter: string | null | undefined, location_FolderFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, stepDocumentsDocumentFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactDocuments/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (documentNameFilter !== undefined && documentNameFilter !== null)
      url_ += "DocumentNameFilter=" + encodeURIComponent("" + documentNameFilter) + "&";
    if (location_AisleFilter !== undefined && location_AisleFilter !== null)
      url_ += "Location_AisleFilter=" + encodeURIComponent("" + location_AisleFilter) + "&";
    if (location_BoxFilter !== undefined && location_BoxFilter !== null)
      url_ += "Location_BoxFilter=" + encodeURIComponent("" + location_BoxFilter) + "&";
    if (location_FolderFilter !== undefined && location_FolderFilter !== null)
      url_ += "Location_FolderFilter=" + encodeURIComponent("" + location_FolderFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
      url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (stepDocumentsDocumentFilter !== undefined && stepDocumentsDocumentFilter !== null)
      url_ += "StepDocumentsDocumentFilter=" + encodeURIComponent("" + stepDocumentsDocumentFilter) + "&";
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

  GetAllByCustomFilters(filter: string | null | undefined, contactId: number | null | undefined, documentNameFilter: string | null | undefined, location_AisleFilter: string | null | undefined, location_BoxFilter: string | null | undefined, location_FolderFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, stepDocumentsDocumentFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactDocuments/GetAllByCustomFilters?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (contactId !== undefined && contactId !== null)
      url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
    if (documentNameFilter !== undefined && documentNameFilter !== null)
      url_ += "DocumentNameFilter=" + encodeURIComponent("" + documentNameFilter) + "&";
    if (location_AisleFilter !== undefined && location_AisleFilter !== null)
      url_ += "Location_AisleFilter=" + encodeURIComponent("" + location_AisleFilter) + "&";
    if (location_BoxFilter !== undefined && location_BoxFilter !== null)
      url_ += "Location_BoxFilter=" + encodeURIComponent("" + location_BoxFilter) + "&";
    if (location_FolderFilter !== undefined && location_FolderFilter !== null)
      url_ += "Location_FolderFilter=" + encodeURIComponent("" + location_FolderFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
      url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (stepDocumentsDocumentFilter !== undefined && stepDocumentsDocumentFilter !== null)
      url_ += "StepDocumentsDocumentFilter=" + encodeURIComponent("" + stepDocumentsDocumentFilter) + "&";
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

  createOrEdit(body: any | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactDocuments/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getContactDocumentForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocuments/GetContactDocumentForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocuments/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
  //dropdown
  getAllContactForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocuments/GetAllContactForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllStepDocumentsForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactDocuments/GetAllStepDocumentsForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditContactDocumentDto {
  documentUrl!: string;
  documentName!: string | undefined;
  description!: string | undefined;
  htmlDescription!: string | undefined;
  location_Aisle!: string | undefined;
  location_Box!: string | undefined;
  location_Folder!: string | undefined;
  contactId!: number | undefined;
  stepDocumentsId!: number | undefined;
  documentSignature!: CreateOrEditContactDocumentSignatureDto;
  id!: string | undefined;
}
