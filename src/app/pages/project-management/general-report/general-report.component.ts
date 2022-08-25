import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { NameValueDto } from 'src/app/core/services/supports.service';
import { TimeDoctorService, WorkLogByDates, WorkLogFilterDto } from 'src/app/core/services/time-doctor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  //styleUrls: ['./general-report.component.scss']
})
export class GeneralReportComponent implements OnInit {

  @Input() projectId;
  @Input() sprintId;
  breadCrumbItems: Array<{}>;
  loading: boolean = false;
  companyId: string = '';

  //sprintId = 0;
  sprintsDetail: any;
  advancedFiltersAreShown = false;
  groupByType: number = 0;
  fromDateFilter: Date;
  toDateFilter: Date;

  selectedItems: NameValueDto[] = [];
  dropdownList: NameValueDto[] = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  workLogByDates: WorkLogByDates[] = [];
  showUserName: boolean = false;
  projectDetails: any;
  tenant: any;
  timeTrakingType: number = 0;

  constructor(private route: ActivatedRoute,
    private _sprintService: SprintService,
    private _timeDoctorService: TimeDoctorService,
    private _projectService: ProjectService,
    private _messageService: MessageService,) { }

  ngOnInit(): void {
    this.tenant = JSON.parse(localStorage.getItem(KeyConstant.tenant));
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');

    this.sprintsDetail = { project: environment.emptyGuid };

    this.breadCrumbItems = [{ label: 'Project' }, { label: 'GeneralReport', active: true }];

    if (this.sprintId != environment.emptyGuid) {
      this.showLoader();
      this._sprintService.getSprintForView(this.sprintId).then(r => {
        this.sprintsDetail = r.result.pmSprint;
        this.breadCrumbItems = [{ label: r.result.pmProjectProjectName }, { label: 'GeneralReport', active: true }];
        
        this._projectService.getPMProjectForView(r.result.projectPublicId).then(s => {
          this.projectDetails = s.result.pmProject;

          this.getTimeDoctorUsers(this.projectDetails.companyFk.readToken, this.projectDetails.companyFk.externalCompanyId);
        },
        (error) => {  this.hideLoader(); }
        );
      },
      (error) => {  this.hideLoader(); }
      );


    }

  }
  onItemSelect(item: NameValueDto) {
    this.selectedItems.push(item);
    console.log(this.selectedItems);
  }

  onItemDeSelect(item: NameValueDto) {
    this.selectedItems = this.selectedItems.filter(s => s.value != item.value);
    console.log(this.selectedItems);
  }

  getData(): void {

    if (this.fromDateFilter === undefined || this.toDateFilter === undefined) {
      this._messageService.showError("", "Please select from and to dates.");
      return;
    }

    if (Number(this.timeTrakingType) === 0) {
      var newProjectName = this.tenant.tenantName === "Default" ? this.projectDetails.projectName : this.tenant.tenantName + "_" + this.projectDetails.projectName;

      this.showLoader();
      var request = new WorkLogFilterDto();
      request.companyId = this.projectDetails.companyFk.externalCompanyId;
      request.from = this.fromDateFilter.toString();
      request.to = this.toDateFilter.toString();
      request.groupByType = Number(this.groupByType);
      request.projectName = newProjectName;
      request.readToken = this.projectDetails.companyFk.readToken;
      request.userId = Array.from(new Set(this.selectedItems.map(({ value }) => value))).join(",");


      this._timeDoctorService.getTimeDoctorData(request).then(result => {
        this.hideLoader();
        this.workLogByDates = result.result;

        if (request.groupByType === 0 || request.groupByType === 1) {
          this.showUserName = false;
        }
        else {
          this.showUserName = true;
        }
      },
        (error) => { this.hideLoader(); });
    }
    else {
      this.showLoader();
      var request = new WorkLogFilterDto();
      request.from = this.fromDateFilter.toString();
      request.to = this.toDateFilter.toString();
      request.groupByType = Number(this.groupByType);
      request.projectId = this.projectDetails.id;
      request.users = Array.from(new Set(this.selectedItems.map(({ value }) => value)));


      this._timeDoctorService.getManualTrackedData(request).then(result => {
        this.hideLoader();
        
        this.workLogByDates = result.result;

        if (request.groupByType === 0 || request.groupByType === 1) {
          this.showUserName = false;
        }
        else {
          this.showUserName = true;
        }
      },
        (error) => { this.hideLoader(); });
    }
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  changeTrackingType(): void {
    this.dropdownList = [];
    this.workLogByDates = [];
    if (Number(this.timeTrakingType) === 0) {
      this.getTimeDoctorUsers(this.projectDetails.companyFk.readToken, this.projectDetails.companyFk.externalCompanyId);
    }
    else if (Number(this.timeTrakingType) === 1) {
      this.getProjectMembersForManualTracking(this.projectDetails.id);
    }
  }


  getTimeDoctorUsers(token: string, companyId: string): void {
    this.showLoader();
    this._timeDoctorService.getUsers(token, companyId).then(u => {
      this.dropdownList = u.result;
      this.hideLoader();
    },
      (error) => { this.hideLoader() });
  }

  getProjectMembersForManualTracking(projectId: any): void {
    this.showLoader();
    this._timeDoctorService.getProjectMembers(projectId).then(u => {
      this.dropdownList = u.result;
      this.hideLoader();
    },
      (error) => { this.hideLoader() }
    );
  }
}
