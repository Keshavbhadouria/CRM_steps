import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LmsChapterTopicService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, maxTopicTypeIdFilter: number | null | undefined, minTopicTypeIdFilter: number | null | undefined, topicNameFilter: string | null | undefined, parallelParkingFilter: number | null | undefined, courseChapterChapterNameFilter: string | null | undefined, chapterId: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ChapterTopics/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxTopicTypeIdFilter !== undefined && maxTopicTypeIdFilter !== null)
      url_ += "MaxTopicTypeIdFilter=" + encodeURIComponent("" + maxTopicTypeIdFilter) + "&";
    if (minTopicTypeIdFilter !== undefined && minTopicTypeIdFilter !== null)
      url_ += "MinTopicTypeIdFilter=" + encodeURIComponent("" + minTopicTypeIdFilter) + "&";
    if (topicNameFilter !== undefined && topicNameFilter !== null)
      url_ += "TopicNameFilter=" + encodeURIComponent("" + topicNameFilter) + "&";
    if (parallelParkingFilter !== undefined && parallelParkingFilter !== null)
      url_ += "ParallelParkingFilter=" + encodeURIComponent("" + parallelParkingFilter) + "&";
    if (courseChapterChapterNameFilter !== undefined && courseChapterChapterNameFilter !== null)
      url_ += "CourseChapterChapterNameFilter=" + encodeURIComponent("" + courseChapterChapterNameFilter) + "&";
    if (chapterId !== undefined && chapterId !== null)
      url_ += "CourseChapterId=" + encodeURIComponent("" + chapterId) + "&";
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
  createOrEdit(body: CreateOrEditChapterTopicDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ChapterTopics/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getChapterTopicForEdit(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ChapterTopics/GetChapterTopicForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/ChapterTopics/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdown
  getAllChaptersTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ChapterTopics/GetAllChaptersTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllTopicTypesTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ChapterTopics/GetAllTopicTypesTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
  getAllRecurrentTasksTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/ChapterTopics/GetAllRecurrentTasksTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditChapterTopicDto {
  topicTypeId!: number;
  topicName!: string;
  durationInMinutes!: number;
  sortIndex!: number;
  description!: string | undefined;
  partTimeTraining!: boolean;
  dayNo!: number;
  yardPractices!: boolean;
  preTrip!: boolean;
  air!: boolean;
  straighLine!: boolean;
  offSet!: boolean;
  alley!: boolean;
  simulator!: boolean;
  road!: boolean;
  parallelParking!: boolean;
  chapterId!: string;
  id!: string | undefined;
  topicTypeId2!: number;
  topicTasks : string[];
}