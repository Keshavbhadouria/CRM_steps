import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectComponent } from './project/project.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectCreateEditModalComponent } from './project/project-create-edit-modal/project-create-edit-modal.component';
import { ProjectViewModalComponent } from './project/project-view-modal/project-view-modal.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { ProjectStatusCreateEditModalComponent } from './project-status/project-status-create-edit-modal/project-status-create-edit-modal.component';
import { ProjectStatusViewModalComponent } from './project-status/project-status-view-modal/project-status-view-modal.component';
import { IndustryComponent } from './industry/industry.component';
import { IndustryCreateEditModalComponent } from './industry/industry-create-edit-modal/industry-create-edit-modal.component';
import { IndustryViewModalComponent } from './industry/industry-view-modal/industry-view-modal.component';
import { FormatCellPipe } from 'src/app/core/pipes/formet-cell.pipe';
import { SkillsComponent } from './skills/skills.component';
import { SkillsCreateEditModalComponent } from './skills/skills-create-edit-modal/skills-create-edit-modal.component';
import { SkillsViewModalComponent } from './skills/skills-view-modal/skills-view-modal.component';
import { PMtaskComponent } from './pmtask/pmtask.component';
import { TaskVelocityComponent } from './task-velocity/task-velocity.component';
import { TaskPrioritiesComponent } from './task-priorities/task-priorities.component';
import { TaskStagesComponent } from './task-stages/task-stages.component';
import { TaskTypesComponent } from './task-types/task-types.component';
import { TaskFriquenciesComponent } from './task-friquencies/task-friquencies.component';
import { TaskFriquenciesCreateEditModalComponent } from './task-friquencies/task-friquencies-create-edit-modal/task-friquencies-create-edit-modal.component';
import { TaskFrequenciesViewModalComponent } from './task-friquencies/task-frequencies-view-modal/task-frequencies-view-modal.component';
import { TaskVelocityCreateEditComponent } from './task-velocity/task-velocity-create-edit/task-velocity-create-edit.component';
import { TaskVelocityViewComponent } from './task-velocity/task-velocity-view/task-velocity-view.component';
import { TaskTypeCreateEditComponent } from './task-types/task-type-create-edit/task-type-create-edit.component';
import { TaskTypeViewComponent } from './task-types/task-type-view/task-type-view.component';
import { TaskStageCreateEditComponent } from './task-stages/task-stage-create-edit/task-stage-create-edit.component';
import { TaskStageViewComponent } from './task-stages/task-stage-view/task-stage-view.component';
import { TaskPriorityCreateEditComponent } from './task-priorities/task-priority-create-edit/task-priority-create-edit.component';
import { TaskPriorityViewComponent } from './task-priorities/task-priority-view/task-priority-view.component';
import { PmtaskCreateEditComponent } from './pmtask/pmtask-create-edit/pmtask-create-edit.component';
import { PmtaskViewComponent } from './pmtask/pmtask-view/pmtask-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PMTaskBoardComponent } from './pmtask/pmtask-board/pmtask-board.component';
import { TeamMembersModalComponent } from './project/team-members-modal/team-members-modal.component';
import { TeamMemberDetailComponent } from './project/team-members-modal/team-member-detail/team-member-detail.component';
import { PmtaskDetailComponent } from './pmtask/pmtask-detail/pmtask-detail.component';
import { KnowledgeBasesComponent } from './knowledge-bases/knowledge-bases.component';
import { CreateOrEditKnowledgeBaseModalComponent } from './knowledge-bases/create-or-edit-knowledge-base-modal/create-or-edit-knowledge-base-modal.component';
import { ViewKnowledgeBaseModalComponent } from './knowledge-bases/view-knowledge-base-modal/view-knowledge-base-modal.component';
import { ProjectSharedModule } from '../shared/project-tabs/project-shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { GeneralReportComponent } from './general-report/general-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MemberStoryEstimationComponent } from './member-story-estimation/member-story-estimation.component';
import { PublicTaskDetailComponent } from './pmtask/public-task-detail/public-task-detail.component';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCreateEditModalComponent,
    ProjectViewModalComponent,
    ProjectStatusComponent,
    ProjectStatusCreateEditModalComponent,
    ProjectStatusViewModalComponent,
    IndustryComponent,
    IndustryCreateEditModalComponent,
    IndustryViewModalComponent,
    SkillsComponent,
    SkillsCreateEditModalComponent,
    SkillsViewModalComponent,
    PMtaskComponent,
    TaskVelocityComponent,
    TaskPrioritiesComponent,
    TaskStagesComponent,
    TaskTypesComponent,
    TaskFriquenciesComponent,
    TaskFriquenciesCreateEditModalComponent,
    TaskFrequenciesViewModalComponent,
    TaskVelocityCreateEditComponent,
    TaskVelocityViewComponent,
    TaskTypeCreateEditComponent,
    TaskTypeViewComponent,
    TaskStageCreateEditComponent,
    TaskStageViewComponent,
    TaskPriorityCreateEditComponent,
    TaskPriorityViewComponent,
    PmtaskCreateEditComponent,
    PmtaskViewComponent,
    PMTaskBoardComponent,
  TeamMembersModalComponent,
  TeamMemberDetailComponent,
  PmtaskDetailComponent,
  KnowledgeBasesComponent,
  CreateOrEditKnowledgeBaseModalComponent,
  ViewKnowledgeBaseModalComponent,
  GeneralReportComponent,
  MemberStoryEstimationComponent,
  PublicTaskDetailComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    ProjectManagementRoutingModule,
    NgbDropdownModule,
    TranslateModule,
    TableModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    DragDropModule,
    PaginatorModule,
    NgMultiSelectDropDownModule
  ],
  exports: [PMTaskBoardComponent, PMtaskComponent, MemberStoryEstimationComponent, GeneralReportComponent]
})
export class ProjectManagementModule { }
