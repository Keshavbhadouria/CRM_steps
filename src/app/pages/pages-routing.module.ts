import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomizableDashboardComponent } from '../shared/common/customizable-dashboard/customizable-dashboard.component';
import { ProfileComponent } from '../layouts/topbar/profile/profile.component';
import { ContactObjectionsComponent } from './contact-objections/contact-objections.component';
import { CustomersComponent } from './customers/customers.component';

import { DefaultComponent } from './dashboards/default/default.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { MemberStoryEstimationComponent } from './project-management/member-story-estimation/member-story-estimation.component';
import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { StagesHistoryComponent } from './stages-history/stages-history.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TrainingComponent } from './training/training.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { SocialMediaDataComponent } from './social-media/social-media-data/social-media-data.component';
import { SocialMediaCredentialsComponent } from './social-media/social-media-credentials/social-media-credentials.component';
import { SubscriptionDashboardComponent } from './subscription-dashboard/subscription-dashboard.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { TransactionDashboardComponent } from './transaction-dashboard/transaction-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'stats', component: SocialMediaDataComponent },
  { path: 'smcredentials',component : SocialMediaCredentialsComponent },
  { path: 'pm', loadChildren: () => import('./project-management/project-management.module').then(m => m.ProjectManagementModule) },
  { path: 'lawfirm', loadChildren: () => import('./law-firm/law-firm.module').then(m => m.LawFirmModule) },
  { path: 'contractstatus', loadChildren: () => import('./contract-status/contract-status.module').then(m => m.ContractStatusModule) },
  { path: 'testmanagement', loadChildren: () => import('./test-management/test-management.module').then(m => m.TestManagementModule) },
  { path: 'marketing', loadChildren: () => import('./marketing/marketing.module').then(m => m.MarketingModule) },
  { path: 'kpimanagement', loadChildren: () => import('./kpi-management/kpi-management.module').then(m => m.KpiManagementModule) },
  { path: 'bugmanagement', loadChildren: () => import('./bug-management/bug-management.module').then(m => m.BugManagementModule) },
  { path: 'expensemanagement', loadChildren: () => import('./expense-management/expense-management.module').then(m => m.ExpenseManagementModule) },
  { path: 'helpdesk', loadChildren: () => import('./supports/supports.module').then(m => m.SupportsModule) },
  { path: 'affiliatemanagement', loadChildren: () => import('./affiliate-management/affiliate-management.module').then(m => m.AffiliateManagementModule) },
  { path: 'commissionmanagement', loadChildren: () => import('./commissions/commissions.module').then(m => m.CommissionsModule) },
  { path: 'businessaction', loadChildren: () => import('./business-action/business-action.module').then(m => m.BusinessActionModule) },
  { path: 'devops', loadChildren: () => import('./dev-ops/dev-ops.module').then(m => m.DevOpsModule) },
  { path: 'staffassignment', loadChildren: () => import('./staff-assignment/staff-assignment.module').then(m => m.StaffAssignmentModule) },
  { path: 'calloutcomes', loadChildren: () => import('./call-outcomes/call-outcomes.module').then(m => m.CallOutcomesModule) },
  { path: 'callobjectives', loadChildren: () => import('./call-objectives/call-objectives.module').then(m => m.CallObjectivesModule) },
  { path: 'phonecalls', loadChildren: () => import('./phone-calls/phone-calls.module').then(m => m.PhoneCallsModule) },
  { path: 'sprintplanning', component: SprintPlanningComponent },
  { path: 'contactEmailHistories', loadChildren: () => import('./email-histories/email-histories.module').then(m => m.EmailHistoriesModule) },
  { path: 'doctors', loadChildren: () => import('./doctors/doctors.module').then(m => m.DoctorsModule) },
  { path: 'memberStoryEstimation/:sprintId', component: MemberStoryEstimationComponent },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'meeting', loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule) },
  { path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'communications', loadChildren: () => import('./communications/communications.module').then(m => m.CommunicationsModule) },
  { path: 'glosary', loadChildren: () => import('./glosary/glosary.module').then(m => m.GlosaryModule) },
  { path: 'smstracking', loadChildren: () => import('./smstracking/smstracking.module').then(m => m.SMSTrackingModule) },
  { path: 'activity', loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
  { path: 'training', component: TrainingComponent },
  { path: 'invoice', loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) },
  { path: 'jobDescription', component: JobDescriptionComponent },
  { path: 'stagesHistory', component: StagesHistoryComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'contactobjection', component: ContactObjectionsComponent },
  { path: 'retainer', loadChildren: () => import('./retainer/retainer.module').then(m => m.RetainerModule) },
  { path: 'customers', component: CustomersComponent },
  { path: 'lms', loadChildren: () => import('./lms/lms.module').then(m => m.LMSModule) },
  { path: 'learningcenter', loadChildren: () => import('./learning-center/learning-center.module').then(m => m.LearningCenterModule) },
  { path: 'mydashboard', component: CustomizableDashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'projectdashboard', component: ProjectDashboardComponent },
  { path: 'tenant', loadChildren: () => import('./tenant-profile/tenant-profile.module').then(m => m.TenantProfileModule) },
  { path: 'socialmedia',loadChildren : () => import('./social-media/social-media.module').then(m => m.SocialMediaModule) },
  { path: 'subscriptiondashboard', component: SubscriptionDashboardComponent },
  { path: 'salesdashboard', component: SalesDashboardComponent },
  { path: 'transactiondashboard', component: TransactionDashboardComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
