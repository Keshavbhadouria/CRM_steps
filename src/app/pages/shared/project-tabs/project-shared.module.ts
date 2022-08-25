import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTabsComponent } from './project-tabs.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { EpicModule } from '../../project-management/epic/epic.module';
import { SprintComponent } from '../../project-management/sprint/sprint/sprint.component';
import { SprintModule } from '../../project-management/sprint/sprint.module';
import { StoryManagementModule } from '../../project-management/story/story-management.module';
import { ProjectManagementModule } from '../../project-management/project-management.module';
import { BugManagementModule } from '../../bug-management/bug-management.module';
import { PagesModule } from '../../pages.module';



@NgModule({
  declarations: [ProjectTabsComponent],
  imports: [
    CommonModule,
    UIModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    RouterModule,
    NgSelectModule,
    TabsModule,
    EpicModule,
    SprintModule,
    StoryManagementModule,
    ProjectManagementModule,
    BugManagementModule,
    
   // PagesModule
  ],
  exports: [
    ProjectTabsComponent
  ]
})
export class ProjectSharedModule { }
