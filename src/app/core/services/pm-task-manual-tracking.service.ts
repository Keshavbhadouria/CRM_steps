import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PmTaskManualTrackingService {

  constructor(private http: HttpClient) { }

  createOrEdit(body: CreateOrEditPMTaskManualTrackingDto | undefined): any {

    let url_ = environment.apiURL + "/api/services/app/PMTaskManualTrackings/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }
}

export class CreateOrEditPMTaskManualTrackingDto {
  hours!: number;
  minutes!: number;
  pMtaskId!: number;
  id!: string | undefined;
  description!: string | undefined;
}