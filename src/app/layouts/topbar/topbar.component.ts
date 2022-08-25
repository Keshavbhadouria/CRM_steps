import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { AccountService } from 'src/app/core/services/account.service';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  userName: string;
  tenant: string;
  isImpersonation: boolean = false;
  isMobile = false;
  isCondensed = false;
  userId: any;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private _authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public _cookiesService: CookieService,
    private toastr: ToastrService,
    private http: HttpClient,
    private _accountService: AccountService,
    private _profileService: ProfileService) {
  }

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  openMobileMenu: boolean;
  currentUserProfilePic = '';

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;
    this.userName = this._authService.getLoggedInUserName();
    
    this.userId = this._authService.getLoggedInUser().userId;
    if (this._authService.getLoggedInUser()?.isImpersonation) {
      this.isImpersonation = true;
    }

    this.tenant = JSON.parse(localStorage.getItem(KeyConstant.tenant))?.tenantName;
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
    this.loadProfilePic();
    this.loadLanguages();
  }


  loadLanguages() {
      this.languageService.getLanguages().then(res => {
        if (res.success) {
          this.listLang = [];
          this.listLang = res.result.items;

          this.listLang = _.map(res.result.items, function(language) {
            return {
               text:  language.displayName, flag: 'assets/images/flags/'+ language.icon.split(" ")[1] +'.png', lang: language.name
            };
          })
        }
      })
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.isCondensed = !this.isCondensed;
    this.mobileMenuButtonClicked.emit();
  }



  /**
   * Logout the user
   */
  logout() {
    this._authService.logoutUser();
    this.router.navigate(['/account/login']);
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
  backToImpersonate(): void {
    this._accountService.backToImpersonate().subscribe(response => {
      if (response.success) {

        var impersonationToken = response.result.impersonationToken;
        //after impersonation success get new user access token
        this._authService.impersonatedAuthenticate(impersonationToken).subscribe(authResponse => {
          if (authResponse.success) {
            this._authService.logoutUser();

            this.getUserDetails(authResponse.result.accessToken).subscribe(res => {
              if (res.success) {
                let authenticateResult = res.result;
                authenticateResult.accessToken = authResponse.result.accessToken;
                authenticateResult.encryptedAccessToken = authResponse.result.encryptedAccessToken;
                authenticateResult.expireInSeconds = authResponse.result.expireInSeconds;
                localStorage.setItem(KeyConstant.userInfo, JSON.stringify(authenticateResult));
                location.href = window.location.origin;
              }
              else {
                var errorMsg = 'Internal server error!';
                if (response.error?.message) { errorMsg = response.error?.message; }
                if (response.error?.details?.message) { errorMsg = response.error?.details?.message; }
                this.toastr.error(errorMsg);
              }
            })
          }
          else {
            var errorMsg = 'Internal server error!';
            if (response.error?.message) { errorMsg = response.error?.message; }
            if (response.error?.details?.message) { errorMsg = response.error?.details?.message; }
            this.toastr.error(errorMsg);
          }
        });
      }
      else {
        var errorMsg = 'Internal server error!';
        if (response.error?.message) { errorMsg = response.error?.message; }
        if (response.error?.details?.message) { errorMsg = response.error?.details?.message; }
        this.toastr.error(errorMsg);
      }
    });
  }
  getUserDetails(authToken): any {
    var url = environment.apiURL + "/api/TokenAuth/GetUserDetails";

    let options: any = {
      headers: {
        "Abp.TenantId": this._authService.getTenantId(),
        "Authorization": "Bearer " + authToken
      }
    };

    return this.http.get<any>(url, options);
  }
  loadProfilePic(){
    
    this._profileService.getProfilePictureByUser(this.userId).then(res =>{
      if (res.result && res.result.profilePicture) {
        this.currentUserProfilePic = 'data:image/jpeg;base64,' + res.result.profilePicture;
      } else {
        this.currentUserProfilePic = '/assets/icons/default-user.png';
      }
    })
  }
}
