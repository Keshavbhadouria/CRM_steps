import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';

import { AuthRoutingModule } from './auth-routing';
import { TranslateModule } from '@ngx-translate/core';
import { UiSwitchModule } from 'ngx-ui-switch';
import { LanguageService } from 'src/app/core/services/language.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SignaturePadModule } from 'angular2-signaturepad';
import { RegisterComponent } from './register/register.component';
import { TermConditionModalComponent } from './register/term-condition-modal/term-condition-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegisterTenantResultComponent } from './register/register-tenant-result/register-tenant-result.component';
import { SubscriptionPlanComponent } from './register/subscription-plan/subscription-plan.component';
import { SelectPaidPlanComponent } from './register/select-paid-plan/select-paid-plan.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [LoginComponent, Login2Component , RegisterComponent, TermConditionModalComponent, RegisterTenantResultComponent, SubscriptionPlanComponent, SelectPaidPlanComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    CarouselModule,
    TranslateModule,
    UiSwitchModule,
    SharedModule,
    SignaturePadModule,
    NgxCaptchaModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot()

  ],
  providers: [
    LanguageService
  ]
})
export class AuthModule { }
