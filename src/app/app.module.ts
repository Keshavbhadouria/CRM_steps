import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { ExtrapagesModule } from './extrapages/extrapages.module';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFirebaseBackend } from './authUtils';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ToastrModule } from 'ngx-toastr';
import { PrimengTableHelper } from './core/helpers/PrimengTableHelper';
import { GlobalErrorHandler } from './core/helpers/GlobalErrorHandler';
import { AppCommonModule } from './shared/common/app-common.module';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HomepageComponent } from './Home/homepage/homepage.component'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};

if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    ScrollToModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
    AppCommonModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
    , PrimengTableHelper
  ],
})
export class AppModule { }
