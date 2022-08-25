import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactZoomMeetingService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get


  getAll(filter: string | null | undefined, zoomMeetingUrlFilter: string | null | undefined, maxScheduleDateFilter: moment.Moment | null | undefined, minScheduleDateFilter: moment.Moment | null | undefined, commentsFilter: string | null | undefined, maxMeetingStatusIdFilter: number | null | undefined, minMeetingStatusIdFilter: number | null | undefined, isActiveFilter: number | null | undefined, zoomUUIDFilter: string | null | undefined, zoomMeetingIdFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, userNameFilter: string | null | undefined, meetingTimeSlotsStartTimeFilter: string | null | undefined, meetingDaysLookupDayShortNameFilter: string | null | undefined, contactZoomMeetingAppointmentReasonReasonFilter: string | null | undefined, contactZoomMeetingOutputOutputFilter: string | null | undefined, contactZoomMeetingOutputOutput2Filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactZoomCallMeetings/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (zoomMeetingUrlFilter !== undefined && zoomMeetingUrlFilter !== null)
        url_ += "ZoomMeetingUrlFilter=" + encodeURIComponent("" + zoomMeetingUrlFilter) + "&";
    if (maxScheduleDateFilter !== undefined && maxScheduleDateFilter !== null)
        url_ += "MaxScheduleDateFilter=" + encodeURIComponent(maxScheduleDateFilter ? "" + maxScheduleDateFilter.toJSON() : "") + "&";
    if (minScheduleDateFilter !== undefined && minScheduleDateFilter !== null)
        url_ += "MinScheduleDateFilter=" + encodeURIComponent(minScheduleDateFilter ? "" + minScheduleDateFilter.toJSON() : "") + "&";
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
}
