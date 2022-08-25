import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, toFilter: string | null | undefined, titleFilter: string | null | undefined, subTitleFilter: string | null | undefined, typeFilter: string | null | undefined, bodyFilter: string | null | undefined, maxUserIdFilter: number | null | undefined, minUserIdFilter: number | null | undefined, priorityFilter: string | null | undefined, maxContactIdFilter: number | null | undefined, minContactIdFilter: number | null | undefined, isSentFilter: number | null | undefined, maxScheduleDatetimeFilter: Date | null | undefined, minScheduleDatetimeFilter: Date | null | undefined, maxCreatedOnFilter: Date | null | undefined, minCreatedOnFilter: Date | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PushNotificationHistories/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (toFilter !== undefined && toFilter !== null)
      url_ += "ToFilter=" + encodeURIComponent("" + toFilter) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
      url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (subTitleFilter !== undefined && subTitleFilter !== null)
      url_ += "SubTitleFilter=" + encodeURIComponent("" + subTitleFilter) + "&";
    if (typeFilter !== undefined && typeFilter !== null)
      url_ += "TypeFilter=" + encodeURIComponent("" + typeFilter) + "&";
    if (bodyFilter !== undefined && bodyFilter !== null)
      url_ += "BodyFilter=" + encodeURIComponent("" + bodyFilter) + "&";
    if (maxUserIdFilter !== undefined && maxUserIdFilter !== null)
      url_ += "MaxUserIdFilter=" + encodeURIComponent("" + maxUserIdFilter) + "&";
    if (minUserIdFilter !== undefined && minUserIdFilter !== null)
      url_ += "MinUserIdFilter=" + encodeURIComponent("" + minUserIdFilter) + "&";
    if (priorityFilter !== undefined && priorityFilter !== null)
      url_ += "priorityFilter=" + encodeURIComponent("" + priorityFilter) + "&";
    if (maxContactIdFilter !== undefined && maxContactIdFilter !== null)
      url_ += "MaxContactIdFilter=" + encodeURIComponent("" + maxContactIdFilter) + "&";
    if (minContactIdFilter !== undefined && minContactIdFilter !== null)
      url_ += "MinContactIdFilter=" + encodeURIComponent("" + minContactIdFilter) + "&";
    if (isSentFilter !== undefined && isSentFilter !== null)
      url_ += "IsSentFilter=" + encodeURIComponent("" + isSentFilter) + "&";
    if (maxScheduleDatetimeFilter !== undefined && maxScheduleDatetimeFilter !== null)
      url_ += "MaxScheduleDatetimeFilter=" + encodeURIComponent(maxScheduleDatetimeFilter ? "" + maxScheduleDatetimeFilter.toJSON() : "") + "&";
    if (minScheduleDatetimeFilter !== undefined && minScheduleDatetimeFilter !== null)
      url_ += "MinScheduleDatetimeFilter=" + encodeURIComponent(minScheduleDatetimeFilter ? "" + minScheduleDatetimeFilter.toJSON() : "") + "&";
    if (maxCreatedOnFilter !== undefined && maxCreatedOnFilter !== null)
      url_ += "MaxCreatedOnFilter=" + encodeURIComponent(maxCreatedOnFilter ? "" + maxCreatedOnFilter.toJSON() : "") + "&";
    if (minCreatedOnFilter !== undefined && minCreatedOnFilter !== null)
      url_ += "MinCreatedOnFilter=" + encodeURIComponent(minCreatedOnFilter ? "" + minCreatedOnFilter.toJSON() : "") + "&";
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

  createOrEdit(body: CreateOrEditPushNotificationHistoryDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PushNotificationHistories/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getPushNotificationHistoryForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PushNotificationHistories/GetPushNotificationHistoryForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PushNotificationHistories/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
}

export class CreateOrEditPushNotificationHistoryDto {
  to!: string | undefined;
  title!: string | undefined;
  subTitle!: string | undefined;
  type!: string | undefined;
  body!: string | undefined;
  userId!: number | undefined;
  priority!: string | undefined;
  contactId!: number | undefined;
  isSent!: boolean;
  scheduleDatetime!: Date | undefined;
  createdOn!: Date;
  id!: string | undefined;
}