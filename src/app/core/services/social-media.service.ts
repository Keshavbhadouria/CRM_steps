import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  constructor(private http: HttpClient) { }

  getYoutubeData() {
    let url_ = environment.apiURL + "/api/services/app/SocialMediaCredentials/GetYoutubeData";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getFacebookData() {
    let url_ = environment.apiURL + "/api/services/app/SocialMediaCredentials/GetFacebookData";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  getInstagramData() {
    let url_ = environment.apiURL + "/api/services/app/SocialMediaCredentials/GetInstagram";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getLinkedInData() {
    let url_ = environment.apiURL + "/api/services/app/SocialMediaCredentials/GetLinkedIn";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }

  getSocialMediaCredentials() {
    let url_ = environment.apiURL + "/api/services/app/SocialMediaCredentials/GetSMTenantCredentials";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_).toPromise();
  }


  createOrEdit(body: CreateOrEditSocialMediaCredentialsDto | undefined): Observable<void> {
    let url_ = environment.apiURL + "/api/services/app/SocialMediaCredentials/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body);
  }


}


export class CreateOrEditSocialMediaCredentialsDto {
  youtubeAPIKey!: string | undefined;
  youtubeAPIChannelId!: string | undefined;
  facebookAppId!: string | undefined;
  facebookClientSecret!: string | undefined;
  facebookAccessToken!: string | undefined;
  instagramAccessToken!: string | undefined;
  instagramMediaDetailAccessToken!: string | undefined;
  linkedInAPIKey!: string | undefined;
  linkedInSecretKey!: string | undefined;
  linkedInAccessToken!: string | undefined;
  id!: string | undefined;
}
