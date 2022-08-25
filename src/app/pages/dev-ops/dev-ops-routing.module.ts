import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRecurrentJobsComponent } from './application-recurrent-jobs/application-recurrent-jobs.component';
import { ApplicationComponent } from './application/application.component';
import { ClientDatabasesComponent } from './client-databases/client-databases.component';
import { CloudProvidersComponent } from './cloud-providers/cloud-providers.component';
import { DatabaseEnginesComponent } from './database-engines/database-engines.component';
import { DeploymentApprovalProcessComponent } from './deployment-approval-process/deployment-approval-process.component';
import { DeploymentDetailsComponent } from './deployment-details/deployment-details.component';
import { DeploymentManagementComponent } from './deployment-management/deployment-management.component';
import { JobTypesComponent } from './job-types/job-types.component';
import { OnlineToolsComponent } from './online-tools/online-tools.component';
import { ServersComponent } from './servers/servers.component';
import { StatusComponent } from './status/status.component';


const routes: Routes = [

   { path: 'onlinetools', component: OnlineToolsComponent },
   { path: 'deploymentmanagement', component: DeploymentManagementComponent },
   { path: 'deploymentdetails', component: DeploymentDetailsComponent },
   { path: 'deploymentapprovalprocess', component: DeploymentApprovalProcessComponent },
   { path: 'databaseEngines', component: DatabaseEnginesComponent },
   { path: 'clientDatabases', component: ClientDatabasesComponent },
   { path: 'cloudproviders', component: CloudProvidersComponent},
   { path: 'servers', component: ServersComponent},

   { path: 'jobTypes', component: JobTypesComponent },
   { path: 'applicationRecurrentJobs', component: ApplicationRecurrentJobsComponent },
   { path: 'status', component: StatusComponent},
   { path: 'application', component: ApplicationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevOpsRoutingModule { }
