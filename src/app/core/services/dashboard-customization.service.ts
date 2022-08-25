import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class DashboardCustomizationService {

    constructor(private http: HttpClient) { }

    getDashboardDefinition(dashboardName: string | null | undefined, application: string | null | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DashboardCustomization/GetDashboardDefinition?";
        if (dashboardName !== undefined && dashboardName !== null)
            url_ += "DashboardName=" + encodeURIComponent("" + dashboardName) + "&";
        if (application !== undefined && application !== null)
            url_ += "Application=" + encodeURIComponent("" + application) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get(url_).toPromise();
    }
    getDashboardFromSettings(application: string | null | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DashboardCustomization/getDashboardFromSettings?";
        if (application !== undefined && application !== null)
            url_ += "Application=" + encodeURIComponent("" + application) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get(url_).toPromise();
    }

    addWidget(body: AddWidgetInput | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DashboardCustomization/AddWidget";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.post<any>(url_, body).toPromise();
    }
    addNewPage(body: AddNewPageInput | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DashboardCustomization/AddNewPage";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.post<any>(url_, body).toPromise();
    }
    renamePage(body: RenamePageInput | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DashboardCustomization/RenamePage";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.post<any>(url_, body).toPromise();
    }

    deletePage(id: string | null | undefined, dashboardName: string | null | undefined, application: string | null | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DashboardCustomization/DeletePage?";
        if (id !== undefined && id !== null)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        if (dashboardName !== undefined && dashboardName !== null)
            url_ += "DashboardName=" + encodeURIComponent("" + dashboardName) + "&";
        if (application !== undefined && application !== null)
            url_ += "Application=" + encodeURIComponent("" + application) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }

    savePage(body: SavePageInput | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/DashboardCustomization/SavePage";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.post<any>(url_, body).toPromise();
    }
}

export class DashboardOutput {
    name!: string | undefined;
    widgets!: WidgetOutput[] | undefined;
}

export class WidgetOutput {
    id!: string | undefined;
    name!: string | undefined;
    description!: string | undefined;
    filters!: WidgetFilterOutput[] | undefined;
}
export class WidgetFilterOutput {
    id!: string | undefined;
    name!: string | undefined;

}

export class AddNewPageOutput {
    pageId!: string | undefined;
}

export class RenamePageInput {
    dashboardName!: string | undefined;
    id!: string | undefined;
    name!: string | undefined;
    application!: string | undefined;

    constructor(data?: IRenamePageInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
export interface IRenamePageInput {
    dashboardName: string | undefined;
    id: string | undefined;
    name: string | undefined;
    application: string | undefined;
}

export class SavePageInput implements ISavePageInput {
    dashboardName!: string | undefined;
    application!: string | undefined;
    pages!: Page[] | undefined;

    constructor(data?: ISavePageInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
export interface ISavePageInput {
    dashboardName: string | undefined;
    application: string | undefined;
    pages: Page[] | undefined;
}
export class Page {
    id!: string | undefined;
    name!: string | undefined;
    widgets!: Widget[] | undefined;

    constructor(data?: IPage) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
export interface IPage {
    id: string | undefined;
    name: string | undefined;
    widgets: Widget[] | undefined;
}

export class Widget {
    widgetId!: string | undefined;
    height!: number;
    width!: number;
    positionX!: number;
    positionY!: number;

    constructor(data?: IWidget) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}

export interface IWidget {
    widgetId: string | undefined;
    height: number;
    width: number;
    positionX: number;
    positionY: number;
}

export class AddWidgetInput implements IAddWidgetInput {
    widgetId!: string | undefined;
    pageId!: string | undefined;
    dashboardName!: string | undefined;
    width!: number;
    height!: number;
    application!: string | undefined;

    constructor(data?: IAddWidgetInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
export interface IAddWidgetInput {
    widgetId: string | undefined;
    pageId: string | undefined;
    dashboardName: string | undefined;
    width: number;
    height: number;
    application: string | undefined;
}

export class AddNewPageInput implements IAddNewPageInput {
    dashboardName!: string | undefined;
    name!: string | undefined;
    application!: string | undefined;

    constructor(data?: IAddNewPageInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
export interface IAddNewPageInput {
    dashboardName: string | undefined;
    name: string | undefined;
    application: string | undefined;
}