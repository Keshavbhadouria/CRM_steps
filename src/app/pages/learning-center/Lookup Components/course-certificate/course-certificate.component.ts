import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CourseCertificateDto, CourseCertificateService } from 'src/app/core/services/course-certificate.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-certificate',
  templateUrl: './course-certificate.component.html',
  styleUrls: ['./course-certificate.component.scss']
})
export class CourseCertificateComponent implements OnInit {

  loading = false;
  courseCertificate: CourseCertificateDto = new CourseCertificateDto();
  myData: any;
  breadCrumbItems: Array<{}>;
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  appRootUrl = environment.apiURL;

   //#region Table Configurations

   tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'courseCertificate.name',
      header: 'Name',
    },
    {
      primaryKey: 'courseCertificate.urlFile',
      header: 'File',
      type:'Link'
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
    private _courseCertificateService: CourseCertificateService,
    private _translate: TranslateService,
    private _messageService: MessageService) {
      this.breadCrumbItems = [{ label: 'LearningCenter' }, { label: 'Course Certificate', active: true }];
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


  handleUpload(event) {
    const file = event.target.files[0];

      let Filename = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.courseCertificate.URLFile = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };

    // else {
    //   this.myInputVariable.nativeElement.value = "";
    //   this._messageService.showError("Common.Title.Error", "Messages.OnlyImageAndPDFType");
    // }
  }


  save(): void {

    if (!this.courseCertificate.URLFile)
      return this._messageService.showError('Error', 'Please select certificate');

    this.showLoader();

    this._courseCertificateService.createOrEdit(this.courseCertificate).then((res) => {
      this.courseCertificate = new CourseCertificateDto();
      this.myInputVariable.nativeElement.value = "";
      this.hideLoader();
      this._messageService.showSuccess("", this._translate.instant('SavedSuccessfully'));
      this.paginationSettings.pageIndex = 0;
      this.getRecords();
    }).finally(() => {
      this.hideLoader()
    });
  }

  onDelete(pmCollaborator) {
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
          if (this.deleteCollaborator(pmCollaborator)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
            this.myData = this.myData.filter(obj => { return obj !== pmCollaborator });
          } else {
            this._messageService.showServerSideError();
          }
        }
      });
  }


  //#region API Methods

  getRecords() {
    this.showLoader();
    this._courseCertificateService.getAll(
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

  deleteCollaborator(data): boolean {
    return this._courseCertificateService.delete(data.courseCertificate.id).then(res => {
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


