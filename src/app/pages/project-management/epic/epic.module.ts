import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpicRoutingModule } from './epic-routing.module';
import { EpicStatusComponent } from './epic-status/epic-status.component';
import { EpicComponent } from './epic/epic.component';
import { EpicCreateEditModalComponent } from './epic/epic-create-edit-modal/epic-create-edit-modal.component';
import { EpicViewModalComponent } from './epic/epic-view-modal/epic-view-modal.component';
import { EpicStatusCreateEditModalComponent } from './epic-status/epic-status-create-edit-modal/epic-status-create-edit-modal.component';
import { EpicStatusViewModalComponent } from './epic-status/epic-status-view-modal/epic-status-view-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ProjectSharedModule } from '../../shared/project-tabs/project-shared.module';


@NgModule({
  declarations: [
    EpicStatusComponent,
    EpicComponent,
    EpicCreateEditModalComponent,
    EpicViewModalComponent,
    EpicStatusCreateEditModalComponent,
    EpicStatusViewModalComponent
  ],
  imports: [
    CommonModule,
    EpicRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    //ProjectSharedModule
  ],
  exports: [EpicComponent]
})
export class EpicModule { }
