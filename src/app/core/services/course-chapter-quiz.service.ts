import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseChapterQuizService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get

  getAll(filter: string | null | undefined, fileNameFilter: string | null | undefined, uRLFilter: string | null | undefined, courseChapterNewTitleFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ChapterQuizs/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (fileNameFilter !== undefined && fileNameFilter !== null)
        url_ += "FileNameFilter=" + encodeURIComponent("" + fileNameFilter) + "&";
    if (uRLFilter !== undefined && uRLFilter !== null)
        url_ += "URLFilter=" + encodeURIComponent("" + uRLFilter) + "&";
    if (courseChapterNewTitleFilter !== undefined && courseChapterNewTitleFilter !== null)
        url_ += "CourseChapterNewTitleFilter=" + encodeURIComponent("" + courseChapterNewTitleFilter) + "&";
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

  getAllCourseChapterNewForTableDropdown() {
    let url_ = environment.apiURL + "/api/services/app/ChapterQuizs/GetAllCourseChapterNewForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }


  //#endregion

  //#region CUD

  createOrEdit(body: CreateOrEditQuizDto | undefined): Observable<void> {
    let url_ = environment.apiURL + "/api/services/app/ChapterQuizs/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body);
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ChapterQuizs/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();

  }


  //#endregion
}



export class CreateOrEditQuizDto {
  quiz!: string;
  instructions!: string | undefined;
  dayNo!: number | undefined;
  randomQuestion!: boolean | undefined;
  randomAnswer!: boolean | undefined;
  maxPointScore!: number | undefined;
  chapterId!: string | undefined;
  id!: number | undefined;
}
