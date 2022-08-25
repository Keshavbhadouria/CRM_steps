import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { LmsCourseChapterService } from 'src/app/core/services/lms-course-chapter.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lms-course-chapter',
  templateUrl: './lms-course-chapter.component.html',
  //styleUrls: ['./lms-course-chapter.component.scss']
})
export class LmsCourseChapterComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  chapterNameFilter = '';
  courseCourseNameFilter = '';

  editLMSCourseChap: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  lmsCourseChapList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'courseChapter.chapterName',
      header: 'ChapterName',
    },
    {
      primaryKey: 'courseChapter.durationInMinutes',
      header: 'DurationInMinutes',
    },
    {
      primaryKey: 'courseChapter.sortIndex',
      header: 'SortIndex',
    },
    {
      primaryKey: 'courseChapter.creationTime',
      header: 'CreatedOn',
      format: PipeFormat.DATE
    }
  ];

  buttonSettings: ButtonSettings[] = [
    // {
    //   title: 'View',
    //   func: (obj) => {
    //     this.viewLMSCourse = obj;
    //     this.modalService.open(this.viewModal, this.ngbModalOptions);
    //   },
    //   icon: '../../../../assets/icons/Visual.png'
    // },
    {
      title: 'Edit',
      func: (obj) => {

        this.showLoader();
        this._lmsCourseChapterService.getCourseChapterForEdit(obj.courseChapter.id).then(s => {
          this.hideLoader();
          this.editLMSCourseChap = s.result.courseChapter;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.courseChapter.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
     {
      title: 'AddChapter',
      func: (obj) => {
        this._router.navigate(['lms/chaptertopics/' + obj.courseChapter.id]);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion


  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _lmsCourseChapterService: LmsCourseChapterService,
    private translate: TranslateService,
    private _router : Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'LMS' }, { label: 'Chapters', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();

    this._lmsCourseChapterService.getAll(
      this.filterText,
      this.chapterNameFilter,
      this.courseCourseNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.lmsCourseChapList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
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
  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.editLMSCourseChap = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  onDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: this.translate.instant('Areyousure?'),
        text: this.translate.instant('RevertMsg'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('confirmButtonTextMsg'),
        cancelButtonText: this.translate.instant('cancelButtonTextMsg'),
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._lmsCourseChapterService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess(this.translate.instant('Deleted!'),
                  this.translate.instant('RecordDeletedSuccessfully'));
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
}
