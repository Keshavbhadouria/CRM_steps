import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LmsCourseChapterService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, chapterNameFilter: string | null | undefined, courseCourseNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CourseChapters/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (chapterNameFilter !== undefined && chapterNameFilter !== null)
      url_ += "ChapterNameFilter=" + encodeURIComponent("" + chapterNameFilter) + "&";
    if (courseCourseNameFilter !== undefined && courseCourseNameFilter !== null)
      url_ += "CourseCourseNameFilter=" + encodeURIComponent("" + courseCourseNameFilter) + "&";
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

  createOrEdit(body: CreateOrEditCourseChapterDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CourseChapters/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getCourseChapterForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CourseChapters/GetCourseChapterForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/CourseChapters/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }
}

export class CreateOrEditCourseChapterDto {
  chapterName!: string;
  description!: string | undefined;
  durationInMinutes!: number;
  sortIndex!: number;
  courseId!: string | undefined;
  id!: string | undefined;
}