import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProjectTabsComponent } from '../shared/project-tabs/project-tabs.component';
import { GeneralReportComponent } from './general-report/general-report.component';
import { IndustryComponent } from './industry/industry.component';
import { KnowledgeBasesComponent } from './knowledge-bases/knowledge-bases.component';
import { MemberStoryEstimationComponent } from './member-story-estimation/member-story-estimation.component';
import { PMTaskBoardComponent } from './pmtask/pmtask-board/pmtask-board.component';
import { PMtaskComponent } from './pmtask/pmtask.component';
import { PublicTaskDetailComponent } from './pmtask/public-task-detail/public-task-detail.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { ProjectComponent } from './project/project.component';
import { SkillsComponent } from './skills/skills.component';
import { TaskFriquenciesComponent } from './task-friquencies/task-friquencies.component';
import { TaskPrioritiesComponent } from './task-priorities/task-priorities.component';
import { TaskStagesComponent } from './task-stages/task-stages.component';
import { TaskTypesComponent } from './task-types/task-types.component';
import { TaskVelocityComponent } from './task-velocity/task-velocity.component';


const routes: Routes = [

  { path: 'task/:taskPublicId', component:PublicTaskDetailComponent},
  { path: 'taskboard', component: PMTaskBoardComponent },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'projectstatus',
    component: ProjectStatusComponent
  },
  {
    path: 'industry',
    component: IndustryComponent
  },
  {
    path: 'skills',
    component: SkillsComponent
  },

  {
    path: 'pmtasks/:sprintId',
    component: PMtaskComponent
  },
  {
    path: 'taskvelocities',
    component: TaskVelocityComponent
  },
  {
    path: 'taskstages',
    component: TaskStagesComponent
  },
  {
    path: 'taskpriorites',
    component: TaskPrioritiesComponent
  },
  {
    path: 'tasktypes',
    component: TaskTypesComponent
  },
  {
    path: 'taskfrequencies',
    component: TaskFriquenciesComponent
  },
  {
    path: 'knowledgeBases',
    component: KnowledgeBasesComponent
  },
  { path: 'epic', loadChildren: () => import('./epic/epic.module').then(m => m.EpicModule), canActivate: [AuthGuard] },
  { path: 'sprint', loadChildren: () => import('./sprint/sprint.module').then(m => m.SprintModule), canActivate: [AuthGuard] },
  // { path: 'sprint', loadChildren: () => import('./sprint/sprint.module').then(m => m.SprintModule), canActivate: [AuthGuard] },
  { path: 'hr', loadChildren: () => import('./hr/hr.module').then(m => m.HrModule), canActivate: [AuthGuard] },
  { path: 'story', loadChildren: () => import('./story/story-management.module').then(m => m.StoryManagementModule), canActivate: [AuthGuard] },
  { path: 'generalreport/:sprintId', component: GeneralReportComponent },
  { path: 'projectDetail/:projectId', component: ProjectTabsComponent},
  { path: 'projectDetail/:projectId/:sprintId/:tabname', component: ProjectTabsComponent},
  { path: 'memberStoryEstimation/:sprintId', component: MemberStoryEstimationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
