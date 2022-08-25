import { Injectable } from "@angular/core";
import { DashboardCustomizationConst } from "./DashboardCustomizationConsts";
import { WidgetFilterViewDefinition, WidgetViewDefinition } from "./definitions";
import { FilterDateRangePickerComponent } from "./filters/filter-date-range-picker/filter-date-range-picker.component";
import { FilterProjectComponent } from "./filters/filter-project/filter-project.component";
import { WidgetAppointmentsComponent } from "./widgets/widget-appointments/widget-appointments.component";
import { WidgetBugBySeverityComponent } from "./widgets/widget-bug-by-severity/widget-bug-by-severity.component";
import { WidgetBugByStatusComponent } from "./widgets/widget-bug-by-status/widget-bug-by-status.component";
import { WidgetDailySalesComponent } from "./widgets/widget-daily-sales/widget-daily-sales.component";
import { WidgetEditionStatisticsComponent } from "./widgets/widget-edition-statistics/widget-edition-statistics.component";
import { WidgetEmailsCountComponent } from "./widgets/widget-emails-count/widget-emails-count.component";
import { WidgetGeneralStatsComponent } from "./widgets/widget-general-stats/widget-general-stats.component";
import { WidgetHostTopStatsComponent } from "./widgets/widget-host-top-stats/widget-host-top-stats.component";
import { WidgetIncomeStatisticsComponent } from "./widgets/widget-income-statistics/widget-income-statistics.component";
import { WidgetIncomeComponent } from "./widgets/widget-income/widget-income.component";
import { WidgetLastFiftyCancelSubscriptionsComponent } from "./widgets/widget-last-fifty-cancel-subscriptions/widget-last-fifty-cancel-subscriptions.component";
import { WidgetLastFiftyMembersComponent } from "./widgets/widget-last-fifty-members/widget-last-fifty-members.component";
import { WidgetLastFiftyNewContactsComponent } from "./widgets/widget-last-fifty-new-contacts/widget-last-fifty-new-contacts.component";
import { WidgetLastFiftySubscriptionsComponent } from "./widgets/widget-last-fifty-subscriptions/widget-last-fifty-subscriptions.component";
import { WidgetLastThreeMothSubscriptionsComponent } from "./widgets/widget-last-three-moth-subscriptions/widget-last-three-moth-subscriptions.component";
import { WidgetLastTwentyEstimatesComponent } from "./widgets/widget-last-twenty-estimates/widget-last-twenty-estimates.component";
import { WidgetLastTwentyInvoicesComponent } from "./widgets/widget-last-twenty-invoices/widget-last-twenty-invoices.component";
import { WidgetListOfBugsComponent } from "./widgets/widget-list-of-bugs/widget-list-of-bugs.component";
import { WidgetMemberActivityComponent } from "./widgets/widget-member-activity/widget-member-activity.component";
import { WidgetNewClientComponent } from "./widgets/widget-new-client/widget-new-client.component";
import { WidgetNewEstimatesComponent } from "./widgets/widget-new-estimates/widget-new-estimates.component";
import { WidgetNewInvoicesComponent } from "./widgets/widget-new-invoices/widget-new-invoices.component";
import { WidgetNewTenantsComponent } from "./widgets/widget-new-tenants/widget-new-tenants.component";
import { WidgetOverAllProgressComponent } from "./widgets/widget-over-all-progress/widget-over-all-progress.component";
import { WidgetOverdueStoriesComponent } from "./widgets/widget-overdue-stories/widget-overdue-stories.component";
import { WidgetOverdueTasksComponent } from "./widgets/widget-overdue-tasks/widget-overdue-tasks.component";
import { WidgetProfitShareComponent } from "./widgets/widget-profit-share/widget-profit-share.component";
import { WidgetRecentTenantsComponent } from "./widgets/widget-recent-tenants/widget-recent-tenants.component";
import { WidgetRegionalStatsComponent } from "./widgets/widget-regional-stats/widget-regional-stats.component";
import { WidgetRemaingDaysComponent } from "./widgets/widget-remaing-days/widget-remaing-days.component";
import { WidgetSalesSummaryComponent } from "./widgets/widget-sales-summary/widget-sales-summary.component";
import { WidgetSmsCountComponent } from "./widgets/widget-sms-count/widget-sms-count.component";
import { WidgetSprintDatesComponent } from "./widgets/widget-sprint-dates/widget-sprint-dates.component";
import { WidgetStoriesByStageComponent } from "./widgets/widget-stories-by-stage/widget-stories-by-stage.component";
import { WidgetStoryStagesComponent } from "./widgets/widget-story-stages/widget-story-stages.component";
import { WidgetStoryTaskBugComponent } from "./widgets/widget-story-task-bug/widget-story-task-bug.component";
import { WidgetSubscriptionExpiringTenantsComponent } from "./widgets/widget-subscription-expiring-tenants/widget-subscription-expiring-tenants.component";
import { WidgetTenantTrialSubscriptionsComponent } from "./widgets/widget-tenant-trial-subscriptions/widget-tenant-trial-subscriptions.component";
import { WidgetTopStatsComponent } from "./widgets/widget-top-stats/widget-top-stats.component";
import { WidgetTotalMembersComponent } from "./widgets/widget-total-members/widget-total-members.component";
import { WidgetTotalOverdueTasksCountComponent } from "./widgets/widget-total-overdue-tasks-count/widget-total-overdue-tasks-count.component";


