import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { DevOpsRoutingModule } from './dev-ops-routing.module';
import { OnlineToolsComponent } from './online-tools/online-tools.component';
import { OnlineToolsCreateOrEditComponent } from './online-tools/online-tools-create-or-edit/online-tools-create-or-edit.component';
import { OnlineToolsViewComponent } from './online-tools/online-tools-view/online-tools-view.component';
import { DeploymentManagementComponent } from './deployment-management/deployment-management.component';
import { DeploymentCreateEditComponent } from './deployment-management/deployment-create-edit/deployment-create-edit.component';
import { DeploymentViewComponent } from './deployment-management/deployment-view/deployment-view.component';
import { DeploymentDetailsComponent } from './deployment-details/deployment-details.component';
import { DeploymentApprovalProcessComponent } from './deployment-approval-process/deployment-approval-process.component';
import { DeploymentDetailsCreateEditComponent } from './deployment-details/deployment-details-create-edit/deployment-details-create-edit.component';
import { DeploymentDetailsViewComponent } from './deployment-details/deployment-details-view/deployment-details-view.component';
import { DeploymentApprovalCreateEditComponent } from './deployment-approval-process/deployment-approval-create-edit/deployment-approval-create-edit.component';
import { DeploymentApprovalViewComponent } from './deployment-approval-process/deployment-approval-view/deployment-approval-view.component';
import { DatabaseEnginesComponent } from './database-engines/database-engines.component';
import { CreateOrEditDatabaseEngineModalComponent } from './database-engines/create-or-edit-database-engine-modal/create-or-edit-database-engine-modal.component';
import { ViewDatabaseEngineModalComponent } from './database-engines/view-database-engine-modal/view-database-engine-modal.component';
import { ClientDatabasesComponent } from './client-databases/client-databases.component';
import { CreateOrEditClientDatabaseModalComponent } from './client-databases/create-or-edit-client-database-modal/create-or-edit-client-database-modal.component';
import { ViewClientDatabaseModalComponent } from './client-databases/view-client-database-modal/view-client-database-modal.component';
import { ServersComponent } from './servers/servers.component';
import { CloudProvidersComponent } from './cloud-providers/cloud-providers.component';
import { CloudProvidersCreateEditComponent } from './cloud-providers/cloud-providers-create-edit/cloud-providers-create-edit.component';
import { CloudProvidersViewComponent } from './cloud-providers/cloud-providers-view/cloud-providers-view.component';
import { ServersCreateEditComponent } from './servers/servers-create-edit/servers-create-edit.component';
import { ServersViewComponent } from './servers/servers-view/servers-view.component';
import { JobTypesComponent } from './job-types/job-types.component';
import { CreateOrEditJobTypeModalComponent } from './job-types/create-or-edit-job-type-modal/create-or-edit-job-type-modal.component';
import { ViewJobTypeModalComponent } from './job-types/view-job-type-modal/view-job-type-modal.component';
import { ApplicationRecurrentJobsComponent } from './application-recurrent-jobs/application-recurrent-jobs.component';
import { CreateOrEditRecurrentjobModalComponent } from './application-recurrent-jobs/create-or-edit-recurrentjob-modal/create-or-edit-recurrentjob-modal.component';
import { ViewRecurrentjobModalComponent } from './application-recurrent-jobs/view-recurrentjob-modal/view-recurrentjob-modal.component';
import { StatusComponent } from './status/status.component';
import { ApplicationComponent } from './application/application.component';
import { StatusCreateEditComponent } from './status/status-create-edit/status-create-edit.component';
import { StatusViewComponent } from './status/status-view/status-view.component';
import { ApplicationCreateEditComponent } from './application/application-create-edit/application-create-edit.component';
import { ApplicationViewComponent } from './application/application-view/application-view.component';



@NgModule({
  declarations: [
    OnlineToolsComponent,
    OnlineToolsViewComponent,
    OnlineToolsCreateOrEditComponent,

    DeploymentManagementComponent,
    DeploymentCreateEditComponent,
    DeploymentViewComponent,
    
    DeploymentApprovalProcessComponent,
    DeploymentDetailsComponent,
    DeploymentDetailsCreateEditComponent,
    DeploymentDetailsViewComponent,
    DeploymentApprovalCreateEditComponent,
    DeploymentApprovalViewComponent,
    DeploymentApprovalProcessComponent,
    DatabaseEnginesComponent,
    CreateOrEditDatabaseEngineModalComponent,
    ViewDatabaseEngineModalComponent,
    ClientDatabasesComponent,
    CreateOrEditClientDatabaseModalComponent,
    ViewClientDatabaseModalComponent,
    ServersComponent,
    CloudProvidersComponent,
    CloudProvidersCreateEditComponent,
    CloudProvidersViewComponent,
    ServersCreateEditComponent,
    ServersViewComponent,
    JobTypesComponent,
    CreateOrEditJobTypeModalComponent,
    ViewJobTypeModalComponent,
    ApplicationRecurrentJobsComponent,
    CreateOrEditRecurrentjobModalComponent,
    ViewRecurrentjobModalComponent,
    StatusComponent,
    ApplicationComponent,
    StatusCreateEditComponent,
    StatusViewComponent,
    ApplicationCreateEditComponent,
    ApplicationViewComponent
  ],
  imports: [
    CommonModule,
    DevOpsRoutingModule,
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class DevOpsModule { }
