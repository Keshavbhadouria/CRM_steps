import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { getFirebaseBackend } from '../../authUtils';
import { EndPoint } from '../constants/endPoint';
import { KeyConstant } from '../constants/KeyConstants';

import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  user: User;

  constructor(private http: HttpClient, private _router: Router) {
  }



  //#region Authentication Methods
  logoutUser() {
    this.removeUserInfo();
  }

  isTenantAvailable(obj: any) {
    return this.http.post<any>(EndPoint.isTenantAvailable, obj);
  }

  loginUser(obj: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (this.getTenantId() > 0) {
      headers = new HttpHeaders()
        .set('Abp.TenantId', this.getTenantId() ?? '');
    };
    const requestOptions = { headers: headers };

    return this.http.post<any>(EndPoint.login, obj, requestOptions);
  }


  //#endregion

  //#region Loggedin User Info


  getAccessToken() {
    if (localStorage.getItem(KeyConstant.userInfo)) {
      let userInfo = JSON.parse(localStorage.getItem(KeyConstant.userInfo) ?? '');
      if (userInfo) {
        return userInfo.accessToken;
      } else {
        debugger
        this._router.navigate(['/account/login'])
      }
    } else {
      return null;
    }
  }


  getLoggedInUser() {
    if (localStorage.getItem(KeyConstant.userInfo)) {
      return JSON.parse(localStorage.getItem(KeyConstant.userInfo) ?? '');
    } else {
      return null;
    }
  }

  getLoggedInUserName() {
    if (localStorage.getItem(KeyConstant.userInfo)) {
      return JSON.parse(localStorage.getItem(KeyConstant.userInfo) ?? '')?.fullname;
    } else {
      return null;
    }
  }

  isUserLoggedIn() {
    return localStorage.getItem(KeyConstant.userInfo) ? true : false;
  }



  isTenantLogin() {
    return localStorage.getItem(KeyConstant.isTenantAccount);

  }

  getTenantId() {
    const tenant = localStorage.getItem(KeyConstant.tenant);
    if (tenant) {
      return JSON.parse(tenant).tenantId;
    }
    return null;
  }

  getTenantName() {
    const tenant = localStorage.getItem(KeyConstant.tenant);
    if (tenant) {
      return JSON.parse(tenant).tenantName;
    }

    return null;
  }

  removeUserInfo() {
    localStorage.removeItem(KeyConstant.userInfo);
  }

  //#endregion




  /**
   * Returns the current user
   */
  public currentUser(): User {
    return getFirebaseBackend().getAuthenticatedUser();
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(email: string, password: string) {
    return getFirebaseBackend().loginUser(email, password).then((response: any) => {
      const user = response;
      return user;
    });
  }

  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(email: string, password: string) {
    return getFirebaseBackend().registerUser(email, password).then((response: any) => {
      const user = response;
      return user;
    });
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    return getFirebaseBackend().forgetPassword(email).then((response: any) => {
      const message = response.data;
      return message;
    });
  }

  getUserRoleName(){
    if (localStorage.getItem(KeyConstant.userInfo)) {
      return JSON.parse(localStorage.getItem(KeyConstant.userInfo) ?? '')?.roleDisplayName;
    } else {
      return null;
    }
  }

  /**
   * Logout the user
   */
  logout() {
    // logout the user
    localStorage.removeItem(KeyConstant.userInfo);
    this._router.navigate(['/account/login']);
  }


  //impersonation
  impersonatedAuthenticate(impersonationToken: string): any {
    var url = environment.apiURL + "/api/TokenAuth/ImpersonatedAuthenticate?impersonationToken=" + impersonationToken;
    return this.http.post<any>(url, '');
  }
}

