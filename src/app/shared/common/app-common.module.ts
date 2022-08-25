import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginatorModule } from "primeng/paginator";
import { TableModule } from "primeng/table";
import { SharedModule } from "../shared.module";
import { AddWidgetModalComponent } from "./customizable-dashboard/add-widget-modal/add-widget-modal.component";
import { CustomizableDashboardComponent } from "./customizable-dashboard/customizable-dashboard.component";
import { DashboardViewConfigurationService } from "./customizable-dashboard/dashboard-view-configuration.service";
import { FilterDateRangePickerComponent } from "./customizable-dashboard/filters/filter-date-range-picker/filter-date-range-picker.component";
import { WidgetDailySalesComponent } from "./customizable-dashboard/widgets/widget-daily-sales/widget-daily-sales.component";
import { WidgetEditionStatisticsComponent } from "./customizable-dashboard/widgets/widget-edition-statistics/widget-edition-statistics.component";
import { WidgetGeneralStatsComponent } from "./customizable-dashboard/widgets/widget-general-stats/widget-general-stats.component";
import { WidgetHostTopStatsComponent } from "./customizable-dashboard/widgets/widget-host-top-stats/widget-host-top-stats.component";
import { WidgetIncomeStatisticsComponent } from "./customizable-dashboard/widgets/widget-income-statistics/widget-income-statistics.component";
import { WidgetMemberActivityComponent } from "./customizable-dashboard/widgets/widget-member-activity/widget-member-activity.component";
import { WidgetProfitShareComponent } from "./customizable-dashboard/widgets/widget-profit-share/widget-profit-share.component";
import { WidgetRecentTenantsComponent } from "./customizable-dashboard/widgets/widget-recent-tenants/widget-recent-tenants.component";
import { WidgetRegionalStatsComponent } from "./customizable-dashboard/widgets/widget-regional-stats/widget-regional-stats.component";
import { WidgetSalesSummaryComponent } from "./customizable-dashboard/widgets/widget-sales-summary/widget-sales-summary.component";
import { WidgetSubscriptionExpiringTenantsComponent } from "./customizable-dashboard/widgets/widget-subscription-expiring-tenants/widget-subscription-expiring-tenants.component";
import { WidgetTopStatsComponent } from "./customizable-dashboard/widgets/widget-top-stats/widget-top-stats.component";
import { GridsterModule } from 'angular-gridster2';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { CountoModule } from 'angular2-counto';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WidgetBugBySeverityComponent } from './customizable-dashboard/widgets/widget-bug-by-severity/widget-bug-by-severity.component';
import { WidgetBugByStatusComponent } from './customizable-dashboard/widgets/widget-bug-by-status/widget-bug-by-status.component';
import { FilterProjectComponent } from './customizable-dashboard/filters/filter-project/filter-project.component';
import { WidgetStoriesByStageComponent } from './customizable-dashboard/widgets/widget-stories-by-stage/widget-stories-by-stage.component';
import { WidgetListOfBugsComponent } from './customizable-dashboard/widgets/widget-list-of-bugs/widget-list-of-bugs.component';
import { WidgetOverdueTasksComponent } from './customizable-dashboard/widgets/widget-overdue-tasks/widget-overdue-tasks.component';
import { WidgetOverdueStoriesComponent } from './customizable-dashboard/widgets/widget-overdue-stories/widget-overdue-stories.component';
import { WidgetOverAllProgressComponent } from './customizable-dashboard/widgets/widget-over-all-progress/widget-over-all-progress.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { WidgetSprintDatesComponent } from './customizable-dashboard/widgets/widget-sprint-dates/widget-sprint-dates.component';
import { WidgetStoryStagesComponent } from './customizable-dashboard/widgets/widget-story-stages/widget-story-stages.component';
import { WidgetTotalOverdueTasksCountComponent } from './customizable-dashboard/widgets/widget-total-overdue-tasks-count/widget-total-overdue-tasks-count.component';
import { WidgetRemaingDaysComponent } from './customizable-dashboard/widgets/widget-remaing-days/widget-remaing-days.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { WidgetStoryTaskBugComponent } from "./customizable-dashboard/widgets/widget-story-task-bug/widget-story-task-bug.component";
import { WidgetNewTenantsComponent } from './customizable-dashboard/widgets/widget-new-tenants/widget-new-tenants.component';
import { WidgetLastFiftyMembersComponent } from './customizable-dashboard/widgets/widget-last-fifty-members/widget-last-fifty-members.component';
import { WidgetTotalMembersComponent } from './customizable-dashboard/widgets/widget-total-members/widget-total-members.component';
import { WidgetTenantTrialSubscriptionsComponent } from './customizable-dashboard/widgets/widget-tenant-trial-subscriptions/widget-tenant-trial-subscriptions.component';
import { WidgetLastFiftySubscriptionsComponent } from './customizable-dashboard/widgets/widget-last-fifty-subscriptions/widget-last-fifty-subscriptions.component';
import { WidgetLastThreeMothSubscriptionsComponent } from './customizable-dashboard/widgets/widget-last-three-moth-subscriptions/widget-last-three-moth-subscriptions.component';
import { WidgetLastFiftyCancelSubscriptionsComponent } from './customizable-dashboard/widgets/widget-last-fifty-cancel-subscriptions/widget-last-fifty-cancel-subscriptions.component';
import { WidgetLastFiftyNewContactsComponent } from './customizable-dashboard/widgets/widget-last-fifty-new-contacts/widget-last-fifty-new-contacts.component';
import { WidgetLastTwentyInvoicesComponent } from './customizable-dashboard/widgets/widget-last-twenty-invoices/widget-last-twenty-invoices.component';
import { WidgetLastTwentyEstimatesComponent } from './customizable-dashboard/widgets/widget-last-twenty-estimates/widget-last-twenty-estimates.component';
import { WidgetAppointmentsComponent } from './customizable-dashboard/widgets/widget-appointments/widget-appointments.component';
import { WidgetNewEstimatesComponent } from './customizable-dashboard/widgets/widget-new-estimates/widget-new-estimates.component';
import { WidgetNewInvoicesComponent } from './customizable-dashboard/widgets/widget-new-invoices/widget-new-invoices.component';
import { WidgetIncomeComponent } from './customizable-dashboard/widgets/widget-income/widget-income.component';
import { WidgetSmsCountComponent } from './customizable-dashboard/widgets/widget-sms-count/widget-sms-count.component';
import { WidgetEmailsCountComponent } from './customizable-dashboard/widgets/widget-emails-count/widget-emails-count.component';
import { WidgetNewClientComponent } from './customizable-dashboard/widgets/widget-new-client/widget-new-client.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    GridsterModule,
    PerfectScrollbarModule,
    NgxChartsModule,
    CountoModule,
    TabsModule.forRoot(),
    TranslateModule,
    FormsModule,
    PaginatorModule,
    TableModule,
    SharedModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgApexchartsModule
  ],
  declarations: [
    CustomizableDashboardComponent,
    WidgetEditionStatisticsComponent,
    WidgetGeneralStatsComponent,
    WidgetHostTopStatsComponent,
    WidgetIncomeStatisticsComponent,
    WidgetMemberActivityComponent,
    WidgetProfitShareComponent,
    WidgetRecentTenantsComponent,
    WidgetRegionalStatsComponent,
    WidgetSalesSummaryComponent,
    WidgetSubscriptionExpiringTenantsComponent,
    WidgetTopStatsComponent,
    WidgetDailySalesComponent,
    AddWidgetModalComponent,
    FilterDateRangePickerComponent,
    WidgetBugBySeverityComponent,
    WidgetBugByStatusComponent,
    FilterProjectComponent,
    WidgetStoriesByStageComponent,
    WidgetListOfBugsComponent,
    WidgetOverdueTasksComponent,
    WidgetOverdueStoriesComponent,
    WidgetOverAllProgressComponent,
    WidgetSprintDatesComponent,
    WidgetStoryStagesComponent,
    WidgetTotalOverdueTasksCountComponent,
    WidgetRemaingDaysComponent,
    WidgetStoryTaskBugComponent,
    WidgetNewTenantsComponent,
    WidgetLastFiftyMembersComponent,
    WidgetTotalMembersComponent,
    WidgetTenantTrialSubscriptionsComponent,
    WidgetLastFiftySubscriptionsComponent,
    WidgetLastThreeMothSubscriptionsComponent,
    WidgetLastFiftyCancelSubscriptionsComponent,
    WidgetLastFiftyNewContactsComponent,
    WidgetLastTwentyInvoicesComponent,
    WidgetLastTwentyEstimatesComponent,
    WidgetAppointmentsComponent,
    WidgetNewEstimatesComponent,
    WidgetNewInvoicesComponent,
    WidgetIncomeComponent,
    WidgetSmsCountComponent,
    WidgetEmailsCountComponent,
    WidgetNewClientComponent
  ],
  //declarations:[],
  exports : [
    CustomizableDashboardComponent
  ],
  providers: [
    DashboardViewConfigurationService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  entryComponents:[
    // WidgetBugBySeverityComponent,
    // FilterDateRangePickerComponent,
    // FilterProjectComponent
  ]
})

export class AppCommonModule {
  static forRoot(): ModuleWithProviders<AppCommonModule> {
    return {
      ngModule: AppCommonModule,
    };
  }
}
