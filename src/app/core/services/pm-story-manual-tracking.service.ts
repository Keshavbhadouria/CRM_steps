import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PmStoryManualTrackingService {

  constructor(private http: HttpClient) { }

  createOrEdit(body: CreateOrEditPMStoryManualTrackingDto | undefined): any {

    let url_ = environment.apiURL + "/api/services/app/PMStoryManualTrackings/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }
}

export class CreateOrEditPMStoryManualTrackingDto {
  hours!: number;
  minutes!: number;
  pmStoryId!: number;
  id!: string | undefined;
  description!: string | undefined;
}