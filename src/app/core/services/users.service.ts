import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(filter: string | null | undefined, permissions: string[] | null | undefined, role: number | null | undefined, onlyLockedUsers: boolean | undefined, userNameFilter: string | null | undefined, nameFilter: string | null | undefined, lastNameFilter: string | null | undefined, emailFilter: string | null | undefined, isEmailConfirmFilter: boolean | null | undefined, isActiveFilter: boolean | null | undefined, startDateFilter: Date | null | undefined, endDateFilter: Date | null | undefined, sorting: string | null | undefined, maxResultCount: number | undefined, skipCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/User/GetUsers?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (permissions !== undefined && permissions !== null)
      permissions && permissions.forEach(item => { url_ += "Permissions=" + encodeURIComponent("" + item) + "&"; });
    if (role !== undefined && role !== null)
      url_ += "Role=" + encodeURIComponent("" + role) + "&";

    if (onlyLockedUsers === null)
      throw new Error("The parameter 'onlyLockedUsers' cannot be null.");
    else if (onlyLockedUsers !== undefined)
      url_ += "OnlyLockedUsers=" + encodeURIComponent("" + onlyLockedUsers) + "&";

    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (nameFilter !== undefined && nameFilter !== null)
      url_ += "NameFilter=" + encodeURIComponent("" + nameFilter) + "&";
    if (lastNameFilter !== undefined && lastNameFilter !== null)
      url_ += "LastNameFilter=" + encodeURIComponent("" + lastNameFilter) + "&";

    if (emailFilter !== undefined && emailFilter !== null)
      url_ += "EmailFilter=" + encodeURIComponent("" + emailFilter) + "&";

    if (isEmailConfirmFilter !== undefined && isEmailConfirmFilter !== null)
      url_ += "IsEmailConfirmFilter=" + encodeURIComponent("" + isEmailConfirmFilter) + "&";

    if (isActiveFilter !== undefined && isActiveFilter !== null)
      url_ += "IsActiveFilter=" + encodeURIComponent("" + isActiveFilter) + "&";

    if (startDateFilter !== undefined && startDateFilter !== null)
      url_ += "StartDateFilter=" + encodeURIComponent("" + startDateFilter) + "&";

    if (endDateFilter !== undefined && endDateFilter !== null)
      url_ += "EndDateFilter=" + encodeURIComponent("" + endDateFilter) + "&";


    if (sorting !== undefined && sorting !== null)
      url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrUpdateUserInput | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/User/CreateOrUpdateUser";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getUserForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/User/GetUserForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/User/DeleteUser?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  getRolesTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/User/GetRolesTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  unlockUser(body: EntityDtoOfInt64 | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/User/UnlockUser";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }
}


export class CreateOrUpdateUserInput {
  user!: UserEditDto;
  assignedRoleNames!: string[];
  sendActivationEmail!: boolean;
  setRandomPassword!: boolean;
  organizationUnits!: number[] | undefined;
}

export class UserEditDto {
  id!: number | undefined;
  name!: string;
  surname!: string;
  userName!: string;
  emailAddress!: string;
  phoneNumber!: string | undefined;
  password!: string | undefined;
  isActive!: boolean;
  shouldChangePasswordOnNextLogin!: boolean;
  isTwoFactorEnabled!: boolean;
  isLockoutEnabled!: boolean;
}

export class UserRoleDto {
  roleId!: number;
  roleName!: string | undefined;
  roleDisplayName!: string | undefined;
  isAssigned!: boolean;
  inheritedFromOrganizationUnit!: boolean;
}

export class PasswordComplexitySetting {
  requireDigit!: boolean;
  requireLowercase!: boolean;
  requireNonAlphanumeric!: boolean;
  requireUppercase!: boolean;
  requiredLength!: number;
}
export class EntityDtoOfInt64 {
  id!: number;
}