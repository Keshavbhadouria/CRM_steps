import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryManagementRoutingModule } from './story-management-routing.module';
import { StoryStatusComponent } from './story-status/story-status.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateOrEditStoryStatusModalComponent } from './story-status/create-or-edit-story-status-modal/create-or-edit-story-status-modal.component';
import { ViewStoryStatusModalComponent } from './story-status/view-story-status-modal/view-story-status-modal.component';
import { StoryPriorityComponent } from './story-priority/story-priority.component';
import { CreateOrEditStoryPriorityModalComponent } from './story-priority/create-or-edit-story-priority-modal/create-or-edit-story-priority-modal.component';
import { ViewStoryPriorityModalComponent } from './story-priority/view-story-priority-modal/view-story-priority-modal.component';
import { StoryEstimationComponent } from './story-estimation/story-estimation.component';
import { CreateOrEditStoryEstimationModalComponent } from './story-estimation/create-or-edit-story-estimation-modal/create-or-edit-story-estimation-modal.component';
import { ViewStoryEstimationModalComponent } from './story-estimation/view-story-estimation-modal/view-story-estimation-modal.component';
import { StoriesComponent } from './stories/stories.component';
import { CreateOrEditStoryModalComponent } from './stories/create-or-edit-story-modal/create-or-edit-story-modal.component';
import { ViewStoryModalComponent } from './stories/view-story-modal/view-story-modal.component';
import { PMStoryBoardComponent } from './pmstory-board/pmstory-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoryDetailComponent } from './stories/story-detail/story-detail.component';
import { ProjectSharedModule } from '../../shared/project-tabs/project-shared.module';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {FilterService} from 'primeng/api';
import { PublicStoryDetailComponent } from './stories/public-story-detail/public-story-detail.component';

@NgModule({
  declarations: [
    StoryStatusComponent,
    CreateOrEditStoryStatusModalComponent,
    ViewStoryStatusModalComponent,
    
    StoryPriorityComponent,
    CreateOrEditStoryPriorityModalComponent,
    ViewStoryPriorityModalComponent,
    PMStoryBoardComponent,
    StoryEstimationComponent,
    CreateOrEditStoryEstimationModalComponent,
    ViewStoryEstimationModalComponent,
    StoriesComponent,
    CreateOrEditStoryModalComponent,
    ViewStoryModalComponent,
    StoryDetailComponent,
    PublicStoryDetailComponent,
  ],
  imports: [
    CommonModule,
    StoryManagementRoutingModule,
    TableModule,
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    DragDropModule,
    //ProjectSharedModule,
    PaginatorModule,
    BsDropdownModule,
  ],
  exports: [
    StoriesComponent,
    PMStoryBoardComponent
  ]
})
export class StoryManagementModule { }
