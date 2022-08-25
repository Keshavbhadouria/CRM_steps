import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingsTimeSlotService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, maxTimeOrderFilter: number | null | undefined, minTimeOrderFilter: number | null | undefined, startTimeFilter: string | null | undefined, endTimeFilter: string | null | undefined, meetingDaysNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/MeetingTimeSlots/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxTimeOrderFilter !== undefined && maxTimeOrderFilter !== null)
        url_ += "MaxTimeOrderFilter=" + encodeURIComponent("" + maxTimeOrderFilter) + "&";
    if (minTimeOrderFilter !== undefined && minTimeOrderFilter !== null)
        url_ += "MinTimeOrderFilter=" + encodeURIComponent("" + minTimeOrderFilter) + "&";
    if (startTimeFilter !== undefined && startTimeFilter !== null)
        url_ += "StartTimeFilter=" + encodeURIComponent("" + startTimeFilter) + "&";
    if (endTimeFilter !== undefined && endTimeFilter !== null)
        url_ += "EndTimeFilter=" + encodeURIComponent("" + endTimeFilter) + "&";
    if (meetingDaysNameFilter !== undefined && meetingDaysNameFilter !== null)
        url_ += "MeetingDaysNameFilter=" + encodeURIComponent("" + meetingDaysNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditMeetingTimeSlotsDto | undefined):any {
    
    let url_ = environment.apiURL + "/api/services/app/MeetingTimeSlots/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

 

  delete(id: number | undefined):any {
    let url_ = environment.apiURL + "/api/services/app/MeetingTimeSlots/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  getAllLawyers(): any {
    let url_ = environment.apiURL + "/api/services/app/User/GetAllLawyers";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
}

getMeetingDaysByLawyerId(agentId: number | undefined):any {
  let url_ = environment.apiURL + "/api/services/app/MeetingDays/GetMeetingDaysByLawyerId?";
  if (agentId === null)
      throw new Error("The parameter 'agentId' cannot be null.");
  else if (agentId !== undefined)
      url_ += "agentId=" + encodeURIComponent("" + agentId) + "&";
  url_ = url_.replace(/[?&]$/, "");
  return this.http.get<any>(url_).toPromise();
}

createOrEditMeetingDays(body: CreateOrEditMeetingDaysDto | undefined):any {
  let url_ = environment.apiURL + "/api/services/app/MeetingDays/CreateOrEdit";
  url_ = url_.replace(/[?&]$/, "");

  const content_ = JSON.stringify(body);
  return this.http.post<any>(url_, body).toPromise();
}
  //dropdown
 
}

export class CreateOrEditMeetingTimeSlotsDto {
  timeOrder: number;
  startTime: string | undefined;
  endTime: string | undefined;
  meetingDaysId: number;
  id: number | undefined;
}
export class CreateOrEditMeetingDaysDto {
  name: string;
  meetingDaysLookupId: number;
  userId: number;
  id: number | undefined;
}