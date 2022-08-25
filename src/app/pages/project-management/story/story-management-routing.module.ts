import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PMStoryBoardComponent } from './pmstory-board/pmstory-board.component';
import { PublicStoryDetailComponent } from './stories/public-story-detail/public-story-detail.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryEstimationComponent } from './story-estimation/story-estimation.component';
import { StoryPriorityComponent } from './story-priority/story-priority.component';
import { StoryStatusComponent } from './story-status/story-status.component';

const routes: Routes = [
  { path: 'storyboard', component: PMStoryBoardComponent },
  { path: 'storystatuses', component: StoryStatusComponent },
  { path: 'storypriorities', component: StoryPriorityComponent },
  { path: 'storyestimations', component: StoryEstimationComponent },
  { path: 'stories/:sprintId', component: StoriesComponent },
  { path: 'story/:storyPublicId', component:PublicStoryDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryManagementRoutingModule { }
