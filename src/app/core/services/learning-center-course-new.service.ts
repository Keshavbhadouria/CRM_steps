import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LearningCenterCourseNewService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, courseCodeFilter: string | null | undefined, courseNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CourseNews/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (courseCodeFilter !== undefined && courseCodeFilter !== null)
      url_ += "CourseCodeFilter=" + encodeURIComponent("" + courseCodeFilter) + "&";
    if (courseNameFilter !== undefined && courseNameFilter !== null)
      url_ += "CourseNameFilter=" + encodeURIComponent("" + courseNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditCourseNewDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CourseNews/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CourseNews/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  getAllCourseCategoryForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CourseNews/GetAllCourseCategoryForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  getAllCourseCertificateForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/CourseNews/GetAllCourseCertificateForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

}



export class CreateOrEditCourseNewDto {
  title!: string;
  categoryId!: number;
  url!: string;
  description: string = '';
  id!: number;
  certificateId!: number;
  thumbnail!: string;
}
