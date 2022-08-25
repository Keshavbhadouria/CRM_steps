import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestTodoListService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, titleFilter: string | null | undefined, descriptionFilter: string | null | undefined, successFilter: number | null | undefined, pMtaskTitleFilter: string | null | undefined, testTypeTypeNameFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoLists/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
      url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (descriptionFilter !== undefined && descriptionFilter !== null)
      url_ += "DescriptionFilter=" + encodeURIComponent("" + descriptionFilter) + "&";
    if (successFilter !== undefined && successFilter !== null)
      url_ += "SuccessFilter=" + encodeURIComponent("" + successFilter) + "&";
    if (pMtaskTitleFilter !== undefined && pMtaskTitleFilter !== null)
      url_ += "PMtaskTitleFilter=" + encodeURIComponent("" + pMtaskTitleFilter) + "&";
    if (testTypeTypeNameFilter !== undefined && testTypeTypeNameFilter !== null)
      url_ += "TestTypeTypeNameFilter=" + encodeURIComponent("" + testTypeTypeNameFilter) + "&";
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
  createOrEdit(body: CreateOrEditTestTypeTodoListDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoLists/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }
  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoLists/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }


  //dropdowns
  getAllPMtaskForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoLists/getAllPMtaskForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllTestTypeForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoLists/getAllTestTypeForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllUserForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoLists/GetAllUserForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditTestTypeTodoListDto {
  title!: string;
  description!: string | undefined;
  comments!: string | undefined;
  attachment!: string | undefined;
  success!: boolean;
  expectedResult!: string | undefined;
  taskId!: number;
  testTypeId!: number;
  userId!: number;
  id!: string | undefined;
}