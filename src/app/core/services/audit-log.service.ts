import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  constructor(private http: HttpClient) { }

  getAuditLogs(startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, userName: string | null | undefined, serviceName: string | null | undefined, methodName: string | null | undefined, browserInfo: string | null | undefined, hasException: boolean | null | undefined, minExecutionDuration: number | null | undefined, maxExecutionDuration: number | null | undefined, sorting: string | null | undefined, maxResultCount: number | undefined, skipCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/AuditLog/GetAuditLogs?";
    if (startDate === null)
      throw new Error("The parameter 'startDate' cannot be null.");
    else if (startDate !== undefined)
      url_ += "StartDate=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
    if (endDate === null)
      throw new Error("The parameter 'endDate' cannot be null.");
    else if (endDate !== undefined)
      url_ += "EndDate=" + encodeURIComponent(endDate ? "" + endDate.toJSON() : "") + "&";
    if (userName !== undefined && userName !== null)
      url_ += "UserName=" + encodeURIComponent("" + userName) + "&";
    if (serviceName !== undefined && serviceName !== null)
      url_ += "ServiceName=" + encodeURIComponent("" + serviceName) + "&";
    if (methodName !== undefined && methodName !== null)
      url_ += "MethodName=" + encodeURIComponent("" + methodName) + "&";
    if (browserInfo !== undefined && browserInfo !== null)
      url_ += "BrowserInfo=" + encodeURIComponent("" + browserInfo) + "&";
    if (hasException !== undefined && hasException !== null)
      url_ += "HasException=" + encodeURIComponent("" + hasException) + "&";
    if (minExecutionDuration !== undefined && minExecutionDuration !== null)
      url_ += "MinExecutionDuration=" + encodeURIComponent("" + minExecutionDuration) + "&";
    if (maxExecutionDuration !== undefined && maxExecutionDuration !== null)
      url_ += "MaxExecutionDuration=" + encodeURIComponent("" + maxExecutionDuration) + "&";
    if (sorting !== undefined && sorting !== null)
      url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getEntityHistoryObjectTypes(): any {
    let url_ = environment.apiURL + "/api/services/app/AuditLog/GetEntityHistoryObjectTypes";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getEntityChanges(startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, userName: string | null | undefined, entityTypeFullName: string | null | undefined, sorting: string | null | undefined, maxResultCount: number | undefined, skipCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/AuditLog/GetEntityChanges?";
    if (startDate === null)
      throw new Error("The parameter 'startDate' cannot be null.");
    else if (startDate !== undefined)
      url_ += "StartDate=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
    if (endDate === null)
      throw new Error("The parameter 'endDate' cannot be null.");
    else if (endDate !== undefined)
      url_ += "EndDate=" + encodeURIComponent(endDate ? "" + endDate.toJSON() : "") + "&";
    if (userName !== undefined && userName !== null)
      url_ += "UserName=" + encodeURIComponent("" + userName) + "&";
    if (entityTypeFullName !== undefined && entityTypeFullName !== null)
      url_ += "EntityTypeFullName=" + encodeURIComponent("" + entityTypeFullName) + "&";
    if (sorting !== undefined && sorting !== null)
      url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getEntityTypeChanges(entityTypeFullName: string | null | undefined, entityId: string | null | undefined, sorting: string | null | undefined, maxResultCount: number | undefined, skipCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/AuditLog/GetEntityTypeChanges?";
    if (entityTypeFullName !== undefined && entityTypeFullName !== null)
      url_ += "EntityTypeFullName=" + encodeURIComponent("" + entityTypeFullName) + "&";
    if (entityId !== undefined && entityId !== null)
      url_ += "EntityId=" + encodeURIComponent("" + entityId) + "&";
    if (sorting !== undefined && sorting !== null)
      url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getEntityPropertyChanges(entityChangeId: number | undefined):any {
    let url_ = environment.apiURL + "/api/services/app/AuditLog/GetEntityPropertyChanges?";
    if (entityChangeId === null)
      throw new Error("The parameter 'entityChangeId' cannot be null.");
    else if (entityChangeId !== undefined)
      url_ += "entityChangeId=" + encodeURIComponent("" + entityChangeId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();

  }

}
export class NameValueDto {
  name: string | undefined;
  value: string | undefined;
}
