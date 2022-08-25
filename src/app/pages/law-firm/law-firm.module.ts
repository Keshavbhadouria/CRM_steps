import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawFirmRoutingModule } from './law-firm-routing.module';
import { FeeTypeComponent } from './fee-type/fee-type.component';
import { LawfirmServicesComponent } from './lawfirm-services/lawfirm-services.component';
import { ServiceActivitiesComponent } from './service-activities/service-activities.component';
import { ServiceActivityStepsComponent } from './service-activity-steps/service-activity-steps.component';
import { StepDocumentsComponent } from './step-documents/step-documents.component';
import { FeeTypeCreateEditModalComponent } from './fee-type/fee-type-create-edit-modal/fee-type-create-edit-modal.component';
import { FeeTypeViewModalComponent } from './fee-type/fee-type-view-modal/fee-type-view-modal.component';
import { LawfirmServiceCreateEditModalComponent } from './lawfirm-services/lawfirm-service-create-edit-modal/lawfirm-service-create-edit-modal.component';
import { LawfirmServiceViewModalComponent } from './lawfirm-services/lawfirm-service-view-modal/lawfirm-service-view-modal.component';
import { ServiceActivityCreateEditModalComponent } from './service-activities/service-activity-create-edit-modal/service-activity-create-edit-modal.component';
import { ServiceActivityViewModalComponent } from './service-activities/service-activity-view-modal/service-activity-view-modal.component';
import { ServiceActivityStepsViewModalComponent } from './service-activity-steps/service-activity-steps-view-modal/service-activity-steps-view-modal.component';
import { StepDocumentCreateEditModalComponent } from './step-documents/step-document-create-edit-modal/step-document-create-edit-modal.component';
import { StepDocumentViewModalComponent } from './step-documents/step-document-view-modal/step-document-view-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ServiceActivityStepCreateEditModalComponent } from './service-activity-steps/service-activity-steps-create-edit-modal/service-activity-steps-create-edit-modal.component';
import { LawfirmServiceTeamMemberComponent } from './lawfirm-services/lawfirm-service-team-member/lawfirm-service-team-member.component';
import { ServiceTeamMemberDetailComponent } from './lawfirm-services/lawfirm-service-team-member/service-team-member-detail/service-team-member-detail.component';


@NgModule({
  declarations: [
    FeeTypeComponent,
    LawfirmServicesComponent,
    ServiceActivitiesComponent,
    ServiceActivityStepsComponent,
    StepDocumentsComponent,
    FeeTypeCreateEditModalComponent,
    FeeTypeViewModalComponent,
    LawfirmServiceCreateEditModalComponent,
    LawfirmServiceViewModalComponent,
    ServiceActivityCreateEditModalComponent,
    ServiceActivityViewModalComponent,
    ServiceActivityStepsViewModalComponent,
    ServiceActivityStepCreateEditModalComponent,
    StepDocumentCreateEditModalComponent,
    StepDocumentViewModalComponent,
    LawfirmServiceTeamMemberComponent,
    ServiceTeamMemberDetailComponent
  ],
  imports: [
    CommonModule,
    LawFirmRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class LawFirmModule { }
