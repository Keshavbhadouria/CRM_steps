import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryCommentService {

  constructor(private http: HttpClient, private _router: Router) { }

  createOrEdit(body: any | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/PMStoryComments/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  getCommentsByStoryId(userId:number): any {
    let url_ = environment.apiURL + "/api/services/app/PMStoryComments/GetCommentsByStoryId?";

    if (userId !== undefined && userId !== null)
      url_ += "storyId=" + encodeURIComponent("" + userId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
  deleteComment(commentId): any {
    let url_ = environment.apiURL + "/api/services/app/PMStoryComments/DeleteComment?";
    if (commentId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (commentId !== undefined)
      url_ += "commentId=" + encodeURIComponent("" + commentId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  DeleteCommentAttachment(commentId, attachmentId): any {
    let url_ = environment.apiURL + "/api/services/app/PMStoryComments/DeleteCommentAttachment?";
    if (commentId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (commentId !== undefined)
      url_ += "commentId=" + encodeURIComponent("" + commentId) + "&";

    if (attachmentId === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (attachmentId !== undefined)
      url_ += "attachmentId=" + encodeURIComponent("" + attachmentId) + "&";

    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  
}
