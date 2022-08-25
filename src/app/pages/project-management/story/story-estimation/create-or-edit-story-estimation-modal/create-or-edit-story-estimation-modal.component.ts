import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditStoryEstimationDto, StoryEstimationService } from 'src/app/core/services/story-estimation.service';

@Component({
  selector: 'app-create-or-edit-story-estimation-modal',
  templateUrl: './create-or-edit-story-estimation-modal.component.html'
  //styleUrls: ['./create-or-edit-story-estimation-modal.component.scss']
})
export class CreateOrEditStoryEstimationModalComponent implements OnInit {

  constructor(private _storyEstimationService: StoryEstimationService,
    private _messageService: MessageService) { }

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  storyEstimation: CreateOrEditStoryEstimationDto;
  loading = false;
  createLoader = false;

  ngOnInit(): void {
    if (this.data) {
      this.storyEstimation = this.data;
    }
    else {
      this.storyEstimation = new CreateOrEditStoryEstimationDto();
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.storyEstimation) {
      this._storyEstimationService.createOrEdit(this.storyEstimation).then(res => {
        if (res.success) {
          this.hideCreateEditLoader();
          this.$modalClose.emit(true);
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

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

}
