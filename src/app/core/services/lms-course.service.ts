import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyNsRecord } from 'dns';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LmsCourseService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, courseCodeFilter: string | null | undefined, courseNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Courses/GetAll?";
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

  createOrEdit(body: CreateOrEditCourseDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Courses/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getCourseForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Courses/GetCourseForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Courses/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
  //dropdown
  getAllChaptersTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/Courses/GetAllChaptersTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllTopicsTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/Courses/GetAllTopicsTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }

  viewCourseDetails(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Courses/ViewCourseDetails?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "courseId=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.post<any>(url_,undefined).toPromise();
  }
}

export class CreateOrEditCourseDto {
  courseCode!: string;
  courseName!: string;
  categoryId!: number;
  url!: string;
  practicalHours!: number;
  theoricalHours!: number;
  price!: number;
  testsIncluded!: number;
  hoursPerDay!: number;
  description: string = '';
  isActive!: boolean;
  id!: string | undefined;
  totalHours!: number;
  certificate!: number;
  courseChapterTopicRelations: ChaptersAndTopics[]
}
export class ChaptersAndTopics {
  dayNo!: number;
  chapters!: string[];
  tasks!: string;
  topics!: string[];
  chaptDes: string | undefined;
  topicDes: string | undefined;
}
