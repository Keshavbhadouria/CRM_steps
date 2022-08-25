import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRoles(permissions: string[] | null | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Role/GetRoles?";
    if (permissions !== undefined && permissions !== null)
      permissions && permissions.forEach(item => { url_ += "Permissions=" + encodeURIComponent("" + item) + "&"; });
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrUpdateRoleInput | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Role/CreateOrUpdateRole";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getRoleForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Role/GetRoleForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Role/DeleteRole?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
}

export class CreateOrUpdateRoleInput {
  role!: RoleEditDto;
  grantedPermissionNames!: string[];
}

export class RoleEditDto {
  id!: number | undefined;
  displayName!: string;
  isDefault!: boolean;
}