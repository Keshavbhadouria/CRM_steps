import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDatabasesService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, databaseNameFilter: string | null | undefined, usernameFilter: string | null | undefined, userPasswordFilter: string | null | undefined, maxPortFilter: number | null | undefined, minPortFilter: number | null | undefined, databaseEngineNameFilter: string | null | undefined, serverInventoryServerNameFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ClientDatabases/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (databaseNameFilter !== undefined && databaseNameFilter !== null)
      url_ += "DatabaseNameFilter=" + encodeURIComponent("" + databaseNameFilter) + "&";
    if (usernameFilter !== undefined && usernameFilter !== null)
      url_ += "UsernameFilter=" + encodeURIComponent("" + usernameFilter) + "&";
    if (userPasswordFilter !== undefined && userPasswordFilter !== null)
      url_ += "UserPasswordFilter=" + encodeURIComponent("" + userPasswordFilter) + "&";
    if (maxPortFilter !== undefined && maxPortFilter !== null)
      url_ += "MaxPortFilter=" + encodeURIComponent("" + maxPortFilter) + "&";
    if (minPortFilter !== undefined && minPortFilter !== null)
      url_ += "MinPortFilter=" + encodeURIComponent("" + minPortFilter) + "&";
    if (databaseEngineNameFilter !== undefined && databaseEngineNameFilter !== null)
      url_ += "DatabaseEngineNameFilter=" + encodeURIComponent("" + databaseEngineNameFilter) + "&";
    if (serverInventoryServerNameFilter !== undefined && serverInventoryServerNameFilter !== null)
      url_ += "ServerInventoryServerNameFilter=" + encodeURIComponent("" + serverInventoryServerNameFilter) + "&";
    if (userNameFilter !== undefined && userNameFilter !== null)
      url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
    if (sorting !== undefined && sorting !== null)
      url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (skipCount === null)
      throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null)
      throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditClientDatabaseDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ClientDatabases/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getClientDatabaseForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ClientDatabases/GetClientDatabaseForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ClientDatabases/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdowns
  getAllDatabaseEngineForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ClientDatabases/GetAllDatabaseEngineForTableDropdown?";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  
  getAllServerInventoryForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ClientDatabases/GetAllServerInventoryForTableDropdown?";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ClientDatabases/GetAllUserForTableDropdown?";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditClientDatabaseDto {
  databaseName!: string;
  username!: string | undefined;
  userPassword!: string | undefined;
  port!: number;
  engineId!: number;
  serverId!: string;
  responsibleId!: number;
  id!: number | undefined;
}