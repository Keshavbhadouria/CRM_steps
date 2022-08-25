import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundComponent } from './background/background.component';
import { BloodTypeComponent } from './blood-type/blood-type.component';
import { MedicalHistoryConditionComponent } from './medical-history-condition/medical-history-condition.component';
import { MedicalHistoryDiseasesComponent } from './medical-history-diseases/medical-history-diseases.component';
import { OccupationsComponent } from './occupations/occupations.component';
import { PhysicalExamComponent } from './physical-exam/physical-exam.component';
import { RaceComponent } from './race/race.component';
import { SexComponent } from './sex/sex.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';


const routes: Routes = [
   { path: 'background', component: BackgroundComponent },
   { path: 'bloodtype', component: BloodTypeComponent },
   { path: 'medicalhistorycondition', component: MedicalHistoryConditionComponent },
   { path: 'medicalhistorydiseases', component: MedicalHistoryDiseasesComponent },
   { path: 'sex', component: SexComponent },
   { path: 'race', component: RaceComponent },
   { path: 'staffprofile', component: StaffProfileComponent },
   { path: 'occupations', component: OccupationsComponent },
   { path: 'physicalexam', component: PhysicalExamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
