import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { GridsterConfig, GridsterItem } from "angular-gridster2";
import { BsDropdownDirective } from "ngx-bootstrap/dropdown";
import { BsModalRef, ModalDirective } from "ngx-bootstrap/modal";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { AddNewPageInput, AddNewPageOutput, AddWidgetInput, DashboardCustomizationService, DashboardOutput, Page, RenamePageInput, SavePageInput, Widget, WidgetFilterOutput, WidgetOutput } from "src/app/core/services/dashboard-customization.service";
import { MessageService } from "src/app/core/services/message.service";
import Swal from "sweetalert2";
import { AddWidgetModalComponent } from "./add-widget-modal/add-widget-modal.component";
import { DashboardViewConfigurationService } from "./dashboard-view-configuration.service";
import { DashboardCustomizationConst } from "./DashboardCustomizationConsts";
import { WidgetFilterViewDefinition, WidgetViewDefinition } from "./definitions";
import * as _ from 'lodash';
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
declare let abp: any;
@Component({
    selector: 'customizable-dashboard',
    templateUrl: './customizable-dashboard.component.html',
    styleUrls: ['./customizable-dashboard.component.css']

})
export class CustomizableDashboardComponent implements OnInit, OnDestroy {
    @Input() dashboardName;

    @ViewChild('addWidgetModal') addWidgetModal: ElementRef;
    @ViewChild('dashboardTabs') dashboardTabs: TabsetComponent;
    @ViewChild('filterModal') filterModal: ElementRef;
    @ViewChild('dropdownRenamePage') dropdownRenamePage: BsDropdownDirective;
    @ViewChild('dropdownAddPage') dropdownAddPage: BsDropdownDirective;

    loading = true;
    busy = true;
    editModeEnabled = false;

    dashboardDefinition: DashboardOutput;

    //gridster options. all gridster needs its options. In our scenario, they are all same.
    options: GridsterConfig[] = [];

    userDashboard: any;

    selectedPage = {
        id: '',
        name: ''
    };

