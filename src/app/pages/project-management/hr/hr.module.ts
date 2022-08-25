import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { ProjectRolesComponent } from './project-roles/project-roles.component';
import { ProjectRoleCreateOrEditModalComponent } from './project-roles/project-role-create-or-edit-modal/project-role-create-or-edit-modal.component';
import { ProjectRoleViewModalComponent } from './project-roles/project-role-view-modal/project-role-view-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CollaboratorskillsComponent } from './collaboratorskills/collaboratorskills.component';
import { CollaboratorsCreateOrEditModalComponent } from './collaborators/collaborators-create-or-edit-modal/collaborators-create-or-edit-modal.component';
import { CollaboratorsViewModalComponent } from './collaborators/collaborators-view-modal/collaborators-view-modal.component';
import { CollaboratorsSkillsCreateOrEditModalComponent } from './collaboratorskills/collaborators-skills-create-or-edit-modal/collaborators-skills-create-or-edit-modal.component';
import { CollaboratorsSkillsViewModalComponent } from './collaboratorskills/collaborators-skills-view-modal/collaborators-skills-view-modal.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollaboratorNewUIComponent } from './collaborators/collabolator-new/collaborator-new-ui/collaborator-new-ui.component';
import { CurrentInfoComponent } from './collaborators/collabolator-new/current-info/current-info.component';
import { CollaboratorListComponent } from './collaborators/collabolator-new/collaborator-list/collaborator-list.component';
import { CollaboratorSkillsComponent } from './collaborators/collabolator-new/collaborator-skills/collaborator-skills.component';
import { CollaboratorAbsenseComponent } from './collaborators/collabolator-new/collaborator-absense/collaborator-absense.component';
import { CollaboratorNoticeComponent } from './collaborators/collabolator-new/collaborator-notice/collaborator-notice.component';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    ProjectRolesComponent,
    ProjectRoleCreateOrEditModalComponent,
    ProjectRoleViewModalComponent,
    CollaboratorsComponent,
    CollaboratorskillsComponent,
    CollaboratorsCreateOrEditModalComponent,
    CollaboratorsViewModalComponent,
    CollaboratorsSkillsCreateOrEditModalComponent,
    CollaboratorsSkillsViewModalComponent,
    CollaboratorNewUIComponent,
    CurrentInfoComponent,
    CollaboratorListComponent,
    CollaboratorSkillsComponent,
    CollaboratorAbsenseComponent,
    CollaboratorNoticeComponent,
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    TabsModule.forRoot(),
    TableModule,
    PaginatorModule
  ],
  exports: [
    CollaboratorNewUIComponent
  ]
})
export class HrModule { }
