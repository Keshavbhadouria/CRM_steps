import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffAssignmentRoutingModule } from './staff-assignment-routing.module';
import { StaffAssignmentComponent } from './staff-assignment/staff-assignment.component';
import { StaffAssignmentCreateEditModalComponent } from './staff-assignment/staff-assignment-create-edit-modal/staff-assignment-create-edit-modal.component';
import { StaffAssignmentViewModalComponent } from './staff-assignment/staff-assignment-view-modal/staff-assignment-view-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UIModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [
    StaffAssignmentComponent,
    StaffAssignmentCreateEditModalComponent,
    StaffAssignmentViewModalComponent
  ],
  imports: [
    CommonModule,
    StaffAssignmentRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class StaffAssignmentModule { }
