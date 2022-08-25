import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectManagementModule } from './project-management/project-management.module';
import { PagetitleComponent } from '../shared/ui/pagetitle/pagetitle.component';
import { ContractStatusModule } from './contract-status/contract-status.module';
import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MemberStoryEstimationComponent } from './project-management/member-story-estimation/member-story-estimation.component';
import { TrainingComponent } from './training/training.component';
import { TrainingCreateEditComponent } from './training/training-create-edit/training-create-edit.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobDescriptionCreateEditComponent } from './job-description/job-description-create-edit/job-description-create-edit.component';
import { JobDescriptionViewComponent } from './job-description/job-description-view/job-description-view.component';
import { StagesHistoryComponent } from './stages-history/stages-history.component';
import { StagesHistoryCreateEditComponent } from './stages-history/stages-history-create-edit/stages-history-create-edit.component';
import { StagesHistoryViewComponent } from './stages-history/stages-history-view/stages-history-view.component';
import { ContactObjectionsComponent } from './contact-objections/contact-objections.component';
import { ContactObjectionViewModalComponent } from './contact-objections/contact-objection-view-modal/contact-objection-view-modal.component';
import { ContactObjectionCreateEditModalComponent } from './contact-objections/contact-objection-create-edit-modal/contact-objection-create-edit-modal.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineCreateEditComponent } from './timeline/timeline-create-edit/timeline-create-edit.component';
import { TimelineViewComponent } from './timeline/timeline-view/timeline-view.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerCreateEditComponent } from './customers/customer-create-edit/customer-create-edit.component';
import { CustomerViewComponent } from './customers/customer-view/customer-view.component';
import { ProjectSharedModule } from './shared/project-tabs/project-shared.module';
import { AppCommonModule } from '../shared/common/app-common.module';
import { ProfileComponent } from '../layouts/topbar/profile/profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { SubscriptionDashboardComponent } from './subscription-dashboard/subscription-dashboard.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { TransactionDashboardComponent } from './transaction-dashboard/transaction-dashboard.component';
//import { ProjectTabsComponent } from './shared/project-tabs/project-tabs.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    SprintPlanningComponent,
    // MemberStoryEstimationComponent,
    TrainingComponent,
    TrainingCreateEditComponent,
    JobDescriptionComponent,
    JobDescriptionCreateEditComponent,
    JobDescriptionViewComponent,
    StagesHistoryComponent,
    StagesHistoryCreateEditComponent,
    StagesHistoryViewComponent,
    ContactObjectionsComponent,
    ContactObjectionViewModalComponent,
    ContactObjectionCreateEditModalComponent,
    TimelineComponent,
    TimelineCreateEditComponent,
    TimelineViewComponent,
    CustomersComponent,
    CustomerCreateEditComponent,
    CustomerViewComponent,
    ProfileComponent,
    ProjectDashboardComponent,
    SubscriptionDashboardComponent,
    SalesDashboardComponent,
    TransactionDashboardComponent
    //ProjectTabsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    ProjectManagementModule,
    ContractStatusModule,
    NgSelectModule,
    SharedModule,
    TranslateModule,
    YouTubePlayerModule,
    ProjectSharedModule,
    AppCommonModule,
    ImageCropperModule,
    TableModule,
    PaginatorModule
  ],
  exports:[
    //ProjectTabsComponent
  ]
})
export class PagesModule { 
}
