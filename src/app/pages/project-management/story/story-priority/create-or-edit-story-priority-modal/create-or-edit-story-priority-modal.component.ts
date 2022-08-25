import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditPMProjectDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditStoryPriorityDto, StoryPriorityService } from 'src/app/core/services/story-priority.service';

@Component({
  selector: 'app-create-or-edit-story-priority-modal',
  templateUrl: './create-or-edit-story-priority-modal.component.html',
  //styleUrls: ['./create-or-edit-story-priority-modal.component.scss']
})
export class CreateOrEditStoryPriorityModalComponent implements OnInit {

  constructor(private _storyPriorityService: StoryPriorityService,
    private _messageService: MessageService) { }

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  storyPriority: CreateOrEditStoryPriorityDto;
  loading = false;
  createLoader = false;

  ngOnInit(): void {
    if (this.data) {
      this.storyPriority = this.data;
    }
    else {
      this.storyPriority = new CreateOrEditStoryPriorityDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.storyPriority) {
      this._storyPriorityService.createOrEdit(this.storyPriority).then(res => {
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
