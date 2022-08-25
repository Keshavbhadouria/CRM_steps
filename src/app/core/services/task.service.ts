
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PMtasksServiceProxy {

    constructor(private http: HttpClient, private _router: Router) { }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param summaryFilter (optional)
     * @param acceptanceCriteriaFilter (optional)
     * @param maxDueDateFilter (optional)
     * @param minDueDateFilter (optional)
     * @param maxParentIDFilter (optional)
     * @param minParentIDFilter (optional)
     * @param maxDependencyFilter (optional)
     * @param minDependencyFilter (optional)
     * @param maxDayOnMonthFilter (optional)
     * @param minDayOnMonthFilter (optional)
     * @param mondayFilter (optional)
     * @param tuesdayFilter (optional)
     * @param wednesdayFilter (optional)
     * @param thursdayFilter (optional)
     * @param fridayFilter (optional)
     * @param saturdayFilter (optional)
     * @param sundayFilter (optional)
     * @param maxDueTimeFilter (optional)
     * @param minDueTimeFilter (optional)
     * @param pMProjectProjectNameFilter (optional)
     * @param pMSprintSprintFilter (optional)
     * @param pMStoryTitleFilter (optional)
     * @param userNameFilter (optional)
     * @param pMTaskPriorityPriorityFilter (optional)
     * @param taskVelocityVelocityFilter (optional)
     * @param pMTaskTypeTypeFilter (optional)
     * @param pMTaskFrequencyFrequencyFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | null | undefined, titleFilter: string | null | undefined, summaryFilter: string | null | undefined, acceptanceCriteriaFilter: string | null | undefined, maxDueDateFilter: moment.Moment | null | undefined, minDueDateFilter: moment.Moment | null | undefined, maxParentIDFilter: number | null | undefined, minParentIDFilter: number | null | undefined, maxDependencyFilter: number | null | undefined, minDependencyFilter: number | null | undefined, maxDayOnMonthFilter: number | null | undefined, minDayOnMonthFilter: number | null | undefined, mondayFilter: number | null | undefined, tuesdayFilter: number | null | undefined, wednesdayFilter: number | null | undefined, thursdayFilter: number | null | undefined, fridayFilter: number | null | undefined, saturdayFilter: number | null | undefined, sundayFilter: number | null | undefined, maxDueTimeFilter: moment.Moment | null | undefined, minDueTimeFilter: moment.Moment | null | undefined, pMProjectProjectNameFilter: string | null | undefined, pMSprintSprintFilter: string | null | undefined, pMStoryTitleFilter: string | null | undefined, userNameFilter: string | null | undefined, pMTaskPriorityPriorityFilter: string | null | undefined, taskVelocityVelocityFilter: string | null | undefined, pMTaskTypeTypeFilter: string | null | undefined, pMTaskFrequencyFrequencyFilter: string | null | undefined,pmTaskStageFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined, sprintId: string | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (titleFilter !== undefined && titleFilter !== null)
            url_ += "TitleFilter=" + encodeURIComponent("" + titleFilter) + "&";
        if (summaryFilter !== undefined && summaryFilter !== null)
            url_ += "SummaryFilter=" + encodeURIComponent("" + summaryFilter) + "&";
        if (acceptanceCriteriaFilter !== undefined && acceptanceCriteriaFilter !== null)
            url_ += "AcceptanceCriteriaFilter=" + encodeURIComponent("" + acceptanceCriteriaFilter) + "&";
        if (maxDueDateFilter !== undefined && maxDueDateFilter !== null)
            url_ += "MaxDueDateFilter=" + encodeURIComponent(maxDueDateFilter ? "" + maxDueDateFilter.toJSON() : "") + "&";
        if (minDueDateFilter !== undefined && minDueDateFilter !== null)
            url_ += "MinDueDateFilter=" + encodeURIComponent(minDueDateFilter ? "" + minDueDateFilter.toJSON() : "") + "&";
        if (maxParentIDFilter !== undefined && maxParentIDFilter !== null)
            url_ += "MaxParentIDFilter=" + encodeURIComponent("" + maxParentIDFilter) + "&";
        if (minParentIDFilter !== undefined && minParentIDFilter !== null)
            url_ += "MinParentIDFilter=" + encodeURIComponent("" + minParentIDFilter) + "&";
        if (maxDependencyFilter !== undefined && maxDependencyFilter !== null)
            url_ += "MaxDependencyFilter=" + encodeURIComponent("" + maxDependencyFilter) + "&";
        if (minDependencyFilter !== undefined && minDependencyFilter !== null)
            url_ += "MinDependencyFilter=" + encodeURIComponent("" + minDependencyFilter) + "&";
        if (maxDayOnMonthFilter !== undefined && maxDayOnMonthFilter !== null)
            url_ += "MaxDayOnMonthFilter=" + encodeURIComponent("" + maxDayOnMonthFilter) + "&";
        if (minDayOnMonthFilter !== undefined && minDayOnMonthFilter !== null)
            url_ += "MinDayOnMonthFilter=" + encodeURIComponent("" + minDayOnMonthFilter) + "&";
        if (mondayFilter !== undefined && mondayFilter !== null)
            url_ += "MondayFilter=" + encodeURIComponent("" + mondayFilter) + "&";
        if (tuesdayFilter !== undefined && tuesdayFilter !== null)
            url_ += "TuesdayFilter=" + encodeURIComponent("" + tuesdayFilter) + "&";
        if (wednesdayFilter !== undefined && wednesdayFilter !== null)
            url_ += "WednesdayFilter=" + encodeURIComponent("" + wednesdayFilter) + "&";
        if (thursdayFilter !== undefined && thursdayFilter !== null)
            url_ += "ThursdayFilter=" + encodeURIComponent("" + thursdayFilter) + "&";
        if (fridayFilter !== undefined && fridayFilter !== null)
            url_ += "FridayFilter=" + encodeURIComponent("" + fridayFilter) + "&";
        if (saturdayFilter !== undefined && saturdayFilter !== null)
            url_ += "SaturdayFilter=" + encodeURIComponent("" + saturdayFilter) + "&";
        if (sundayFilter !== undefined && sundayFilter !== null)
            url_ += "SundayFilter=" + encodeURIComponent("" + sundayFilter) + "&";
        if (maxDueTimeFilter !== undefined && maxDueTimeFilter !== null)
            url_ += "MaxDueTimeFilter=" + encodeURIComponent(maxDueTimeFilter ? "" + maxDueTimeFilter.toJSON() : "") + "&";
        if (minDueTimeFilter !== undefined && minDueTimeFilter !== null)
            url_ += "MinDueTimeFilter=" + encodeURIComponent(minDueTimeFilter ? "" + minDueTimeFilter.toJSON() : "") + "&";
        if (pMProjectProjectNameFilter !== undefined && pMProjectProjectNameFilter !== null)
            url_ += "PMProjectProjectNameFilter=" + encodeURIComponent("" + pMProjectProjectNameFilter) + "&";
        if (pMSprintSprintFilter !== undefined && pMSprintSprintFilter !== null)
            url_ += "PMSprintSprintFilter=" + encodeURIComponent("" + pMSprintSprintFilter) + "&";
        if (pMStoryTitleFilter !== undefined && pMStoryTitleFilter !== null)
            url_ += "PMStoryTitleFilter=" + encodeURIComponent("" + pMStoryTitleFilter) + "&";
        if (userNameFilter !== undefined && userNameFilter !== null)
            url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
        if (pMTaskPriorityPriorityFilter !== undefined && pMTaskPriorityPriorityFilter !== null)
            url_ += "PMTaskPriorityPriorityFilter=" + encodeURIComponent("" + pMTaskPriorityPriorityFilter) + "&";
        if (taskVelocityVelocityFilter !== undefined && taskVelocityVelocityFilter !== null)
            url_ += "TaskVelocityVelocityFilter=" + encodeURIComponent("" + taskVelocityVelocityFilter) + "&";
        if (pMTaskTypeTypeFilter !== undefined && pMTaskTypeTypeFilter !== null)
            url_ += "PMTaskTypeTypeFilter=" + encodeURIComponent("" + pMTaskTypeTypeFilter) + "&";
        if (pMTaskFrequencyFrequencyFilter !== undefined && pMTaskFrequencyFrequencyFilter !== null)
        url_ += "PMTaskFrequencyFrequencyFilter=" + encodeURIComponent("" + pMTaskFrequencyFrequencyFilter) + "&";
        if (pmTaskStageFilter !== undefined && pmTaskStageFilter !== null)
        url_ += "pmTaskStageFilter=" + encodeURIComponent("" + pmTaskStageFilter) + "&";
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

        if (sprintId === null)
            url_ += "sprintId=0";
        else if (sprintId !== undefined)
            url_ += "sprintId=" + encodeURIComponent("" + sprintId) + "&";

        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }



    /**
     * @param id (optional)
     * @return Success
     */
    getPMtaskForView(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetPMtaskForView?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }

    getPMtaskForDetail(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetPMtaskForDetail?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }




    /**
     * @param id (optional)
     * @return Success
     */
    getPMtaskForEdit(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetPMtaskForEdit?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }

    getPMtaskForEditByPublicId(publicId: string | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetPMtaskForEditByPublicId?";
        if (publicId === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (publicId !== undefined)
            url_ += "publicId=" + encodeURIComponent("" + publicId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }

    updateResponsible(body: UpdateResponsibleDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/UpdateResponsible";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }
    updateDueDate(body: any | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/UpdateDueDate";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }
    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditPMtaskDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }



    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.delete(url_).toPromise();
    }


    /**
     * @param filter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllPMProjectForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAllPMProjectForLookupTable?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
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

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }



    /**
     * @param filter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllPMSprintForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAllPMSprintForLookupTable?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
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

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.get<any>(url_).toPromise();
    }



    /**
     * @param filter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllPMStoryForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAllPMStoryForLookupTable?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
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

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }



    /**
     * @param filter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllUserForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAllUserForLookupTable?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
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

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.get<any>(url_).toPromise();
    }

    getAllUserForTableDropDown(): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/getAllUserForTableDropDown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllPMTaskPriorityForTableDropDown(): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/getAllPMTaskPriorityForTableDropDown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    getAllPMTaskDropDown(projectId): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/getAllPMTaskForTableDropDown?projectId=" + projectId;
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }


    getTaskHistory(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetTaskHistory?";
        if (id !== undefined && id !== null)
            url_ += "taskId=" + encodeURIComponent("" + id) + "&";

        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

    getAllPMTaskStageDropDown(): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAllPMTaskStageForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }
    /**
     * @return Success
     */
    getAllTaskVelocityForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAllTaskVelocityForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }


    /**
     * @return Success
     */
    getAllPMTaskTypeForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAllPMTaskTypeForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }



    /**
     * @return Success
     */
    getAllPMTaskFrequencyForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetAllPMTaskFrequencyForTableDropdown";
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }

    saveTaskStage(body: TaskStageUpdateDto) {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/SaveTaskStage";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }
    getTotalSpendTimeForTask(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PMtasks/GetTotalSpendTimeForTask?";

        if (id !== undefined && id !== null)
            url_ += "taskId=" + encodeURIComponent("" + id);

        url_ = url_.replace(/[?&]$/, "");
        return this.http.get<any>(url_).toPromise();
    }
}

export class CreateOrEditPMtaskDto {
    title!: string;
    summary!: string;
    acceptanceCriteria!: string;
    dueDate!: Date;
    parentID!: number | undefined;
    dependency!: number | undefined;
    attachment!: string | undefined;
    dayOnMonth!: number;
    monday!: boolean;
    tuesday!: boolean;
    wednesday!: boolean;
    thursday!: boolean;
    friday!: boolean;
    saturday!: boolean;
    sunday!: boolean;
    dueTime!: Date;
    project!: number | undefined;
    sprint!: number | undefined;
    story!: number | undefined;
    responsible!: number | undefined;
    priority!: number | undefined;
    velocityID!: number;
    typeID!: number | undefined;
    pmTaskFrequencyId!: number | undefined;
    id!: number | undefined;
    dueTimeStr: string | undefined;
    pmTaskStageId!: number | undefined;
}

export class UpdateResponsibleDto {
    id!: number;
    responsible!: number | undefined
}

export class TaskStageUpdateDto {
    taskId: number;
    stageId: number;
}
