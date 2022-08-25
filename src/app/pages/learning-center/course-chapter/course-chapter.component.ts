import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import { CreateOrEditCourseChapterDto, LearningCenterChapterService } from 'src/app/core/services/learning-center-chapter.service';
import { LearningCenterCourseNewService } from 'src/app/core/services/learning-center-course-new.service';

@Component({
  selector: 'app-course-chapter',
  templateUrl: './course-chapter.component.html',
  styleUrls: ['./course-chapter.component.scss']
})
export class CourseChapterComponent implements OnInit {

  apiURL = environment.apiURL;
  breadCrumbItems: Array<{}>;

  advancedFiltersAreShown = false;
  filterText = '';
  courseCodeFilter = '';
  courseNameFilter = '';
  active = false;

  editor = ClassicEditor;



  selectedIndex: number;

  viewLMSCourse: any;
  editLMSCourse: any;
  loading = false;
  listLoader = false;
  createLoader = false;

  totalCount: number = 0;
  lmsCoutseList: any;
  myData: any = [];
  lcChapter: CreateOrEditCourseChapterDto = new CreateOrEditCourseChapterDto();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  categories = [];
  certificates = [];
  viewCourse: any;

  // certificates = [{id : 1 , displayName : 'Certificate A'},{id : 2 , displayName : 'Certificate B'}]

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;
  @ViewChild('createMaterialModal') createMaterialModal: ElementRef;
  @ViewChild('createAssignmentModal') createAssignmentModal: ElementRef;
  @ViewChild('createContentModal') createContentModal: ElementRef;
  @ViewChild('createQuizModal') createQuizModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };


  chapterMaterils = [
    { id: 1, name: 'Material' },
    { id: 2, name: 'Assignments' },
    { id: 3, name: 'Content' },
    { id: 4, name: 'Quiz' }
  ]

  //#region Table Configurations





  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _translate: TranslateService,
    private _chapterService: LearningCenterChapterService,
    private _courseService: LearningCenterCourseNewService,
    private _translateService: TranslateService,) {
    //this.loadDropDown();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'LearningCenter' }, { label: 'Chapter', active: true }];
    this.getRecords();
  }
  getRecords() {
    this.showListLoader();
    this._courseService.getAll(
      this.filterText,
      this.courseCodeFilter,
      this.courseNameFilter,
      null,
      0,
      1000
    ).then(res => {
      this.hideListLoader();
      if (res.success) {
        this.lmsCoutseList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  dayNoDown() {
    if (this.lcChapter.dayNo > 0)
      this.lcChapter.dayNo = this.lcChapter.dayNo - 1;
  }

  dayNoUp() {
    this.lcChapter.dayNo = this.lcChapter.dayNo + 1;
  }

  setSelectedIndex(i) {
    this.selectedIndex = i;
  }


  loadDropDown() {
    this.showLoader();
    const promises = [
      // this._chapterService.getAllCourseCategoryForTableDropdown(),
      // this._chapterService.getAllCourseCertificateForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {

        if (data.length > 0) {
          this.categories = data[0].result;
          this.certificates = data[1].result;
        }
      }).finally(() => {
        this.hideLoader()
      })
  }

  onView(item) {
    this.viewCourse = item;
    this.modalService.open(this.viewModal, this.ngbModalOptions);
  }

  openModal(i) {
    switch (i) {
      case 1:
        this.modalService.open(this.createMaterialModal, this.ngbModalOptions);
        break;
      case 2:
        this.modalService.open(this.createAssignmentModal, this.ngbModalOptions);
        break;
      case 3:
        this.modalService.open(this.createContentModal, this.ngbModalOptions);
        break;
      case 4:
        this.modalService.open(this.createQuizModal, this.ngbModalOptions);
        break;

      default:
        break;
    }
  }

  onSave(): void {

    // if (!this.lcChapter.url)
    //   return this._messageService.showError('Error', 'Please select thumbnail');

    // this.showLoader();

    // this._chapterService.createOrEdit(this.lcChapter).then((res) => {
    //   this.resetModel();
    //   this.hideLoader();
    //   this._messageService.showSuccess("", this._translate.instant('SavedSuccessfully'));
    //   this.getRecords();
    // }).finally(() => {
    //   this.hideLoader()
    // });
  }

  onCancel() {
    this.resetModel();
  }

  resetModel() {
    this.lcChapter = new CreateOrEditCourseChapterDto();
    this.myInputVariable.nativeElement.value = "";
  }

  edit(item) {
    this.lcChapter = item.courseNew;
  }

  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('pdf') || event.target.files[0].type.includes('image')) {
      let Filename = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // reader.onload = () => {
      //   this.lcChapter.thumbnail = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      // };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageAndPDFType");
    }
  }



  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  showListLoader() {
    this.listLoader = true;
  }

  hideListLoader() {
    this.listLoader = false;
  }

  filterRecords() {
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.editLMSCourse = null;

  }

  modalEmitEvent() {
    this.closeCreateModal();
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
        title: this._translateService.instant('Areyousure?'),
        text: this._translateService.instant('RevertMsg'),
        icon: 'warning',
        confirmButtonText: this._translateService.instant('confirmButtonTextMsg'),
        cancelButtonText: this._translateService.instant('cancelButtonTextMsg'),
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._chapterService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess(this._translateService.instant('Deleted!'),
                  this._translateService.instant('RecordDeletedSuccessfully'));
              }
              else {
                this._messageService.showServerSideError();
              }
            }
            );
        }
      });
  }
}
