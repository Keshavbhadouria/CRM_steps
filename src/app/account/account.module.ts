import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { LanguageService } from '../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    TranslateModule,

  ],
  providers: [
    LanguageService
  ]
})
export class AccountModule { }
