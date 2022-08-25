import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskBugManualTrackingService {

  constructor(private http: HttpClient) { }

  createOrEdit(body: CreateOrEditTaskBugManualTrackingDto | undefined): any {

    let url_ = environment.apiURL + "/api/services/app/TaskBugManualTrackings/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }
}
export class CreateOrEditTaskBugManualTrackingDto {
  hours!: number;
  minutes!: number;
  taskBugId!: number;
  id!: string | undefined;
  description!: string | undefined;
}
