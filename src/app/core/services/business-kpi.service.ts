import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessKpiService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, kPINameFilter: string | null | undefined, maxWeeklyTargetFilter: number | null | undefined, minWeeklyTargetFilter: number | null | undefined, maxMonthlyTargetFilter: number | null | undefined, minMonthlyTargetFilter: number | null | undefined, maxQuarterlyFilter: number | null | undefined, minQuarterlyFilter: number | null | undefined, maxSemesterFilter: number | null | undefined, minSemesterFilter: number | null | undefined, maxYearlyFilter: number | null | undefined, minYearlyFilter: number | null | undefined, kPICategoryKPIFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessKPIs/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (kPINameFilter !== undefined && kPINameFilter !== null)
      url_ += "KPINameFilter=" + encodeURIComponent("" + kPINameFilter) + "&";
    if (maxWeeklyTargetFilter !== undefined && maxWeeklyTargetFilter !== null)
      url_ += "MaxWeeklyTargetFilter=" + encodeURIComponent("" + maxWeeklyTargetFilter) + "&";
    if (minWeeklyTargetFilter !== undefined && minWeeklyTargetFilter !== null)
      url_ += "MinWeeklyTargetFilter=" + encodeURIComponent("" + minWeeklyTargetFilter) + "&";
    if (maxMonthlyTargetFilter !== undefined && maxMonthlyTargetFilter !== null)
      url_ += "MaxMonthlyTargetFilter=" + encodeURIComponent("" + maxMonthlyTargetFilter) + "&";
    if (minMonthlyTargetFilter !== undefined && minMonthlyTargetFilter !== null)
      url_ += "MinMonthlyTargetFilter=" + encodeURIComponent("" + minMonthlyTargetFilter) + "&";
    if (maxQuarterlyFilter !== undefined && maxQuarterlyFilter !== null)
      url_ += "MaxQuarterlyFilter=" + encodeURIComponent("" + maxQuarterlyFilter) + "&";
    if (minQuarterlyFilter !== undefined && minQuarterlyFilter !== null)
      url_ += "MinQuarterlyFilter=" + encodeURIComponent("" + minQuarterlyFilter) + "&";
    if (maxSemesterFilter !== undefined && maxSemesterFilter !== null)
      url_ += "MaxSemesterFilter=" + encodeURIComponent("" + maxSemesterFilter) + "&";
    if (minSemesterFilter !== undefined && minSemesterFilter !== null)
      url_ += "MinSemesterFilter=" + encodeURIComponent("" + minSemesterFilter) + "&";
    if (maxYearlyFilter !== undefined && maxYearlyFilter !== null)
      url_ += "MaxYearlyFilter=" + encodeURIComponent("" + maxYearlyFilter) + "&";
    if (minYearlyFilter !== undefined && minYearlyFilter !== null)
      url_ += "MinYearlyFilter=" + encodeURIComponent("" + minYearlyFilter) + "&";
    if (kPICategoryKPIFilter !== undefined && kPICategoryKPIFilter !== null)
      url_ += "KPICategoryKPIFilter=" + encodeURIComponent("" + kPICategoryKPIFilter) + "&";
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
  createOrEdit(body: CreateOrEditBusinessKPIDto | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessKPIs/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessKPIs/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  getAllKPICategoryForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/BusinessKPIs/GetAllKPICategoryForTableDropdown"

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditBusinessKPIDto {
  kpiName!: string;
  weeklyTarget!: number;
  monthlyTarget!: number;
  quarterly!: number;
  semester!: number;
  yearly!: number;
  kpiCategoryId!: number;
  id!: number | undefined;
}