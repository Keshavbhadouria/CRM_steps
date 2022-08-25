import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HostDashboardService {

  constructor(private http: HttpClient) { }

  getSubscriptionExpiringTenantsData(): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetSubscriptionExpiringTenantsData";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getRecentTenantsData(): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetRecentTenantsData";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getEditionTenantStatistics(startDate: Date | undefined, endDate: Date | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetEditionTenantStatistics?";
    if (startDate === null)
      throw new Error("The parameter 'startDate' cannot be null.");
    else if (startDate !== undefined)
      url_ += "StartDate=" + encodeURIComponent(startDate ? "" + startDate : "") + "&";
    if (endDate === null)
      throw new Error("The parameter 'endDate' cannot be null.");
    else if (endDate !== undefined)
      url_ += "EndDate=" + encodeURIComponent(endDate ? "" + endDate : "") + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getTopStatsData(startDate: Date | undefined, endDate: Date | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetTopStatsData?";
    if (startDate === null)
      throw new Error("The parameter 'startDate' cannot be null.");
    else if (startDate !== undefined)
      url_ += "StartDate=" + encodeURIComponent(startDate ? "" + startDate : "") + "&";
    if (endDate === null)
      throw new Error("The parameter 'endDate' cannot be null.");
    else if (endDate !== undefined)
      url_ += "EndDate=" + encodeURIComponent(endDate ? "" + endDate : "") + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getIncomeStatistics(incomeStatisticsDateInterval: ChartDateInterval, startDate: Date | undefined, endDate: Date | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetIncomeStatistics?";
    if (incomeStatisticsDateInterval === undefined || incomeStatisticsDateInterval === null)
      throw new Error("The parameter 'incomeStatisticsDateInterval' must be defined and cannot be null.");
    else
      url_ += "IncomeStatisticsDateInterval=" + encodeURIComponent("" + incomeStatisticsDateInterval) + "&";
    if (startDate === null)
      throw new Error("The parameter 'startDate' cannot be null.");
    else if (startDate !== undefined)
      url_ += "StartDate=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
    if (endDate === null)
      throw new Error("The parameter 'endDate' cannot be null.");
    else if (endDate !== undefined)
      url_ += "EndDate=" + encodeURIComponent(endDate ? "" + endDate.toJSON() : "") + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getNewTenants(): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetNewTenants";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getLast50Members(): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetLast50Members";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  totalMembers(): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetTotalMembers";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getTenantsWithTrialSubscriptions(): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetTenantsWithTrialSubscriptions";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAll(skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetLast50Subscriptions?";
    
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
  
  getLast50Cancellations(skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetLast50Cancellations?";
    
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

  getLast3MonthSubscriptions(): any {
    let url_ = environment.apiURL + "/api/services/app/HostDashboard/GetLast3MonthSubscriptions";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}

export class GetExpiringTenantsOutput {
  expiringTenants!: ExpiringTenant[] | undefined;
  subscriptionEndAlertDayCount!: number;
  maxExpiringTenantsShownCount!: number;
  subscriptionEndDateStart!: Date;
  subscriptionEndDateEnd!: Date;
}
export class ExpiringTenant {
  tenantName!: string | undefined;
  remainingDayCount!: number;
}

export class GetRecentTenantsOutput {
  recentTenantsDayCount!: number;
  maxRecentTenantsShownCount!: number;
  tenantCreationStartDate!: Date;
  recentTenants!: RecentTenant[] | undefined;
}

export class RecentTenant {
  id!: number;
  name!: string | undefined;
  creationTime!: Date;
}

export class GetEditionTenantStatisticsOutput {
  editionStatistics!: TenantEdition[] | undefined;
}
export class TenantEdition {
  label!: string | undefined;
  value!: number;
}

export class TopStatsData {
  newTenantsCount!: number;
  newSubscriptionAmount!: number;
  dashboardPlaceholder1!: number;
  dashboardPlaceholder2!: number;
}

export enum ChartDateInterval {
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
}