import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugSeverityComponent } from './bug-severity/bug-severity.component';
import { BugStatusComponent } from './bug-status/bug-status.component';
import { BugsBoardComponent } from './bugs-board/bugs-board.component';
import { IssueTypesComponent } from './issue-types/issue-types.component';
import { PublicBugDetailComponent } from './public-bug-detail/public-bug-detail.component';
import { TaskBugsComponent } from './task-bugs/task-bugs.component';

const routes: Routes = [
  { path: "bugstatuses", component: BugStatusComponent },
  { path: "issuetypes", component: IssueTypesComponent },
  { path: "taskbugs/:sprintId", component: TaskBugsComponent },
  { path: "bugseverities", component: BugSeverityComponent },
  { path: "bugsboard", component: BugsBoardComponent },
  { path: 'bug/:bugPublicId', component:PublicBugDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BugManagementRoutingModule { }
