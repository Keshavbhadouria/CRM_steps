import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChaptersAndTopics, CreateOrEditCourseDto, LmsCourseService } from 'src/app/core/services/lms-course.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { NameValueDto } from 'src/app/core/services/supports.service';

@Component({
  selector: 'app-create-or-edit-course-modal',
  templateUrl: './create-or-edit-course-modal.component.html',
  //styleUrls: ['./create-or-edit-course-modal.component.scss']
})
export class CreateOrEditCourseModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  lmsCourse: CreateOrEditCourseDto;
  loading = false;
  createLoader = false;

  public editor = ClassicEditor;
  public taskEditor = ClassicEditor;
  courseChapterDetails: ChaptersAndTopics; //for edit only

  chapters: any = [];
  topics: any = [];

  @ViewChild("courseChapForm") courseChapForm;
  @ViewChild("createChapterTopicModal") createChapterTopicModal: ElementRef
  courseId: string = '';

  public chapterAndTopics: Array<ChaptersAndTopics> = Array<ChaptersAndTopics>();

  constructor(private _lmsCourseService: LmsCourseService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.chapterAndTopics = Array<ChaptersAndTopics>();
    this.courseChapterDetails = new ChaptersAndTopics();
    this.courseChapterDetails.tasks = '';
    if (this.data) {

      this.lmsCourse = this.data;
      this.courseId = this.data.id;

      this.lmsCourse.courseChapterTopicRelations = this.data.courseChapterTopicRelations;
    }
    else {
      this.lmsCourse = new CreateOrEditCourseDto();
      this.lmsCourse.description = '';
    }
    this.loadDropDown();
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._lmsCourseService.getAllChaptersTableDropdown(),
      this._lmsCourseService.getAllTopicsTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.chapters = data[0].result;
          this.topics = data[1].result;

          if (this.courseId.length > 0) {
            this.lmsCourse.courseChapterTopicRelations.forEach(s => {
              var obje = new ChaptersAndTopics();
              obje.dayNo = s.dayNo;
              obje.chapters = s.chapters;
              obje.tasks = s.tasks;
              obje.topics = s.topics;
              obje.chaptDes = this.getChaptersDescription(obje.chapters);
              obje.topicDes = this.gettopicsDescription(obje.topics);

              this.chapterAndTopics.push(obje);

            });
            this.sortChapterAndTopics();
          }
        }
        this.hideLoader();
      });
  }

  save(): void {
    this.showCreateEditLoader();
    if (this.lmsCourse) {
      this.lmsCourse.courseChapterTopicRelations = this.chapterAndTopics;
      this._lmsCourseService.createOrEdit(this.lmsCourse).then(res => {
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

  calTotalHours(): void {
    this.lmsCourse.totalHours = this.lmsCourse.practicalHours + this.lmsCourse.theoricalHours;
  }

  modalRef: any;
  recordIndex: number = -1;
  openChapTopicModal(content): void {
    this.recordIndex = -1;
    this.courseChapterDetails = new ChaptersAndTopics();
    this.courseChapterDetails.tasks = '';
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      size: 'xl'
    })
  }

  closeModal(): void {
    this.modalRef.dismiss();
  }

  editRecord(i, content): void {

    this.recordIndex = i;
    let record = this.chapterAndTopics.find((e, index, array) => index === i);
    this.courseChapterDetails = record;
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      size: 'xl'
    });
  }

  saveChapTopicDetails(): void {

    if (this.recordIndex > -1) {
      let record = this.chapterAndTopics.find((e, index, array) => index === this.recordIndex);
      record.dayNo = this.courseChapterDetails.dayNo;
      record.chapters = this.courseChapterDetails.chapters;
      record.tasks = this.courseChapterDetails.tasks;
      record.topics = this.courseChapterDetails.topics;
      record.chaptDes = this.getChaptersDescription(record.chapters);
      record.topicDes = this.gettopicsDescription(record.topics);
    }
    else {
      var obje = new ChaptersAndTopics();
      obje.dayNo = this.courseChapterDetails.dayNo;
      obje.chapters = this.courseChapterDetails.chapters;
      obje.tasks = this.courseChapterDetails.tasks;
      obje.topics = this.courseChapterDetails.topics;
      obje.chaptDes = this.getChaptersDescription(obje.chapters);
      obje.topicDes = this.gettopicsDescription(obje.topics);

      this.chapterAndTopics.push(obje);
    }
    this.modalRef.dismiss();
    this.sortChapterAndTopics();
  }

  sortChapterAndTopics(): void {
    this.chapterAndTopics = this.chapterAndTopics.sort((a, b) => {
      return a.dayNo - b.dayNo;
    });
  }

  removeItem(index): void {
    this.chapterAndTopics.splice(index, 1);
    this.sortChapterAndTopics();
  }

  getChaptersDescription(selectedChapters: string[]): string {
    var descriptions = '';
    selectedChapters.forEach(s => {
      let desc = this.chapters.find(x => x.id === s);
      if (descriptions.length === 0) {
        descriptions = desc.displayName;
      }
      else {
        descriptions += ',' + desc.displayName
      }
    });
    return descriptions;
  }
  gettopicsDescription(selectedTopics: string[]): string {
    var descriptions = '';
    selectedTopics.forEach(s => {
      let desc = this.topics.find(x => x.id === s);
      if (descriptions.length === 0) {
        descriptions = desc.displayName;
      }
      else {
        descriptions += ',' + desc.displayName
      }
    });
    return descriptions;
  }


  changeDayNo(dayNo: number, type: string): void {
    if (type === 'up') {
      let record = this.chapterAndTopics.find((e, i, arr) => e.dayNo === dayNo);
      record.dayNo -= 1;

      let recordBeforeCurrRecord = this.chapterAndTopics.find((e, i, arr) => e.dayNo === (dayNo - 1));
      recordBeforeCurrRecord.dayNo += 1;

      this.sortChapterAndTopics();
    }
    else {
      let recordBeforeCurrRecord = this.chapterAndTopics.find((e, i, arr) => e.dayNo === (dayNo + 1));
      recordBeforeCurrRecord.dayNo -= 1;
      
      let record = this.chapterAndTopics.find((e, i, arr) => e.dayNo === dayNo);
      record.dayNo += 1;

      this.sortChapterAndTopics();

    }
  }
}
