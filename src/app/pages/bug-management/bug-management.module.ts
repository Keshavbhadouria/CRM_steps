import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BugManagementRoutingModule } from './bug-management-routing.module';
import { BugStatusComponent } from './bug-status/bug-status.component';
import { CreateOrEditBugStatusModalComponent } from './bug-status/create-or-edit-bug-status-modal/create-or-edit-bug-status-modal.component';
import { ViewBugStatusModalComponent } from './bug-status/view-bug-status-modal/view-bug-status-modal.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IssueTypesComponent } from './issue-types/issue-types.component';
import { CreateOrEditIssueTypeModalComponent } from './issue-types/create-or-edit-issue-type-modal/create-or-edit-issue-type-modal.component';
import { ViewIssueTypeModalComponent } from './issue-types/view-issue-type-modal/view-issue-type-modal.component';
import { TaskBugsComponent } from './task-bugs/task-bugs.component';
import { CreateOrEditTaskBugModalComponent } from './task-bugs/create-or-edit-task-bug-modal/create-or-edit-task-bug-modal.component';
import { ViewTaskBugModalComponent } from './task-bugs/view-task-bug-modal/view-task-bug-modal.component';
import { BugSeverityComponent } from './bug-severity/bug-severity.component';
import { CreateOrEditBugSeverityModalComponent } from './bug-severity/create-or-edit-bug-severity-modal/create-or-edit-bug-severity-modal.component';
import { ViewBugSeverityModalComponent } from './bug-severity/view-bug-severity-modal/view-bug-severity-modal.component';
import { BugDetailModalComponent } from './task-bugs/bug-detail-modal/bug-detail-modal.component';
import { BugsBoardComponent } from './bugs-board/bugs-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectSharedModule } from '../shared/project-tabs/project-shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { PublicBugDetailComponent } from './public-bug-detail/public-bug-detail.component';


@NgModule({
  declarations: [
    BugStatusComponent,
    CreateOrEditBugStatusModalComponent,
    ViewBugStatusModalComponent,

    IssueTypesComponent,
    CreateOrEditIssueTypeModalComponent,
    ViewIssueTypeModalComponent,
    
    TaskBugsComponent,
    CreateOrEditTaskBugModalComponent,
    ViewTaskBugModalComponent,
    
    BugSeverityComponent,
    CreateOrEditBugSeverityModalComponent,
    ViewBugSeverityModalComponent,
    BugDetailModalComponent,
    BugsBoardComponent,
    PublicBugDetailComponent,
  ],
  imports: [
    CommonModule,
    BugManagementRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    DragDropModule,
   // ProjectSharedModule,
    TableModule,
    PaginatorModule
  ],
  exports:[BugsBoardComponent, TaskBugsComponent]
})
export class BugManagementModule { }
