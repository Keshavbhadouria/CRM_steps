import { Injectable } from '@angular/core';
import { UserLoginInfoDto, TenantLoginInfoDto, ApplicationInfoDto, UiCustomizationSettingsDto, GetCurrentLoginInformationsOutput } from '../models/Admin/Subscription';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {
  private _user: UserLoginInfoDto;
  private _impersonatorUser: UserLoginInfoDto;
  private _tenant: TenantLoginInfoDto;
  private _impersonatorTenant: TenantLoginInfoDto;
  private _application: ApplicationInfoDto = new ApplicationInfoDto();

  get application(): ApplicationInfoDto {
    return this._application;
}

set application(val: ApplicationInfoDto) {
    this._application = val;
}

get user(): UserLoginInfoDto {
    return this._user;
}

get userId(): number {
    return this.user ? this.user.id : null;
}

get tenant(): TenantLoginInfoDto {
    return this._tenant;
}

get tenancyName(): string {
    return this._tenant ? this.tenant.tenancyName : '';
}

get tenantId(): number {
    return this.tenant ? this.tenant.id : null;
}


  constructor(
      private _sessionService: SessionService) {
  }


  init(): Promise<UiCustomizationSettingsDto> {
    return new Promise<UiCustomizationSettingsDto>((resolve, reject) => {
        this._sessionService.getCurrentLoginInformations().toPromise().then((res) => {
          let result = res.result;
          this._application = result.application;
            this._user = result.user;
            this._tenant = result.tenant;
            this._impersonatorTenant = result.impersonatorTenant;
            this._impersonatorUser = result.impersonatorUser;
            resolve(result.theme);
        }, (err) => {
            reject(err);
        });
    });
}


}
