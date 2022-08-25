import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeTypeComponent } from './fee-type/fee-type.component';
import { LawfirmServicesComponent } from './lawfirm-services/lawfirm-services.component';
import { ServiceActivitiesComponent } from './service-activities/service-activities.component';
import { ServiceActivityStepsComponent } from './service-activity-steps/service-activity-steps.component';
import { StepDocumentsComponent } from './step-documents/step-documents.component';

const routes: Routes = [

  {
    path: 'feetype',
    component: FeeTypeComponent
  },
  {
    path: 'services',
    component: LawfirmServicesComponent
  },
  {
    path: 'serviceactivities/:serviceId/:serviceName',
    component: ServiceActivitiesComponent
  },
  {
    path: 'activitysteps/:serviceId/:serviceName/:activityId/:activityName',
    component: ServiceActivityStepsComponent
  },
  {
    path: 'stepsdocument/:serviceId/:serviceName/:activityId/:activityName/:activityStepId/:activityStepName',
    component: StepDocumentsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawFirmRoutingModule { }
