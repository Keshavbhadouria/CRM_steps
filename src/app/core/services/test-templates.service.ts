import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestTemplatesService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, titleFilter: string | null | undefined, activeFilter: number | null | undefined, testTypeTypeNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoListTemplates/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (titleFilter !== undefined && titleFilter !== null)
      url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
    if (activeFilter !== undefined && activeFilter !== null)
      url_ += "ActiveFilter=" + encodeURIComponent("" + activeFilter) + "&";
    if (testTypeTypeNameFilter !== undefined && testTypeTypeNameFilter !== null)
      url_ += "TestTypeTypeNameFilter=" + encodeURIComponent("" + testTypeTypeNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditTestTypeTodoListTemplateDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoListTemplates/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/TestTypeTodoListTemplates/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

   //dropdowns
   getAllTestTypeForTableDropdown(): any {
    let url_ = environment.apiURL  + "/api/services/app/TestTypeTodoListTemplates/GetAllTestTypeForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}
export class CreateOrEditTestTypeTodoListTemplateDto {

  title!: string;
  description!: string | undefined;
  active!: boolean;
  expectedResult!: string | undefined;
  typeId!: number;
  id!: string | undefined;
}