@Injectable({
  providedIn: 'root'
})
export class DashboardViewConfigurationService {
  public WidgetViewDefinitions: WidgetViewDefinition[] = [];
  public widgetFilterDefinitions: WidgetFilterViewDefinition[] = [];

  constructor(
  ) {
    this.initializeConfiguration();
  }

  private initializeConfiguration() {
    let filterDateRangePicker = new WidgetFilterViewDefinition(
      DashboardCustomizationConst.filters.filterDateRangePicker,
      FilterDateRangePickerComponent
    );
    let filterProject = new WidgetFilterViewDefinition(
      DashboardCustomizationConst.filters.filterProject,
      FilterProjectComponent
    );
    //add your filters here
    this.widgetFilterDefinitions.push(filterDateRangePicker);
    this.widgetFilterDefinitions.push(filterProject);

    let generalStats = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.generalStats,
      WidgetGeneralStatsComponent,
      6,
      4
    );

    let dailySales = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.dailySales,
      WidgetDailySalesComponent,
    );

    let profitShare = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.profitShare,
      WidgetProfitShareComponent
    );

    let memberActivity = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.memberActivity,
      WidgetMemberActivityComponent,
    );

    let regionalStats = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.regionalStats,
      WidgetRegionalStatsComponent
    );

    let salesSummary = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.salesSummary,
      WidgetSalesSummaryComponent,
    );

    let topStats = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.topStats,
      WidgetTopStatsComponent,
    );
    //add your tenant side widgets here
    let bugBySeverity = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.bugBySeverity,
      WidgetBugBySeverityComponent,
    );

    let bugByStatus = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.bugByStatus,
      WidgetBugByStatusComponent,
    );
    let storiesByStage = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.storiesByStage,
      WidgetStoriesByStageComponent
    );
    let listOfBugs = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.listOfBugs,
      WidgetListOfBugsComponent
    );
    let overdueTasks = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.overdueTasks,
      WidgetOverdueTasksComponent
    );
    let overdueStories = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.overdueStories,
      WidgetOverdueStoriesComponent
    );
    let overAllProgress = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.overAllProgress,
      WidgetOverAllProgressComponent
    );
    let sprintDates = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.sprintDates,
      WidgetSprintDatesComponent
    );
    let storyStages = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.storyStages,
      WidgetStoryStagesComponent
    );
    let totalOverdueTaskCount = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.totalOverdueTaskCount,
      WidgetTotalOverdueTasksCountComponent
    );
    let remainingDays = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.remainingDays,
      WidgetRemaingDaysComponent
    );
    let storyTaskBugCompleted = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.storyTaskBugCompleted,
      WidgetStoryTaskBugComponent
    );

    let last50NewContacts = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.last50NewContacts,
      WidgetLastFiftyNewContactsComponent
    );

    let last20Invoices = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.last20Invoices,
      WidgetLastTwentyInvoicesComponent
    );

    let last20Estimates = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.last20Estimates,
      WidgetLastTwentyEstimatesComponent
    );
    let appointments = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.appointments,
      WidgetAppointmentsComponent
    );
    let newEstimates = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.newEstimates,
      WidgetNewEstimatesComponent
    );
    let newInvoices = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.newInvoices,
      WidgetNewInvoicesComponent
    );
    let income = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.income,
      WidgetIncomeComponent
    );
    let smsCount = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.smsCount,
      WidgetSmsCountComponent
    );
    let emailCount = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.emailCount,
      WidgetEmailsCountComponent
    );
    let newClients = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.tenant.newClients,
      WidgetNewClientComponent
    );

    //host widgets
    let incomeStatistics = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.incomeStatistics,
      WidgetIncomeStatisticsComponent,
    );

    let editionStatistics = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.editionStatistics,
      WidgetEditionStatisticsComponent,
    );

    let recentTenants = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.recentTenants,
      WidgetRecentTenantsComponent,
    );

    let subscriptionExpiringTenants = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.subscriptionExpiringTenants,
      WidgetSubscriptionExpiringTenantsComponent
    );

    let hostTopStats = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.topStats,
      WidgetHostTopStatsComponent,
    );
    //add your host side widgets here
    let newTenants = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.newTenants,
      WidgetNewTenantsComponent,
    );
    let trials = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.trials,
      WidgetTenantTrialSubscriptionsComponent,
    );
    let last50Members = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.last50Members,
      WidgetLastFiftyMembersComponent,
    );
    let totalMembers = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.totalMembers,
      WidgetTotalMembersComponent,
    );
    let last50Subscriptions = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.last50Subscriptions,
      WidgetLastFiftySubscriptionsComponent,
    );
    let last3MonthNewCancelActive = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.last3MonthNewCancelActive,
      WidgetLastThreeMothSubscriptionsComponent,
    );
    let last50CancelledSubscriptions = new WidgetViewDefinition(
      DashboardCustomizationConst.widgets.host.last50CancelledSubscriptions,
      WidgetLastFiftyCancelSubscriptionsComponent,
    );

    //register definitions here
    this.WidgetViewDefinitions.push(generalStats);
    this.WidgetViewDefinitions.push(dailySales);
    this.WidgetViewDefinitions.push(profitShare);
    this.WidgetViewDefinitions.push(memberActivity);
    this.WidgetViewDefinitions.push(regionalStats);
    this.WidgetViewDefinitions.push(salesSummary);
    this.WidgetViewDefinitions.push(topStats);
    this.WidgetViewDefinitions.push(incomeStatistics);
    this.WidgetViewDefinitions.push(editionStatistics);
    this.WidgetViewDefinitions.push(recentTenants);
    this.WidgetViewDefinitions.push(subscriptionExpiringTenants);
    this.WidgetViewDefinitions.push(hostTopStats);

    //register definitions
    this.WidgetViewDefinitions.push(bugBySeverity);
    this.WidgetViewDefinitions.push(bugByStatus);
    this.WidgetViewDefinitions.push(storiesByStage);
    this.WidgetViewDefinitions.push(listOfBugs);
    this.WidgetViewDefinitions.push(overdueTasks);
    this.WidgetViewDefinitions.push(overdueStories);
    this.WidgetViewDefinitions.push(overAllProgress);
    this.WidgetViewDefinitions.push(sprintDates);
    this.WidgetViewDefinitions.push(storyStages);
    this.WidgetViewDefinitions.push(totalOverdueTaskCount);
    this.WidgetViewDefinitions.push(remainingDays);
    this.WidgetViewDefinitions.push(storyTaskBugCompleted);
    this.WidgetViewDefinitions.push(last50NewContacts);
    this.WidgetViewDefinitions.push(last20Invoices);
    this.WidgetViewDefinitions.push(last20Estimates);
    this.WidgetViewDefinitions.push(appointments);
    this.WidgetViewDefinitions.push(newEstimates);
    this.WidgetViewDefinitions.push(newInvoices);
    this.WidgetViewDefinitions.push(income);
    this.WidgetViewDefinitions.push(smsCount);
    this.WidgetViewDefinitions.push(emailCount);
    this.WidgetViewDefinitions.push(newClients);

    //for host
    this.WidgetViewDefinitions.push(newTenants);
    this.WidgetViewDefinitions.push(trials);
    this.WidgetViewDefinitions.push(last50Members);
    this.WidgetViewDefinitions.push(totalMembers);
    this.WidgetViewDefinitions.push(last50Subscriptions);
    this.WidgetViewDefinitions.push(last3MonthNewCancelActive);
    this.WidgetViewDefinitions.push(last50CancelledSubscriptions);
  }
}
