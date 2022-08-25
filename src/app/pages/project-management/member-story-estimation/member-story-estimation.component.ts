import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditUserStoryEstimationDto, SprintService } from 'src/app/core/services/sprint.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-story-estimation',
  templateUrl: './member-story-estimation.component.html',
  styleUrls: ['./member-story-estimation.component.scss']
})
export class MemberStoryEstimationComponent implements OnInit {
  @Input() sprintId;
  @Input() projectId;

  //sprintId: any;
  breadCrumbItems: Array<{}>;
  sprintsDetail: { project: any; };
  loading: boolean;
  data:any;
  input: CreateOrEditUserStoryEstimationDto = new CreateOrEditUserStoryEstimationDto();
  currentStoryId:any;
  currentEstimateId: any;
  createLoader = false;

  constructor(private route: ActivatedRoute, private _sprintService: SprintService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.showLoader();
    this.breadCrumbItems = [{ label: 'StoryEstimation' }, { label: 'Stories', active: true }];
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');
    this.sprintsDetail={project:environment.emptyGuid};
    if(this.sprintId != environment.emptyGuid){
      this.getSprintDetail();
      this.getMemberEstimationAndStories();
    }
    else{
      this.sprintsDetail={project:0};
    }
  }
  getMemberEstimationAndStories(){
    this.showLoader();
    this._sprintService.getMemberEstimationAndStories(this.sprintId).then(res=>{
      this.data = res.result;
      this.hideLoader();
    })
  }
  getSprintDetail(){
    this._sprintService.getSprintForView(this.sprintId).then(res => {
      this.hideLoader();
      if (res.success) {
        this.sprintsDetail = res.result.pmSprint;
      } else {
        this._messageService.showServerSideError();
      }
    })
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  changeStory(storyId){
    this.input.pmStoryId = storyId;
  }
  changeEstimate(estimate){
    this.data.lstStoryEstimate.forEach(element => {
        element.isSelected = false;
    });
    estimate.isSelected = true;
    this.input.pmStoryEstimationId = estimate.id;
  }
  estimateStory(){
    
    this.showCreateEditLoader();
    if(this.input.pmStoryId == null || this.input.pmStoryId == undefined){
      this._messageService.showError("","Please Select Story");
    }
    else if(this.input.pmStoryEstimationId == null || this.input.pmStoryEstimationId == undefined){
      this._messageService.showError("","Please Select Estimation");
    }
    else{
      this._sprintService.createOrEditEstimate(this.input).then(res => {
        if (res.success) {
          this.hideCreateEditLoader();
          this._messageService.showSuccess("", "Estimate Successfully");
        } else {
          this.hideCreateEditLoader();
          this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
      });
    }
  }
  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }
}
