import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditStoryStatusDto, StoryStatusService } from 'src/app/core/services/story-status.service';

@Component({
  selector: 'app-create-or-edit-story-status-modal',
  templateUrl: './create-or-edit-story-status-modal.component.html'
  //styleUrls: ['./create-or-edit-story-status-modal.component.scss']
})
export class CreateOrEditStoryStatusModalComponent implements OnInit {

  constructor(private _storyStatusService: StoryStatusService,
    private _messageService: MessageService) { }

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  storyStatus: CreateOrEditStoryStatusDto;
  loading = false;
  createLoader = false;

  ngOnInit(): void {
    if (this.data) {
      this.storyStatus = this.data;
    }
    else {
      this.storyStatus = new CreateOrEditStoryStatusDto();
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.storyStatus) {
      this._storyStatusService.createOrEdit(this.storyStatus).then(res => {
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
