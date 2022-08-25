import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/core/services/message.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { PasswordComplexitySetting, UserEditDto, UserRoleDto, UsersService, CreateOrUpdateUserInput } from 'src/app/core/services/users.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { CollaboratorsService } from 'src/app/core/services/collaborators.service';
import { CollaboratorNotice, CreateOrEditCollaboratorDto } from 'src/app/core/models/Project/CreateOrEditCollaborator';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import Swal from 'sweetalert2';
import { PipeFormat } from 'src/app/core/pipes/formet-cell.pipe';

@Component({
  selector: 'app-collaborator-notice',
  templateUrl: './collaborator-notice.component.html',
  styleUrls: ['./collaborator-notice.component.scss']
})
export class CollaboratorNoticeComponent implements OnInit {

  allJobDescriptions: any;
  @Input() collaboratorId: any | undefined;
  years : any = Array.from(Array(21).keys());
  loading = false;
  CollaboratorNotice: CollaboratorNotice = new CollaboratorNotice();
  skills: any;
  myData: any;
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  appRootUrl = environment.apiURL;

   //#region Table Configurations

   tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'collaboratorNotice.noticeDate',
      header: 'Date',
      format:PipeFormat.DATE
    },
    {
      primaryKey: 'collaboratorNotice.reason',
      header: 'Reason',
     },
     {
      primaryKey: 'collaboratorNotice.note',
      header: 'Note',
     },
     {
      primaryKey: 'collaboratorNotice.fileURL',
      header: 'File',
      type:"link"
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

  constructor(private _userService: UsersService,private _collaboratorService: CollaboratorsService,
    private _profileService: ProfileService,
    private _translate: TranslateService,
    private _messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadDropDown();
    this.getRecords();
  }


  loadDropDown() {
    this.showLoader();
    const promises = [
      this._collaboratorService.GetAllSkillForLookupTable(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.skills = data[0].result.items;
        }
        this.hideLoader();
      });
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  save(): void {
    this.showLoader();
    this.CollaboratorNotice.CollaboratorNewId = this.collaboratorId;
    this._collaboratorService.createOrEditNotice(this.CollaboratorNotice).then((res) => {
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
    this._collaboratorService.getAllNotice(
      this.collaboratorId,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
        debugger
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  deleteCollaborator(data): boolean {
    return this._collaboratorService.deleteNotice(data.collaboratorNotice.id).then(res => {
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


  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('pdf') || event.target.files[0].type.includes('image')) {
      this.CollaboratorNotice.Filename = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.CollaboratorNotice.FileURL = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageAndPDFType");
    }
  }

  //#endregion API
}


