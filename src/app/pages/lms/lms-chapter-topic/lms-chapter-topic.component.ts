import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings, PipeFormat } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { LmsChapterTopicService } from 'src/app/core/services/lms-chapter-topic.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lms-chapter-topic',
  templateUrl: './lms-chapter-topic.component.html',
  //styleUrls: ['./lms-chapter-topic.component.scss']
})
export class LmsChapterTopicComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  topicNameFilter = '';
  parallelParkingFilter = -1;
  courseChapterChapterNameFilter = '';

  viewChapterTopic: any;
  editChapterTopic: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  chapterTopicList: any;
  myData: any = [];
  chapterId: string = '';

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
      primaryKey: 'courseChapterChapterName',
      header: 'ChapterName',
    },
    {
      primaryKey: 'chapterTopic.topicName',
      header: 'TopicName',
    },
    {
      primaryKey: 'CourseChapterTopicTypeName',
      header: 'TypeName',
    },
    {
      primaryKey: 'chapterTopic.dayNo',
      header: 'DayNo.',
    },
    {
      primaryKey: 'chapterTopic.sortIndex',
      header: 'SortIndex'
    },
    {
      primaryKey: 'chapterTopic.partTimeTraining',
      header: 'PartTime',
    },
    {
      primaryKey: 'chapterTopic.creationTime',
      header: 'CreatedOn',
      format: PipeFormat.DATE
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewChapterTopic = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {

        this.showLoader();
        this._lmsChapterTopicService.getChapterTopicForEdit(obj.chapterTopic.id).then(s => {
          this.hideLoader();
          this.editChapterTopic = s.result.chapterTopic;
          this.modalService.open(this.createModal, this.ngbModalOptions);
        });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.chapterTopic.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _lmsChapterTopicService: LmsChapterTopicService,
    private translate: TranslateService,
    private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this._activateRoute.paramMap.subscribe(x => {
      this.chapterId = x.get("chapterId");
    });
    this.breadCrumbItems = [{ label: 'LMS' }, { label: 'ChapterTopics', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();

    this._lmsChapterTopicService.getAll(
      this.filterText,
      undefined,
      undefined,
      this.topicNameFilter,
      this.parallelParkingFilter,
      this.courseChapterChapterNameFilter,
      this.chapterId,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.chapterTopicList = res.result.items;
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
    this.editChapterTopic = null;
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
          this._lmsChapterTopicService.delete(id)
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
