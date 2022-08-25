import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhysicalExamComponent } from './physical-exam/physical-exam.component';
import { BackgroundComponent } from './background/background.component';
import { SexComponent } from './sex/sex.component';
import { RaceComponent } from './race/race.component';
import { OccupationsComponent } from './occupations/occupations.component';
import { BloodTypeComponent } from './blood-type/blood-type.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { MedicalHistoryDiseasesComponent } from './medical-history-diseases/medical-history-diseases.component';
import { MedicalHistoryConditionComponent } from './medical-history-condition/medical-history-condition.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { PhysicalExamCreateEditComponent } from './physical-exam/physical-exam-create-edit/physical-exam-create-edit.component';
import { PhysicalExamViewComponent } from './physical-exam/physical-exam-view/physical-exam-view.component';
import { BackgroundCreateEditComponent } from './background/background-create-edit/background-create-edit.component';
import { BackgroundViewComponent } from './background/background-view/background-view.component';
import { BloodTypeCreateEditComponent } from './blood-type/blood-type-create-edit/blood-type-create-edit.component';
import { BloodTypeViewComponent } from './blood-type/blood-type-view/blood-type-view.component';
import { MedicalHistoryConditionCreateEditComponent } from './medical-history-condition/medical-history-condition-create-edit/medical-history-condition-create-edit.component';
import { MedicalHistoryConditionViewComponent } from './medical-history-condition/medical-history-condition-view/medical-history-condition-view.component';
import { MedicalHistoryDiseasesCreateEditComponent } from './medical-history-diseases/medical-history-diseases-create-edit/medical-history-diseases-create-edit.component';
import { MedicalHistoryDiseasesViewComponent } from './medical-history-diseases/medical-history-diseases-view/medical-history-diseases-view.component';
import { OccupationsCreateEditComponent } from './occupations/occupations-create-edit/occupations-create-edit.component';
import { OccupationsViewComponent } from './occupations/occupations-view/occupations-view.component';
import { RaceCreateEditComponent } from './race/race-create-edit/race-create-edit.component';
import { RaceViewComponent } from './race/race-view/race-view.component';
import { SexCreateEditComponent } from './sex/sex-create-edit/sex-create-edit.component';
import { SexViewComponent } from './sex/sex-view/sex-view.component';
import { StaffProfileCreateEditComponent } from './staff-profile/staff-profile-create-edit/staff-profile-create-edit.component';
import { StaffProfileViewComponent } from './staff-profile/staff-profile-view/staff-profile-view.component';



@NgModule({
  declarations: [
    PhysicalExamComponent,
    BackgroundComponent,
    SexComponent,
    RaceComponent,
    OccupationsComponent,
    BloodTypeComponent,
    StaffProfileComponent,
    MedicalHistoryDiseasesComponent,
    MedicalHistoryConditionComponent,
    PhysicalExamCreateEditComponent,
    PhysicalExamViewComponent,
    BackgroundCreateEditComponent,
    BackgroundViewComponent,
    BloodTypeCreateEditComponent,
    BloodTypeViewComponent,
    MedicalHistoryConditionCreateEditComponent,
    MedicalHistoryConditionViewComponent,
    MedicalHistoryDiseasesCreateEditComponent,
    MedicalHistoryDiseasesViewComponent,
    OccupationsCreateEditComponent,
    OccupationsViewComponent,
    RaceCreateEditComponent,
    RaceViewComponent,
    SexCreateEditComponent,
    SexViewComponent,
    StaffProfileCreateEditComponent,
    StaffProfileViewComponent,
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class DoctorsModule { }
