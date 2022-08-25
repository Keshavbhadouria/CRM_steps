import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SpritStatusComponent } from './sprit-status/sprit-status.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintTypesComponent } from './sprint-types/sprint-types.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SprintStatusCreateEditModalComponent } from './sprit-status/sprint-status-create-edit-modal/sprint-status-create-edit-modal.component';
import { SprintStatusViewModalComponent } from './sprit-status/sprint-status-view-modal/sprint-status-view-modal.component';
import { SprintTypesViewModalComponent } from './sprint-types/sprint-types-view-modal/sprint-types-view-modal.component';
import { SprintTypesCreateEditModalComponent } from './sprint-types/sprint-types-create-edit-modal/sprint-types-create-edit-modal.component';
import { SprintCreateEditModalComponent } from './sprint/sprint-create-edit-modal/sprint-create-edit-modal.component';
import { SprintViewModalComponent } from './sprint/sprint-view-modal/sprint-view-modal.component';
import { ProjectSharedModule } from '../../shared/project-tabs/project-shared.module';


@NgModule({
  declarations: [
    SpritStatusComponent,
    SprintComponent,
    SprintTypesComponent,
    SprintStatusCreateEditModalComponent,
    SprintStatusViewModalComponent,
    SprintTypesViewModalComponent,
    SprintTypesCreateEditModalComponent,
    SprintCreateEditModalComponent,
    SprintViewModalComponent
  ],
  imports: [
    CommonModule,
    SprintRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
  //  ProjectSharedModule
  ],
  exports: [
    SprintComponent
  ]
})
export class SprintModule { }
