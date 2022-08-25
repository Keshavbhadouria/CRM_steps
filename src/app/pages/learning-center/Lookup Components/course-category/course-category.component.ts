import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CourseCategoryDto, LMSCourseCategoryService } from 'src/app/core/services/lmscourse-category.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.scss']
})
export class CourseCategoryComponent implements OnInit {

  loading = false;
  category: CourseCategoryDto = new CourseCategoryDto();
  myData: any;
  breadCrumbItems: Array<{}>;

  appRootUrl = environment.apiURL;

   //#region Table Configurations

   tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'courseCategory.category',
      header: 'Category',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(
    private _lmsCourseCategoryService: LMSCourseCategoryService,
    private _translate: TranslateService,
    private _messageService: MessageService) {
      this.breadCrumbItems = [{ label: 'LMS' }, { label: 'Course Category', active: true }];
  }

  ngOnInit(): void {
    this.getRecords();
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  save(): void {
    this.showLoader();
    this._lmsCourseCategoryService.createOrEdit(this.category).then((res) => {
      this.hideLoader();
      this._messageService.showSuccess("", this._translate.instant('SavedSuccessfully'));
      this.paginationSettings.pageIndex = 0;
      this.getRecords();
    }).finally(() => {
      this.hideLoader()
    });
  }

  onDelete(data) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          if (this.delete(data)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
            this.myData = this.myData.filter(obj => { return obj !== data });
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._lmsCourseCategoryService.getAll(
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.myData = [];
        this.myData = res.result.items;
        debugger
        this.paginationSettings.setPaginationData(res);
        debugger
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  delete(data): boolean {
    return this._lmsCourseCategoryService.delete(data.courseCategory.id).then(res => {
      if (res.success)
        return true;
      else
        return false;
    });
  }

  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  //#endregion API
}


