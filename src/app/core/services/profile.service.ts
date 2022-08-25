import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getPasswordComplexitySetting(): any {
    let url_ = environment.apiURL + "/api/services/app/Profile/GetPasswordComplexitySetting";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getProfilePictureByUser(userId: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Profile/GetProfilePictureByUser?";
    if (userId === null)
      throw new Error("The parameter 'userId' cannot be null.");
    else if (userId !== undefined)
      url_ += "userId=" + encodeURIComponent("" + userId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  
  getProfilePictureByUserIds(userIds: number[] | null | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/Profile/GetProfilePictureByUserIds?";
    if (userIds !== undefined && userIds !== null)
        userIds && userIds.forEach(item => { url_ += "userIds=" + encodeURIComponent("" + item) + "&"; });
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  updateProfilePicture(body: UpdateProfilePictureInput | undefined): any{
    let url_ = environment.apiURL + "/api/services/app/Profile/UpdateProfilePicture";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.put<any>(url_, body).toPromise();


    // let options_ : any = {
    //     body: content_,
    //     observe: "response",
    //     responseType: "blob",
    //     headers: new HttpHeaders({
    //         "Content-Type": "application/json-patch+json",
    //     })
    // };

    // return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
    //     return this.processUpdateProfilePicture(response_);
    // })).pipe(_observableCatch((response_: any) => {
    //     if (response_ instanceof HttpResponseBase) {
    //         try {
    //             return this.processUpdateProfilePicture(<any>response_);
    //         } catch (e) {
    //             return <Observable<void>><any>_observableThrow(e);
    //         }
    //     } else
    //         return <Observable<void>><any>_observableThrow(response_);
    // }));
}

}


export class UpdateProfilePictureInput {
  fileToken!: string | undefined;
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  useGravatarProfilePicture!: boolean;
}