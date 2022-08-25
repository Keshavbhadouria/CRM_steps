import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { SocialMediaDataComponent } from './social-media-data/social-media-data.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocialMediaCredentialsComponent } from './social-media-credentials/social-media-credentials.component';
import { LanguageService } from 'src/app/core/services/language.service';


@NgModule({
  declarations: [
    SocialMediaDataComponent,
    SocialMediaCredentialsComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
  ],
})
export class SocialMediaModule { }
