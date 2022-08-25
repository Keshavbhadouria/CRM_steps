import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SprintPlanningService } from 'src/app/core/services/sprint-planning.service';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';

@Component({
  selector: 'app-sprint-planning',
  templateUrl: './sprint-planning.component.html',
  styleUrls: ['./sprint-planning.component.scss']
})
export class SprintPlanningComponent implements OnInit {
  @ViewChild('storyContent') storyContent: ElementRef;
  isReveal: boolean = false;
  revealAvg: number = 0.00;
  breadCrumbItems: ({ label: string; active?: undefined; } | { label: string; active: boolean; })[];
  loading = false;
  storyInfo: any;
  constructor(private _sprintService: SprintPlanningService) { }
  allSprints: DropdownDto[] = [];
  allProjects: DropdownDto[] = [];
  sprintId: any;
  allStories: any;
  allSelectedStories = [];
  allUserEstmate = [];
  currentStoryId: any;
  transform = "transformfront";
  isButtonSection = false;
  projectId: any;
  ngOnInit(): void {
    this.showLoader();
    this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'SprintPlanning', active: true }];
    const promises = [
      this._sprintService.getAllPMSProjectForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allProjects = data[0].result;
        }
        this.hideLoader();
      });
  }

  changeProject(): void {
    if (this.projectId === null) {
      this.sprintId = '';
      this.allSprints = [];
      this.allStories = [];
      this.allSelectedStories = [];
    }
    else {
      this.sprintId = '';
      this.allSprints = [];
      this.allStories = [];
      this.allSelectedStories = [];

      this.showLoader();
      debugger;
      this._sprintService.getAllSprintByProjectIdWithGuid(this.projectId).then(res => {
        this.allSprints = res.result;
        this.hideLoader();
      });
    }

  }

  changeSprit(sprint) {

    if (sprint === undefined) {
      this.allStories = [];
      this.allSelectedStories = [];
    }
    else {
      this.showLoader();
      this._sprintService.getStoriesBySprintId(sprint.id).then(res => {
        this.allStories = res.result;
        this.hideLoader();
      });
    }
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  changeStory(event, story) {
    if (event.currentTarget.checked) {
      var selectedStory = {
        id: story.id,
        displayName: story.displayName,
        isSelected: false
      }
      this.allSelectedStories.push(selectedStory);
    }
    else {
      var removeIndex = this.allSelectedStories.map(function (item) { return item.id; }).indexOf(story.id);
      this.allSelectedStories.splice(removeIndex, 1);
    }
  }
  flipcard() {
    this.isReveal = true;
    this.transform = "transformback";
  }

  updateVote(storyId, status) {
    var isOpen = false;
    if (status == "open") {
      isOpen = true;
      this.storyInfo.pmStory.isOpen = true;
    }
    else if (status == "close") {
      this.storyInfo.pmStory.isOpen = false;
    }
    this.showLoader();
    this._sprintService.updateVote(storyId, isOpen).then(res => {
      this.hideLoader();
    });
  }
  getUserEstimateAndStoryDetails(storyId) {
    this.isReveal = false;
    this.allUserEstmate = [];
    this.currentStoryId = storyId
    this.allSelectedStories.forEach(function (x) {
      x.isSelected = false;
      if (x.id == storyId) {
        x.isSelected = true;
      }
    });
    this.transform = "transformfront";
    this.showLoader();
    const promises = [
      this._sprintService.getUserEstimationByStoryId(storyId),
      this._sprintService.getPMStoryForView(storyId)
    ];
    Promise.all(promises).then(data => {
      var totalEstimate = 0.00;
      var noOfEstimate = 0
      this.allUserEstmate = data[0].result;
      this.allUserEstmate.forEach(x => {
        totalEstimate += parseFloat(x.estimation);
        noOfEstimate += 1;
      });
      this.storyInfo = data[1].result;
      this.isButtonSection = true;
      if (noOfEstimate > 0)
        this.revealAvg = totalEstimate / noOfEstimate;
      this.hideLoader();
    });
  }
  scrollLeft() {
    this.storyContent.nativeElement.scrollLeft -= 165;
  }

  scrollRight() {
    this.storyContent.nativeElement.scrollLeft += 165;
  }
}
