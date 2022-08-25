import { Component, OnInit } from '@angular/core';
// import { IAjaxResponse, TokenService } from 'abp-ng2-module';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { MessageService } from 'src/app/core/services/message.service';
import { ProfileService, UpdateProfilePictureInput } from 'src/app/core/services/profile.service';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  breadCrumbItems: any;
  public active = false;
  public uploader: FileUploader;
  public temporaryPictureUrl: string;
  public saving = false;
  public maxProfilPictureBytesUserFriendlyValue = 5;
  public useGravatarProfilePicture = false;
  private _uploaderOptions: FileUploaderOptions = {};

  imageChangedEvent: any = '';
  constructor(private _profileService: ProfileService,
      private _messageService: MessageService,
      private _authService: AuthenticationService
     ) { }

  initializeModal(): void {
    this.active = true;
    this.temporaryPictureUrl = '';
   // this.useGravatarProfilePicture = this.setting.getBoolean('App.UserManagement.UseGravatarProfilePicture');
    this.initFileUploader();
  }
  ngOnInit(): void {
    this.initializeModal();
      
  }

  close(): void {
    this.active = false;
    this.imageChangedEvent = '';
    this.uploader.clearQueue();
  }

  fileChangeEvent(event: any): void {
    if (event.target.files[0].size > 5242880) { //5MB
      this._messageService.showError("", "Size Limit issue");
      // this.message.warn(this.l('ProfilePicture_Warn_SizeLimit', this.maxProfilPictureBytesUserFriendlyValue));
      return;
    }

    this.imageChangedEvent = event;
  }

  imageCroppedFile(event: ImageCroppedEvent) {
    this.uploader.clearQueue();
    this.uploader.addToQueue([<File>base64ToFile(event.base64)]);
  }

  initFileUploader(): void {
    this.uploader = new FileUploader({ url: environment.apiURL + '/Profile/UploadProfilePicture' });
    this._uploaderOptions.autoUpload = false;
    this._uploaderOptions.authToken = 'Bearer ' + this._authService.getAccessToken();
    this._uploaderOptions.removeAfterUpload = true;
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
      form.append('FileType', fileItem.file.type);
      form.append('FileName', 'ProfilePicture');
      form.append('FileToken', this.guid());
    };

    this.uploader.onSuccessItem = (item, response, status) => {
      const resp = JSON.parse(response);
      if (resp.success) {
        this.updateProfilePicture(resp.result.fileToken);
      } else {
        this._messageService.showError("",resp.error.message)
        //this.message.error(resp.error.message);
      }
    };

    this.uploader.setOptions(this._uploaderOptions);
  }

  updateProfilePicture(fileToken: string): void {
    const input = new UpdateProfilePictureInput();
    input.fileToken = fileToken;
    input.x = 0;
    input.y = 0;
    input.width = 0;
    input.height = 0;

    this.saving = true;
    this._profileService.updateProfilePicture(input)
      .then(() => {
        this._messageService.showSuccess("","Profile Image Updated");
        this.imageChangedEvent = '';
        this.uploader.clearQueue();
        this.saving = false;
        
       // abp.setting.values['App.UserManagement.UseGravatarProfilePicture'] = this.useGravatarProfilePicture.toString();
        //abp.event.trigger('profilePictureChanged');
        //this.close();
      });
  }

  updateProfilePictureToUseGravatar(): void {
    const input = new UpdateProfilePictureInput();
    input.useGravatarProfilePicture = this.useGravatarProfilePicture;

    this.saving = true;
    this._profileService.updateProfilePicture(input)
      .then(() => {
        this._messageService.showSuccess("","Profile Image Updated");
        this.imageChangedEvent = '';
        this.uploader.clearQueue();
        this.saving = false;
      });
  }

  guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  save(): void {
    if (this.useGravatarProfilePicture) {
      this.updateProfilePictureToUseGravatar();
    } else {
      this.uploader.uploadAll();
    }

  }

}
