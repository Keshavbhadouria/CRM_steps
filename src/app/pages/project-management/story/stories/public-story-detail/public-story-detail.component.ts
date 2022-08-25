import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Routes } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { PmStoryManualTrackingService } from 'src/app/core/services/pm-story-manual-tracking.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { StoriesService } from 'src/app/core/services/stories.service';
import { StoryCommentService } from 'src/app/core/services/story-comment.service';

@Component({
  selector: 'app-public-story-detail',
  templateUrl: './public-story-detail.component.html',
  styleUrls: ['./public-story-detail.component.scss']
})
export class PublicStoryDetailComponent implements OnInit {
  sprintPublicId: string;
  storyPublicId: string;
  currentUserId: any;
  viewStory: any;
  isEnabled = false;

  constructor(
  private _storiesService: StoriesService,
  private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.storyPublicId = this.route.snapshot.paramMap.get('storyPublicId');
    this._storiesService.getPMStoryForEditByPublicId(this.storyPublicId).then(res => {
       this.viewStory = res.result;
       this.isEnabled = true;
    });
  }
}
