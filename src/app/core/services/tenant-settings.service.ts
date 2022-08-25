import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantSettingsServiceProxy {
 

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * @return Success
   */
  getAllSettings(): any {
      let url_ = environment.apiURL + "/api/services/app/TenantSettings/GetAllSettings";
      url_ = url_.replace(/[?&]$/, "");
      return this._httpClient.get(url_).toPromise();
  }

  /**
   * @param body (optional) 
   * @return Success
   */
  updateAllSettings(body: TenantSettingsEditDto | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/TenantSettings/UpdateAllSettings";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);

      return this._httpClient.put<any>(url_, body).toPromise();
  }

 

  /**
   * @return Success
   */
  clearLogo(): any {
      let url_ = environment.apiURL + "/api/services/app/TenantSettings/ClearLogo";
      url_ = url_.replace(/[?&]$/, "");
      return this._httpClient.get<any>(url_).toPromise();
  }

  
  /**
   * @return Success
   */
  clearCustomCss(): any {
      let url_ = environment.apiURL + "/api/services/app/TenantSettings/ClearCustomCss";
      url_ = url_.replace(/[?&]$/, "");
      return this._httpClient.get<any>(url_).toPromise();
  }

 

  /**
   * @param body (optional) 
   * @return Success
   */
  sendTestEmail(body: SendTestEmailInput | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/TenantSettings/SendTestEmail";
      url_ = url_.replace(/[?&]$/, "");
      return this._httpClient.post<any>(url_, body).toPromise();
  }

 

  /**
   * @return Success
   */
  getEnabledSocialLoginSettings():any {
      let url_ = environment.apiURL + "/api/services/app/TenantSettings/GetEnabledSocialLoginSettings";
      url_ = url_.replace(/[?&]$/, "");

      return this._httpClient.get<any>(url_).toPromise();
  }

 

  /**
   * @param phoneNumber (optional) 
   * @param message (optional) 
   * @return Success
   */
  sendTestSMS(phoneNumber: string | null | undefined, message: string | null | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/TenantSettings/SendTestSMS?";
      if (phoneNumber !== undefined && phoneNumber !== null)
          url_ += "phoneNumber=" + encodeURIComponent("" + phoneNumber) + "&";
      if (message !== undefined && message !== null)
          url_ += "message=" + encodeURIComponent("" + message) + "&";
      url_ = url_.replace(/[?&]$/, "");
      return this._httpClient.get<any>(url_).toPromise();
  }
}

export interface TenantSettingsEditDto {
  general: GeneralSettingsEditDto;
  userManagement: TenantUserManagementSettingsEditDto;
  email: TenantEmailSettingsEditDto;
  ldap: LdapSettingsEditDto;
  security: SecuritySettingsEditDto;
  billing: TenantBillingSettingsEditDto;
  otherSettings: TenantOtherSettingsEditDto;
  externalLoginProviderSettings: ExternalLoginProviderSettingsEditDto;
}
export interface GeneralSettingsEditDto {
  timezone: string | undefined;
  timezoneForComparison: string | undefined;
}
export interface TenantUserManagementSettingsEditDto {
  allowSelfRegistration: boolean;
  isNewRegisteredUserActiveByDefault: boolean;
  isEmailConfirmationRequiredForLogin: boolean;
  useCaptchaOnRegistration: boolean;
  useCaptchaOnLogin: boolean;
  isCookieConsentEnabled: boolean;
  isQuickThemeSelectEnabled: boolean;
  allowUsingGravatarProfilePicture: boolean;
  sessionTimeOutSettings: SessionTimeOutSettingsEditDto;
}
export interface SessionTimeOutSettingsEditDto {
  isEnabled: boolean;
  timeOutSecond: number;
  showTimeOutNotificationSecond: number;
  showLockScreenWhenTimedOut: boolean;
}
export interface TenantEmailSettingsEditDto {
  useHostDefaultEmailSettings: boolean;
  defaultFromAddress: string | undefined;
  defaultFromDisplayName: string | undefined;
  smtpHost: string | undefined;
  smtpPort: number;
  smtpUserName: string | undefined;
  smtpPassword: string | undefined;
  smtpDomain: string | undefined;
  smtpEnableSsl: boolean;
  smtpUseDefaultCredentials: boolean;
}

export interface LdapSettingsEditDto {
  isModuleEnabled: boolean;
  isEnabled: boolean;
  domain: string | undefined;
  userName: string | undefined;
  password: string | undefined;
}

export interface SecuritySettingsEditDto {
  allowOneConcurrentLoginPerUser: boolean;
  useDefaultPasswordComplexitySettings: boolean;
  passwordComplexity: PasswordComplexitySetting;
  defaultPasswordComplexity: PasswordComplexitySetting;
  userLockOut: UserLockOutSettingsEditDto;
  twoFactorLogin: TwoFactorLoginSettingsEditDto;
}

export interface PasswordComplexitySetting {
  requireDigit: boolean;
  requireLowercase: boolean;
  requireNonAlphanumeric: boolean;
  requireUppercase: boolean;
  requiredLength: number;
}

export interface UserLockOutSettingsEditDto {
  isEnabled: boolean;
  maxFailedAccessAttemptsBeforeLockout: number;
  defaultAccountLockoutSeconds: number;
}

export interface TwoFactorLoginSettingsEditDto {
  isEnabledForApplication: boolean;
  isEnabled: boolean;
  isEmailProviderEnabled: boolean;
  isSmsProviderEnabled: boolean;
  isRememberBrowserEnabled: boolean;
  isGoogleAuthenticatorEnabled: boolean;
}
export interface TenantBillingSettingsEditDto {
  legalName: string | undefined;
  address: string | undefined;
  taxVatNo: string | undefined;
}
export interface TenantOtherSettingsEditDto {
  isQuickThemeSelectEnabled: boolean;
}
export interface ExternalLoginProviderSettingsEditDto {
  facebook: FacebookExternalLoginProviderSettings;
  google: GoogleExternalLoginProviderSettings;
  twitter: TwitterExternalLoginProviderSettings;
  microsoft: MicrosoftExternalLoginProviderSettings;
  openIdConnect: OpenIdConnectExternalLoginProviderSettings;
  openIdConnectClaimsMapping: JsonClaimMapDto[] | undefined;
  wsFederation: WsFederationExternalLoginProviderSettings;
  wsFederationClaimsMapping: JsonClaimMapDto[] | undefined;
}
export interface FacebookExternalLoginProviderSettings {
  appId: string | undefined;
  appSecret: string | undefined;
}
export interface GoogleExternalLoginProviderSettings {
  clientId: string | undefined;
  clientSecret: string | undefined;
  userInfoEndpoint: string | undefined;
}
export interface TwitterExternalLoginProviderSettings {
  consumerKey: string | undefined;
  consumerSecret: string | undefined;
}
export interface MicrosoftExternalLoginProviderSettings {
  clientId: string | undefined;
  clientSecret: string | undefined;
}
export interface OpenIdConnectExternalLoginProviderSettings {
  clientId: string | undefined;
  clientSecret: string | undefined;
  authority: string | undefined;
  loginUrl: string | undefined;
  validateIssuer: boolean;
}
export interface JsonClaimMapDto {
  claim: string | undefined;
  key: string | undefined;
}
export interface WsFederationExternalLoginProviderSettings {
  clientId: string | undefined;
  tenant: string | undefined;
  metaDataAddress: string | undefined;
  wtrealm: string | undefined;
  authority: string | undefined;
}
export interface SendTestEmailInput {
  emailAddress: string;
}
export interface JsonClaimMapDto {
  claim: string | undefined;
  key: string | undefined;
}