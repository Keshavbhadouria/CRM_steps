import { Component, OnInit } from '@angular/core';
import { CreateOrEditSocialMediaCredentialsDto, SocialMediaService } from 'src/app/core/services/social-media.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/core/services/message.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-social-media-credentials',
  templateUrl: './social-media-credentials.component.html',
  styleUrls: ['./social-media-credentials.component.scss']
})
export class SocialMediaCredentialsComponent implements OnInit {

  socialMediaCredentials: CreateOrEditSocialMediaCredentialsDto = new CreateOrEditSocialMediaCredentialsDto();
  breadCrumbItems: any;
  isLoading = false;
  constructor(private _socialMediaService: SocialMediaService ,private _messageService: MessageService,private _translate: TranslateService,) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'SocialMedia' }, { label: 'Credentials', active: true }];
    this.getCredentials();

  }


  getCredentials() {
    this.isLoading = true;
    this._socialMediaService.getSocialMediaCredentials().then(res => {
      if (res.success) {
        if (res.result.socialMediaCredentials != null) {
          this.socialMediaCredentials = res.result.socialMediaCredentials;
        }
      }
    }).finally(() => {
      this.isLoading = false;
    });
  }

  save(): void {
    this.isLoading = true;
    this._socialMediaService.createOrEdit(this.socialMediaCredentials)
     .pipe(finalize(() => { this.isLoading = false;}))
      .subscribe((res : any) => {
       if (res.success) {
        this._messageService.showSuccess(this._translate.instant("Success"), this._translate.instant("SavedSuccessfully"));
       }
       else {
        this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
     });
}


}
