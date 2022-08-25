import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CourseChapterAssignmentService, CreateOrEditAssignmentDto } from 'src/app/core/services/course-chapter-assignment.service';
import { MessageService } from 'src/app/core/services/message.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-course-chapter-assignments',
  templateUrl: './course-chapter-assignments.component.html',
  styleUrls: ['./course-chapter-assignments.component.scss']
})
export class CourseChapterAssignmentsComponent implements OnInit {

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

  assignment: CreateOrEditAssignmentDto = new CreateOrEditAssignmentDto();

  constructor(private _assignmentService: CourseChapterAssignmentService, private _messageService: MessageService, private modalService: NgbModal) {

    this._assignmentService.getAllCourseChapterNewForTableDropdown().subscribe((result: any) => {

      this.allCourseChapterNews = result.result.items;
    });

   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'LearningCenter' }, { label: 'Resource Material', active: true }];

    if (this.data) {
      this.assignment = this.data;
    }
    else {
      this.assignment = new CreateOrEditAssignmentDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.assignment) {
      this._assignmentService.createOrEdit(this.assignment).subscribe((res: any) => {
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

