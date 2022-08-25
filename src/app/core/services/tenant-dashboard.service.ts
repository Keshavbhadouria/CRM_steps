import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantDashboardService {

  constructor(private http: HttpClient) { }

  // getMemberActivity(userId: number): any {
  //   let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetMemberActivity";

  //   if (userId !== undefined && userId !== null)
  //     url_ += "taskId=" + encodeURIComponent("" + userId) + "&";

  //   url_ = url_.replace(/[?&]$/, "");

  //   return this.http.get<any>(url_).toPromise();
  // }

  getMemberActivity(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetMemberActivity";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getDashboardData(salesSummaryDatePeriod: SalesSummaryDatePeriod): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetDashboardData?";

    if (salesSummaryDatePeriod === undefined || salesSummaryDatePeriod === null)
      throw new Error("The parameter 'salesSummaryDatePeriod' must be defined and cannot be null.");
    else
      url_ += "SalesSummaryDatePeriod=" + encodeURIComponent("" + salesSummaryDatePeriod) + "&";
    url_ = url_.replace(/[?&]$/, "");

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getDailySales(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetDailySales";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getGeneralStats(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetGeneralStats";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getProfitShare(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetProfitShare";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getTopStats(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetTopStats";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getSalesSummary(salesSummaryDatePeriod: SalesSummaryDatePeriod): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetSalesSummary?";
    if (salesSummaryDatePeriod === undefined || salesSummaryDatePeriod === null)
      throw new Error("The parameter 'salesSummaryDatePeriod' must be defined and cannot be null.");
    else
      url_ += "SalesSummaryDatePeriod=" + encodeURIComponent("" + salesSummaryDatePeriod) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getRegionalStats(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetRegionalStats";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  //project dashboard
  getProjects(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetProjects";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getActiveSprintByProject(projectId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetActiveSprintByProject?";

    if (projectId === undefined || projectId === null)
      throw new Error("The parameter 'project id' must be defined and cannot be null.");
    else
      url_ += "projectId=" + encodeURIComponent("" + projectId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getBugsBySeverity(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetBugsBySeverity?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getBugsByStatus(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetBugsByStatus?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getStoriesByStage(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetStoriesByStage?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getListOfBugs(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetListOfBugs?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getOverdueTasks(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetOverdueTasks?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  GetOverdueStories(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetOverdueStories?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getOverallProgress(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetOverallProgress?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getSprintDates(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetSprintDates?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getStoryStages(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetStoryStages?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getOverdueTasksCount(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetOverdueTasksCount?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getRemainingDays(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetRemainingDays?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getStoriesTasksAndBugs(sprintId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetStoriesTasksAndBugs?";

    if (sprintId !== undefined)
      url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  //sales dashboard
  getLast50NewContacts(startDate: any, endDate: any, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetLast50NewContacts?";

    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";

    debugger;
    if (startDate !== undefined && startDate !== null)
      url_ += "StartDate=" + encodeURIComponent(startDate ? "" + startDate : "") + "&";

    if (endDate !== undefined && endDate !== null)
      url_ += "EndDate=" + encodeURIComponent(endDate ? "" + endDate : "") + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getLast20Invoices(skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetLast20Invoices?";

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
  getLast20Estimates(skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetLast20Estimates?";

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
  getAppointments(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetAppointments?";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getNewEstimates(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetNewEstimates?";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getNewInvoices(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetNewInvoices?";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getIncomeDetails(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetIncome?";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  getSMSCount(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetSMSCount?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
  getEmailsCount(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetEmailsCount?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }
  getNewClients(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetNewClients?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  //transaction dashboard
  getPaymentPlanByDayWeekMonth(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetPaymentPlanByDayWeekMonth?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getSuccessfulPayments(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetSuccessfulPayments?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getFailurePayments(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetFailurePayments?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getReasonToFailures(skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetReasonToFailures?";

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

  getGatewayBehaviours(skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetGatewayBehaviours?";

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

  getRefundByDayWeekMonth(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/GetRefundByDayWeekMonth?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  test(): any {
    let url_ = environment.apiURL + "/api/services/app/TenantDashboard/Test?culture=en&ui-culture=en";
    url_ = url_.replace(/[?&]$/, "");
    let body = '';
    return this.http.post<any>(url_, body).toPromise();
  }
}
export enum SalesSummaryDatePeriod {
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
}