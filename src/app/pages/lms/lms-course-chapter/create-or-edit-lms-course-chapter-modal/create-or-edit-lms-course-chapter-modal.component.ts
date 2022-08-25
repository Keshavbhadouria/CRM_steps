import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditCourseChapterDto, LmsCourseChapterService } from 'src/app/core/services/lms-course-chapter.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-lms-course-chapter-modal',
  templateUrl: './create-or-edit-lms-course-chapter-modal.component.html',
  //styleUrls: ['./create-or-edit-lms-course-chapter-modal.component.scss']
})
export class CreateOrEditLmsCourseChapterModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  lmsCourseChapter: CreateOrEditCourseChapterDto;
  loading = false;
  createLoader = false;

  public editor = ClassicEditor;

  constructor(private _lmsCourseChapterService: LmsCourseChapterService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.lmsCourseChapter = this.data;
    }
    else {
      this.lmsCourseChapter = new CreateOrEditCourseChapterDto();
      this.lmsCourseChapter.description = '';
    }
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.lmsCourseChapter) {
      this._lmsCourseChapterService.createOrEdit(this.lmsCourseChapter).then(res => {
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
}
