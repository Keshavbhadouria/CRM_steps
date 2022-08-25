import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditQuizDto, CourseChapterQuizService } from 'src/app/core/services/course-chapter-quiz.service';
import { MessageService } from 'src/app/core/services/message.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-course-chapter-quiz',
  templateUrl: './course-chapter-quiz.component.html',
  styleUrls: ['./course-chapter-quiz.component.scss']
})
export class CourseChapterQuizComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;
  editor = ClassicEditor;



  totalCount: number = 0;
  projectList: any;

  allCourseChapterNews: DropdownDto[];

  // Create

  active = false;
  saving = false;

  quiz: CreateOrEditQuizDto = new CreateOrEditQuizDto();

  constructor(private _quizService: CourseChapterQuizService, private _messageService: MessageService, private modalService: NgbModal) {

    this._quizService.getAllCourseChapterNewForTableDropdown().subscribe((result: any) => {

      this.allCourseChapterNews = result.result.items;
    });

   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'LearningCenter' }, { label: 'Resource Material', active: true }];

    if (this.data) {
      this.quiz = this.data;
    }
    else {
      this.quiz = new CreateOrEditQuizDto();
    }



  }


  //#region API Methods

  dayNoDown() {

  }

  dayNoUp() {

  }


  save() {
    this.showCreateEditLoader();
    if (this.quiz) {
      this._quizService.createOrEdit(this.quiz).subscribe((res: any) => {
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



  //#endregion


  //#region Helper Methods


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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}

