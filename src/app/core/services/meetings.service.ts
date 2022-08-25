import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, zoomMeetingUrlFilter: string | null | undefined, maxScheduleDateFilter: Date | null | undefined, minScheduleDateFilter: Date | null | undefined, commentsFilter: string | null | undefined, maxMeetingStatusIdFilter: number | null | undefined, minMeetingStatusIdFilter: number | null | undefined, isActiveFilter: number | null | undefined, zoomUUIDFilter: string | null | undefined, zoomMeetingIdFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, userNameFilter: string | null | undefined, meetingTimeSlotsStartTimeFilter: string | null | undefined, meetingDaysLookupDayShortNameFilter: string | null | undefined, contactZoomMeetingAppointmentReasonReasonFilter: string | null | undefined, contactZoomMeetingOutputOutputFilter: string | null | undefined, contactZoomMeetingOutputOutput2Filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (zoomMeetingUrlFilter !== undefined && zoomMeetingUrlFilter !== null)
      url_ += "ZoomMeetingUrlFilter=" + encodeURIComponent("" + zoomMeetingUrlFilter) + "&";
    if (maxScheduleDateFilter !== undefined && maxScheduleDateFilter !== null)
      url_ += "MaxScheduleDateFilter=" + encodeURIComponent(maxScheduleDateFilter ? "" + maxScheduleDateFilter : "") + "&";
    if (minScheduleDateFilter !== undefined && minScheduleDateFilter !== null)
      url_ += "MinScheduleDateFilter=" + encodeURIComponent(minScheduleDateFilter ? "" + minScheduleDateFilter : "") + "&";
    if (commentsFilter !== undefined && commentsFilter !== null)
      url_ += "CommentsFilter=" + encodeURIComponent("" + commentsFilter) + "&";
    if (maxMeetingStatusIdFilter !== undefined && maxMeetingStatusIdFilter !== null)
      url_ += "MaxMeetingStatusIdFilter=" + encodeURIComponent("" + maxMeetingStatusIdFilter) + "&";
    if (minMeetingStatusIdFilter !== undefined && minMeetingStatusIdFilter !== null)
      url_ += "MinMeetingStatusIdFilter=" + encodeURIComponent("" + minMeetingStatusIdFilter) + "&";
    if (isActiveFilter !== undefined && isActiveFilter !== null)
      url_ += "IsActiveFilter=" + encodeURIComponent("" + isActiveFilter) + "&";
    if (zoomUUIDFilter !== undefined && zoomUUIDFilter !== null)
      url_ += "ZoomUUIDFilter=" + encodeURIComponent("" + zoomUUIDFilter) + "&";
    if (zoomMeetingIdFilter !== undefined && zoomMeetingIdFilter !== null)
      url_ += "ZoomMeetingIdFilter=" + encodeURIComponent("" + zoomMeetingIdFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
      url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (meetingTimeSlotsStartTimeFilter !== undefined && meetingTimeSlotsStartTimeFilter !== null)
      url_ += "MeetingTimeSlotsStartTimeFilter=" + encodeURIComponent("" + meetingTimeSlotsStartTimeFilter) + "&";
    if (meetingDaysLookupDayShortNameFilter !== undefined && meetingDaysLookupDayShortNameFilter !== null)
      url_ += "MeetingDaysLookupDayShortNameFilter=" + encodeURIComponent("" + meetingDaysLookupDayShortNameFilter) + "&";
    if (contactZoomMeetingAppointmentReasonReasonFilter !== undefined && contactZoomMeetingAppointmentReasonReasonFilter !== null)
      url_ += "ContactZoomMeetingAppointmentReasonReasonFilter=" + encodeURIComponent("" + contactZoomMeetingAppointmentReasonReasonFilter) + "&";
    if (contactZoomMeetingOutputOutputFilter !== undefined && contactZoomMeetingOutputOutputFilter !== null)
      url_ += "ContactZoomMeetingOutputOutputFilter=" + encodeURIComponent("" + contactZoomMeetingOutputOutputFilter) + "&";
    if (contactZoomMeetingOutputOutput2Filter !== undefined && contactZoomMeetingOutputOutput2Filter !== null)
      url_ += "ContactZoomMeetingOutputOutput2Filter=" + encodeURIComponent("" + contactZoomMeetingOutputOutput2Filter) + "&";
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

  createOrEdit(body: CreateOrEditContactZoomCallMeetingDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getContactZoomCallMeetingForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetContactZoomCallMeetingForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllContactForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetAllContactForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllMeetingTimeSlotsForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetAllMeetingTimeSlotsForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllMeetingDaysLookupForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetAllMeetingDaysLookupForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllContactZoomMeetingAppointmentReasonForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetAllContactZoomMeetingAppointmentReasonForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllContactZoomMeetingOutputForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetAllContactZoomMeetingOutputForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditContactZoomCallMeetingDto {
  zoomMeetingUrl!: string | undefined;
  scheduleDate!: Date;
  comments!: string | undefined;
  meetingStatusId!: number;
  isActive!: boolean;
  contactId!: number | undefined;
  userId!: number | undefined;
  meetingTimeSlotsId!: number | undefined;
  meetingDaysLookupId!: number | undefined;
  appointmentReasonId!: number | undefined;
  expectedOutputId!: number | undefined;
  actualOutputId!: number | undefined;
  id!: string | undefined;
}