    renamePageInput = '';
    addPageInput = '';

    ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false,
        size: 'md'
    };

    isOpnWidgetClicked: boolean = false;
    userWidgets: WidgetOutput[];
    sprintId: number | undefined = 0;
    projectName: string;
    sprintName: string;
    dashboardTitle: string = "Dashboard";

    //date range
    startDate: any;
    endDate: any

    constructor(
        private _dashboardViewConfiguration: DashboardViewConfigurationService,
        private _dashboardCustomizationService: DashboardCustomizationService,
        private translate: TranslateService,
        private _messageService: MessageService,
        private modalService: NgbModal
    ) {

    }

    modalRef: NgbModalRef;
    openFilterModal(): void {
        this.modalRef = this.modalService.open(this.filterModal, this.ngbModalOptions);
    }

    applySprintFilter(): void {

        if (this.projectName !== undefined && this.sprintName !== undefined) {
            //this.dashboardTitle = 'Dashboard';
            this.dashboardTitle += " > " + this.projectName + " > " + this.sprintName;
        }

        if (this.sprintId !== undefined && this.sprintId !== 0) {
            abp.event.trigger('app.dashboardFilters.sprintChange', this.sprintId);
        }
        if (this.startDate !== undefined && this.endDate !== undefined) {
            abp.event.trigger('app.dashboardFilters.datesChange', { start: this.startDate, end: this.endDate });
        }

        this.modalRef.dismiss();
    }



    async ngOnInit() {

        abp.event.on("app.dashboardFilters.updateSpring", (sprintDetails) => {

            this.sprintId = sprintDetails.sprintId;
            this.projectName = sprintDetails.projectName;
            this.sprintName = sprintDetails.sprintName;
        })

        abp.event.on("app.dashboardFilters.updateDates", (dates) => {

            this.startDate = dates.start;
            this.endDate = dates.end;
        })

        if (this.dashboardName === undefined) {
            this.dashboardName = DashboardCustomizationConst.dashboardNames.defaultTenantDashboard;
        }

        if (this.dashboardName === DashboardCustomizationConst.dashboardNames.projectDashboard) {
            this.translate.get(DashboardCustomizationConst.dashboardNames.projectDashboard).subscribe(s => {
                this.dashboardTitle = s;
            });
        }
        else if (this.dashboardName === DashboardCustomizationConst.dashboardNames.salesDashboard) {
            this.translate.get(DashboardCustomizationConst.dashboardNames.salesDashboard).subscribe(s => {
                this.dashboardTitle = s;
            });
        }
        else if (this.dashboardName === DashboardCustomizationConst.dashboardNames.subscriptionDashboard) {
            this.translate.get(DashboardCustomizationConst.dashboardNames.subscriptionDashboard).subscribe(s => {
                this.dashboardTitle = s;
            });
        }

        this.loading = true;

        this._dashboardCustomizationService.getDashboardDefinition(this.dashboardName, DashboardCustomizationConst.Applications.Angular)
            .then(async (result: any) => {

                let dashboardDefinitionResult = result.result;
                this.dashboardDefinition = dashboardDefinitionResult;
                if (!this.dashboardDefinition.widgets || this.dashboardDefinition.widgets.length === 0) {
                    this.loading = false;
                    this.busy = false;
                    return;
                }

                let savedUserDashboard = await this.getUserDashboard(this.dashboardName);

                this.initializeUserDashboardDefinition(savedUserDashboard, dashboardDefinitionResult);
                this.initializeUserDashboardFilters();

                //select first page (if user delete all pages server will add default page to userDashboard.)
                this.selectedPage = {
                    id: this.userDashboard.pages[0].id,
                    name: this.userDashboard.pages[0].name
                };

                this.loading = false;
                this.busy = false;
            });

        this.subAsideTogglerClick();
    }

    ngOnDestroy(): void {
        this.unSubAsideTogglerClick();
    }

    initializeUserDashboardDefinition(savedUserDashboard: any, dashboardDefinitionResult: DashboardOutput) {

        this.userDashboard = {
            dashboardName: this.dashboardName,
            filters: [],
            pages: savedUserDashboard.pages.map(page => {
                //gridster should has its own options
                this.options.push(this.getGridsterConfig());

                if (!page.widgets) {
                    return {
                        id: page.id,
                        name: page.name,
                        widgets: []
                    };
                }

                //only use widgets which dashboard definition contains and have view definition
                //(dashboard definition can be changed after users save their dashboard, because it depends on permissions and other stuff)
                page.widgets = page.widgets.filter(w => dashboardDefinitionResult.widgets.find(d => d.id === w.widgetId) && this.getWidgetViewDefinition(w.widgetId));

                return {
                    id: page.id,
                    name: page.name,
                    widgets: page.widgets.map(widget => {
                        return {
                            id: widget.widgetId,
                            //View definitions are stored in the angular side(a component of widget/filter etc.) get view definition and use defined component
                            component: this.getWidgetViewDefinition(widget.widgetId).component,
                            gridInformation: {
                                id: widget.widgetId,
                                cols: widget.width,
                                rows: widget.height,
                                x: widget.positionX,
                                y: widget.positionY,
                            }
                        };
                    })
                };

            })
        };
    }

    removeItem(item: GridsterItem) {
        let page = this.userDashboard.pages.find(p => p.id === this.selectedPage.id);
        let widget = page.widgets.find(w => w.id === item.id);
        let widgetDefinition = this.dashboardDefinition.widgets.find((widgetDef: WidgetOutput) => widgetDef.id === item.id);

        if (!widget || !widgetDefinition) {
            return;
        }

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger ms-2'
            },
            buttonsStyling: false
        });
        var msgText;
        this.translate.get('WidgetDeleteWarningMessage', { 0: widgetDefinition.name, 1: this.selectedPage.name }).subscribe(response => {
            msgText = response;
        });
        swalWithBootstrapButtons
            .fire({
                title: this.translate.instant('Areyousure?'),
                text: msgText,
                icon: 'warning',
                confirmButtonText: this.translate.instant('confirmButtonTextMsg'),
                cancelButtonText: this.translate.instant('cancelButtonTextMsg'),
                showCancelButton: true
            })
            .then(result => {
                if (result.value) {
                    page.widgets.splice(page.widgets.indexOf(widget), 1);
                }
            });

        // this.message.confirm(
        //     this.l('WidgetDeleteWarningMessage', this.l(widgetDefinition.name), this.selectedPage.name),
        //     this.l('AreYouSure'),
        //     isConfirmed => {
        //         if (isConfirmed) {
        //             page.widgets.splice(page.widgets.indexOf(widget), 1);
        //         }
        //     }
        // );
    }

    addWidget(widgetId: any): void {

        if (!widgetId) {
            this.modalService.dismissAll();
            return;
        }

        let widgetViewConfiguration = this._dashboardViewConfiguration.WidgetViewDefinitions.find(w => w.id === widgetId);
        if (!widgetViewConfiguration) {
            this.translate.get('ThereIsNoViewConfigurationForX', { 0: widgetId }).subscribe(response => {
                this._messageService.showError("", response);
            });
            //abp.notify.error(this.l('ThereIsNoViewConfigurationForX', widgetId));
            return;
        }

        let page = this.userDashboard.pages.find(page => page.id === this.selectedPage.id);
        if (page.widgets.find(w => w.id === widgetId)) {
            return;
        }

        this.busy = true;

        this._dashboardCustomizationService.addWidget(new AddWidgetInput({
            widgetId: widgetId,
            pageId: this.selectedPage.id,
            dashboardName: this.dashboardName,
            width: widgetViewConfiguration.defaultWidth,
            height: widgetViewConfiguration.defaultHeight,
            application: DashboardCustomizationConst.Applications.Angular
        })).then((addedWidget) => {
            this.userDashboard.pages.find(page => page.id === this.selectedPage.id).widgets.push({
                id: widgetId,
                component: widgetViewConfiguration.component,
                gridInformation: {
                    id: widgetId,
                    cols: addedWidget.width,
                    rows: addedWidget.height,
                    x: addedWidget.positionX,
                    y: addedWidget.positionY,
                }
            });

            this.initializeUserDashboardFilters();

            this.busy = false;
            this._messageService.showSuccess("", this.translate.instant("SavedSuccessfully"));
            //this.notify.success(this.l('SavedSuccessfully'));
            this.opnModalRef.dismiss();
        });
    }

    private async getUserDashboards(): Promise<any[]> {

        var result = await this._dashboardCustomizationService.getDashboardFromSettings(DashboardCustomizationConst.Applications.Angular);
        return <any[]>result.result;
    }

    private async getUserDashboard(name: string): Promise<any> {
        var data = await this.getUserDashboards();
        return data.filter(dashboard => dashboard.dashboardName === name)[0];
    }

    private getWidgetViewDefinition(id: string): WidgetViewDefinition {
        return this._dashboardViewConfiguration.WidgetViewDefinitions.find(widget => widget.id === id);
    }

    private getWidgetFilterViewDefinition(id: string): WidgetFilterViewDefinition {
        return this._dashboardViewConfiguration.widgetFilterDefinitions.find(filter => filter.id === id);
    }

    changeEditMode(): void {
        this.editModeEnabled = !this.editModeEnabled;
        //change all gridster options
        this.refreshAllGrids();
    }

    refreshAllGrids(): void {
        if (this.options) {
            this.options.forEach(option => {
                option.draggable.enabled = this.editModeEnabled;
                option.resizable.enabled = this.editModeEnabled;
                option.api.optionsChanged();
            });
        }
    }

    opnModalRef: NgbModalRef;
    openAddWidgetModal(content): void {

        let page = this.userDashboard.pages.find(page => page.id === this.selectedPage.id);
        if (page) {
            let widgets = this.dashboardDefinition.widgets.filter((widgetDef: WidgetOutput) => !page.widgets.find(widgetOnPage => widgetOnPage.id === widgetDef.id));
            this.userWidgets = widgets;
            this.opnModalRef = this.modalService.open(content, this.ngbModalOptions)
            //this.addWidgetModal.show(widgets);
        }
    }

    addNewPage(pageName: string): void {
        if (!pageName || pageName.trim() === '') {
            this._messageService.showInfo("", this.translate.instant("PageNameCanNotBeEmpty"));
            //this.notify.warn(this.l('PageNameCanNotBeEmpty'));
            return;
        }

        pageName = pageName.trim();

        this.busy = true;
        this._dashboardCustomizationService.addNewPage(
            new AddNewPageInput({
                dashboardName: this.dashboardName,
                name: pageName,
                application: DashboardCustomizationConst.Applications.Angular
            })
        ).then((r: any) => {

            let result = r.result;
            //gridster options for new page
            this.options.push(this.getGridsterConfig());

            this.userDashboard.pages.push({
                id: result.pageId,
                name: pageName,
                widgets: []
            });

            this.busy = false;
            //this.notify.success(this.l('SavedSuccessfully'));
            this._messageService.showSuccess("", this.translate.instant("SavedSuccessfully"));

            if (this.selectedPage.id === '') {
                this.selectPageTab(result.pageId);
            }
        });

        //this.dropdownAddPage.hide();
    }

    selectPageTab(pageId: string): void {
        if (!pageId) {
            this.selectedPage = {
                id: '',
                name: ''
            };

            return;
        }

        this.selectedPage = {
            id: pageId,
            name: this.userDashboard.pages.find(page => page.id === pageId).name
        };

        //when tab change gridster should redraw because if a tab is not active gridster think that its height is 0 and do not draw it.
        this.options.forEach(option => {
            if (option.api) {
                option.api.optionsChanged();
            }
        });
    }

    renamePage(pageName: string): void {
        if (!pageName || pageName === '') {
            this._messageService.showInfo("", this.translate.instant("PageNameCanNotBeEmpty"));
            //this.notify.warn(this.l('PageNameCanNotBeEmpty'));
            return;
        }

        pageName = pageName.trim();

        this.busy = true;

        let pageId = this.selectedPage.id;
        this._dashboardCustomizationService.renamePage(
            new RenamePageInput({
                dashboardName: this.dashboardName,
                id: pageId,
                name: pageName,
                application: DashboardCustomizationConst.Applications.Angular
            })
        ).then(() => {
            let dashboardPage = this.userDashboard.pages.find(page => page.id === pageId);
            dashboardPage.name = pageName;
            this._messageService.showSuccess("", "Renamed");
            //this.notify.success(this.l('Renamed'));
            this.busy = false;
        });

        //this.dropdownRenamePage.hide();
    }

    deletePage(): void {

        var fmsg = '';
        var smsg = '';
        this.translate.get('PageDeleteWarningMessage', { 0: this.selectedPage.name }).subscribe(response => {
            fmsg = response;
        });
        this.translate.get('BackToDefaultPageWarningMessage', { 0: this.selectedPage.name }).subscribe(response => {
            smsg = response;
        });

        // let message = this.userDashboard.pages.length > 1
        //     ? this.l('PageDeleteWarningMessage', this.selectedPage.name)
        //     : this.l('BackToDefaultPageWarningMessage', this.selectedPage.name);

        let message = this.userDashboard.pages.length > 1
            ? fmsg
            : smsg;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger ms-2'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: this.translate.instant('Areyousure?'),
                text: message,
                icon: 'warning',
                confirmButtonText: this.translate.instant('confirmButtonTextMsg'),
                cancelButtonText: this.translate.instant('cancelButtonTextMsg'),
                showCancelButton: true
            })
            .then(result => {
                if (result.value) {
                    this.busy = true;
                    this._dashboardCustomizationService.deletePage(this.selectedPage.id, this.dashboardName, DashboardCustomizationConst.Applications.Angular)
                        .then(() => {
                            let dashboardPage = this.userDashboard.pages.find(page => page.id === this.selectedPage.id);

                            this.options.pop(); // since all of our gridster has same options, its not important which options we are removing
                            this.userDashboard.pages.splice(this.userDashboard.pages.indexOf(dashboardPage), 1);
                            this.activateFirstPage();

                            this.busy = false;
                            this._messageService.showSuccess("", this.translate.instant("SuccessfullyRemoved"));
                            //this.notify.success(this.l('SuccessfullyRemoved'));

                            if (this.userDashboard.pages.length === 0) {
                                window.location.reload();
                            }
                        });
                }
            });

        // this.message.confirm(
        //     message,
        //     this.translate.instant('AreYouSure'),
        //     isConfirmed => {
        //         if (isConfirmed) {
        //             this.busy = true;
        //             this._dashboardCustomizationService.deletePage(this.selectedPage.id, this.dashboardName, DashboardCustomizationConst.Applications.Angular)
        //                 .subscribe(() => {
        //                     let dashboardPage = this.userDashboard.pages.find(page => page.id === this.selectedPage.id);

        //                     this.options.pop(); // since all of our gridster has same options, its not important which options we are removing
        //                     this.userDashboard.pages.splice(this.userDashboard.pages.indexOf(dashboardPage), 1);
        //                     this.activateFirstPage();

        //                     this.busy = false;
        //                     this._messageService.showSuccess("", this.translate.instant("SuccessfullyRemoved"));
        //                     //this.notify.success(this.l('SuccessfullyRemoved'));

        //                     if (this.userDashboard.pages.length === 0) {
        //                         window.location.reload();
        //                     }
        //                 });
        //         }
        //     }
        // );
    }

    activateFirstPage() {
        if (this.userDashboard.pages[0]) {
            setTimeout(() => {
                let tab = this.dashboardTabs.tabs[0];
                tab.active = true;
            }, 0);

            this.selectPageTab(this.userDashboard.pages[0].id);
            this.initializeUserDashboardFilters();
        } else {
            this.selectPageTab(null);
        }
    }

    savePage(): void {

        this.busy = true;
        let savePageInput = new SavePageInput({
            dashboardName: this.dashboardName,
            pages: this.userDashboard.pages.map(page => {
                return new Page({
                    id: page.id,
                    name: page.name,
                    widgets: page.widgets.map(widget => {
                        return new Widget({
                            widgetId: widget.gridInformation.id,
                            height: widget.gridInformation.rows,
                            width: widget.gridInformation.cols,
                            positionX: widget.gridInformation.x,
                            positionY: widget.gridInformation.y,
                        });
                    })
                });
            }),
            application: DashboardCustomizationConst.Applications.Angular
        });

        this._dashboardCustomizationService.savePage(savePageInput)
            .then(() => {
                this.changeEditMode(); //after changes saved close edit mode
                this.initializeUserDashboardFilters();

                this.busy = false;
                this._messageService.showSuccess("", this.translate.instant("SavedSuccessfully"));
                //this.notify.success(this.l('SavedSuccessfully'));
                window.location.reload();
            });
    }

    //all pages use gridster and its where they get their options. Changing this will change all gristers.
    private getGridsterConfig(): GridsterConfig {
        const isRtl = false; // rtlDetect.isRtlLang(abp.localization.currentLanguage.name);
        return {
            pushItems: true,
            draggable: {
                enabled: this.editModeEnabled
            },
            resizable: {
                enabled: this.editModeEnabled
            },
            fixedRowHeight: 30,
            fixedColWidth: 30,
            gridType: 'verticalFixed',
            dirType: isRtl ? 'rtl' : 'ltr'
        };
    }

    moreThanOnePage(): boolean {
        return this.userDashboard && this.userDashboard.pages && this.userDashboard.pages.length > 1;
    }

    close(): void {
        this.modalRef.dismiss();
    }

    addPageDropdownShown(): void {
        this.addPageInput = '';
    }

    renamePageDropdownShown(): void {
        this.renamePageInput = '';
    }

    //after we load page or add widget initialize needed filter too.
    private initializeUserDashboardFilters(): void {
        let allFilters: WidgetFilterOutput[] = [];

        this.dashboardDefinition.widgets
            .filter(widget => widget.filters != null && widget.filters.length > 0)
            .forEach(widget => {
                if (this.userDashboard.pages) {
                    this.userDashboard.pages.forEach(page => {
                        //if user has this widget in any page
                        if (page.widgets.filter(userWidget => userWidget.id === widget.id).length !== 0) {
                            widget.filters
                                .forEach(filter => {
                                    if (!allFilters.find(f => f.id === filter.id)) {
                                        allFilters.push(filter);
                                    }
                                });
                        }
                    });
                }
            });

        this.userDashboard.filters = allFilters.map(filter => {
            let definition = this.getWidgetFilterViewDefinition(filter.id);
            definition['name'] = filter.name;
            return definition;
        });
    }

    subAsideTogglerClick() {
        this.onMenuToggle();
        abp.event.on('app.kt_aside_toggler.onClick', this.onMenuToggle);
    }

    unSubAsideTogglerClick() {
        abp.event.off('app.kt_aside_toggler.onClick', this.onMenuToggle);
    }

    onMenuToggle = () => {
        this.refreshAllGrids();
    }
}
