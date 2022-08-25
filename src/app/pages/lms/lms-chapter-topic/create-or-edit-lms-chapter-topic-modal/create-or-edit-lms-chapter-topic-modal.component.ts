import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditChapterTopicDto, LmsChapterTopicService } from 'src/app/core/services/lms-chapter-topic.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-or-edit-lms-chapter-topic-modal',
  templateUrl: './create-or-edit-lms-chapter-topic-modal.component.html',
  //styleUrls: ['./create-or-edit-lms-chapter-topic-modal.component.scss']
})
export class CreateOrEditLmsChapterTopicModalComponent implements OnInit {


  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  chapterTopic: CreateOrEditChapterTopicDto;
  loading = false;
  createLoader = false;
  @Input() chapterId: any;

  chapters: any[];
  topicTypes: any[];
  tasks: any[];
  isTaskTypeTopic = false;

  public editor = ClassicEditor;

  constructor(private _lmsChapterTopicService: LmsChapterTopicService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.chapterTopic = this.data;
    }
    else {
      this.chapterTopic = new CreateOrEditChapterTopicDto();
      this.chapterTopic.description = '';

    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._lmsChapterTopicService.getAllChaptersTableDropdown(),
      this._lmsChapterTopicService.getAllTopicTypesTableDropdown(),
      this._lmsChapterTopicService.getAllRecurrentTasksTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.chapters = data[0].result;
          this.topicTypes = data[1].result;
          this.tasks = data[2].result;

          if (this.chapterId !== undefined && !this.data) {
            this.chapterTopic.chapterId = this.chapterId;
          }
          if (this.data) {
            let topicType = this.topicTypes.find(s => s.id === this.chapterTopic.topicTypeId2);
            this.showHideTasks(topicType);
          }
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.chapterTopic) {
      this._lmsChapterTopicService.createOrEdit(this.chapterTopic).then(res => {
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
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
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
  showHideTasks(event): void {
    if (event.displayName === 'Task') {
      this.isTaskTypeTopic = true;
    }
    else { this.isTaskTypeTopic = false; }
  }
}
