import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhoneCallsService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, maxDateFilter: Date | null | undefined, minDateFilter: Date | null | undefined, inboundCallFilter: number | null | undefined, phoneNumberFilter: string | null | undefined, voiceMailFilter: number | null | undefined, commentsFilter: string | null | undefined, callAgainTodayFilter: number | null | undefined, callAgainDateFilter: string | null | undefined, callAgainTimeFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, userNameFilter: string | null | undefined, phoneCallObjetiveObjetiveNameFilter: string | null | undefined, contactPhoneCallOutcomeOutcomeFilter: string | null | undefined, businessActionScriptContentScriptFilter: string | null | undefined, phoneCallObjetiveObjetiveName2Filter: string | null | undefined, leadTempratureFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxDateFilter !== undefined && maxDateFilter !== null)
      url_ += "MaxDateFilter=" + encodeURIComponent(maxDateFilter ? "" + maxDateFilter : "") + "&";
    if (minDateFilter !== undefined && minDateFilter !== null)
      url_ += "MinDateFilter=" + encodeURIComponent(minDateFilter ? "" + minDateFilter : "") + "&";
    if (inboundCallFilter !== undefined && inboundCallFilter !== null)
      url_ += "InboundCallFilter=" + encodeURIComponent("" + inboundCallFilter) + "&";
    if (phoneNumberFilter !== undefined && phoneNumberFilter !== null)
      url_ += "PhoneNumberFilter=" + encodeURIComponent("" + phoneNumberFilter) + "&";
    if (voiceMailFilter !== undefined && voiceMailFilter !== null)
      url_ += "VoiceMailFilter=" + encodeURIComponent("" + voiceMailFilter) + "&";
    if (commentsFilter !== undefined && commentsFilter !== null)
      url_ += "CommentsFilter=" + encodeURIComponent("" + commentsFilter) + "&";
    if (callAgainTodayFilter !== undefined && callAgainTodayFilter !== null)
      url_ += "CallAgainTodayFilter=" + encodeURIComponent("" + callAgainTodayFilter) + "&";
    if (callAgainDateFilter !== undefined && callAgainDateFilter !== null)
      url_ += "CallAgainDateFilter=" + encodeURIComponent("" + callAgainDateFilter) + "&";
    if (callAgainTimeFilter !== undefined && callAgainTimeFilter !== null)
      url_ += "CallAgainTimeFilter=" + encodeURIComponent("" + callAgainTimeFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
      url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (phoneCallObjetiveObjetiveNameFilter !== undefined && phoneCallObjetiveObjetiveNameFilter !== null)
      url_ += "PhoneCallObjetiveObjetiveNameFilter=" + encodeURIComponent("" + phoneCallObjetiveObjetiveNameFilter) + "&";
    if (contactPhoneCallOutcomeOutcomeFilter !== undefined && contactPhoneCallOutcomeOutcomeFilter !== null)
      url_ += "ContactPhoneCallOutcomeOutcomeFilter=" + encodeURIComponent("" + contactPhoneCallOutcomeOutcomeFilter) + "&";
    if (businessActionScriptContentScriptFilter !== undefined && businessActionScriptContentScriptFilter !== null)
      url_ += "BusinessActionScriptContentScriptFilter=" + encodeURIComponent("" + businessActionScriptContentScriptFilter) + "&";
    if (phoneCallObjetiveObjetiveName2Filter !== undefined && phoneCallObjetiveObjetiveName2Filter !== null)
      url_ += "PhoneCallObjetiveObjetiveName2Filter=" + encodeURIComponent("" + phoneCallObjetiveObjetiveName2Filter) + "&";
    if (leadTempratureFilter !== undefined && leadTempratureFilter !== null)
      url_ += "LeadTempratureFilter=" + encodeURIComponent("" + leadTempratureFilter) + "&";
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

  getAllByContactId(filter: string | null | undefined,contactId : number | null | undefined,  maxDateFilter: Date | null | undefined, minDateFilter: Date | null | undefined, inboundCallFilter: number | null | undefined, phoneNumberFilter: string | null | undefined, voiceMailFilter: number | null | undefined, commentsFilter: string | null | undefined, callAgainTodayFilter: number | null | undefined, callAgainDateFilter: string | null | undefined, callAgainTimeFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, userNameFilter: string | null | undefined, phoneCallObjetiveObjetiveNameFilter: string | null | undefined, contactPhoneCallOutcomeOutcomeFilter: string | null | undefined, businessActionScriptContentScriptFilter: string | null | undefined, phoneCallObjetiveObjetiveName2Filter: string | null | undefined, leadTempratureFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/getAllByContactId?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
      if (contactId !== undefined && contactId !== null)
      url_ += "contactId=" + encodeURIComponent("" + contactId) + "&";
    if (maxDateFilter !== undefined && maxDateFilter !== null)
      url_ += "MaxDateFilter=" + encodeURIComponent(maxDateFilter ? "" + maxDateFilter : "") + "&";
    if (minDateFilter !== undefined && minDateFilter !== null)
      url_ += "MinDateFilter=" + encodeURIComponent(minDateFilter ? "" + minDateFilter : "") + "&";
    if (inboundCallFilter !== undefined && inboundCallFilter !== null)
      url_ += "InboundCallFilter=" + encodeURIComponent("" + inboundCallFilter) + "&";
    if (phoneNumberFilter !== undefined && phoneNumberFilter !== null)
      url_ += "PhoneNumberFilter=" + encodeURIComponent("" + phoneNumberFilter) + "&";
    if (voiceMailFilter !== undefined && voiceMailFilter !== null)
      url_ += "VoiceMailFilter=" + encodeURIComponent("" + voiceMailFilter) + "&";
    if (commentsFilter !== undefined && commentsFilter !== null)
      url_ += "CommentsFilter=" + encodeURIComponent("" + commentsFilter) + "&";
    if (callAgainTodayFilter !== undefined && callAgainTodayFilter !== null)
      url_ += "CallAgainTodayFilter=" + encodeURIComponent("" + callAgainTodayFilter) + "&";
    if (callAgainDateFilter !== undefined && callAgainDateFilter !== null)
      url_ += "CallAgainDateFilter=" + encodeURIComponent("" + callAgainDateFilter) + "&";
    if (callAgainTimeFilter !== undefined && callAgainTimeFilter !== null)
      url_ += "CallAgainTimeFilter=" + encodeURIComponent("" + callAgainTimeFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
      url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (phoneCallObjetiveObjetiveNameFilter !== undefined && phoneCallObjetiveObjetiveNameFilter !== null)
      url_ += "PhoneCallObjetiveObjetiveNameFilter=" + encodeURIComponent("" + phoneCallObjetiveObjetiveNameFilter) + "&";
    if (contactPhoneCallOutcomeOutcomeFilter !== undefined && contactPhoneCallOutcomeOutcomeFilter !== null)
      url_ += "ContactPhoneCallOutcomeOutcomeFilter=" + encodeURIComponent("" + contactPhoneCallOutcomeOutcomeFilter) + "&";
    if (businessActionScriptContentScriptFilter !== undefined && businessActionScriptContentScriptFilter !== null)
      url_ += "BusinessActionScriptContentScriptFilter=" + encodeURIComponent("" + businessActionScriptContentScriptFilter) + "&";
    if (phoneCallObjetiveObjetiveName2Filter !== undefined && phoneCallObjetiveObjetiveName2Filter !== null)
      url_ += "PhoneCallObjetiveObjetiveName2Filter=" + encodeURIComponent("" + phoneCallObjetiveObjetiveName2Filter) + "&";
    if (leadTempratureFilter !== undefined && leadTempratureFilter !== null)
      url_ += "LeadTempratureFilter=" + encodeURIComponent("" + leadTempratureFilter) + "&";
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


  createOrEdit(body: CreateOrEditContactPhoneCallHistoryDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getContactPhoneCallHistoryForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/GetContactPhoneCallHistoryForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllContactForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/GetAllContactForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/GetAllUserForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllPhoneCallObjetiveForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/GetAllPhoneCallObjetiveForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllContactPhoneCallOutcomeForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/GetAllContactPhoneCallOutcomeForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllBusinessActionScriptForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactPhoneCallHistories/GetAllBusinessActionScriptForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditContactPhoneCallHistoryDto {
  inboundCall!: boolean;
  phoneNumber!: string;
  voiceMail!: boolean;
  comments!: string;
  htmlComments!: string | undefined;
  callAgainToday!: boolean;
  callAgainDate!: string | undefined;
  callAgainTime!: string | undefined;
  contactId!: number | undefined;
  userId!: number | undefined;
  phoneCallObjetiveId!: number | undefined;
  contactPhoneCallOutcomeId!: number | undefined;
  businessActionScriptId!: string | undefined;
  nextPhoneCallObjetiveId!: number | undefined;
  contactPhoneCallHistoryObjections!: CreateOrEditContactPhoneCallHistoryObjectionDto[] | undefined;
  id!: number | undefined;
}

export class CreateOrEditContactPhoneCallHistoryObjectionDto {
  comments!: string;
  contactPhoneCallHistoryId!: number | undefined;
  objectionEntityId!: number;
  id!: string | undefined;

}
