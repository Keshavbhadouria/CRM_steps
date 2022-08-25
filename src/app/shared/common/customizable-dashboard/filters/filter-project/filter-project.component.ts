import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
declare let abp: any;
@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  //styleUrls: ['./filter-project.component.scss']
})
export class FilterProjectComponent implements OnInit {

  projectId: number | undefined;
  sprintId: number | undefined;
  projects: GetProjectOutput[];
  sprints: GetSprintOutput[];
  constructor(private _dashboardService: TenantDashboardService) { }

  ngOnInit(): void {
    this._dashboardService.getProjects().then(r => {
      this.projects = r.result;
    });
  }

  projectChange() {
    this._dashboardService.getActiveSprintByProject(this.projectId).then(r => {
      this.sprints = [];
      this.sprints = r.result;
    });
  }

  onChange() {
    // abp.event.trigger('app.dashboardFilters.sprintChange', this.sprintId);

    let selectedSprint = this.sprints.filter((s,i)=> s.id === this.sprintId)[0];
    let projects = this.projects.filter((s,i)=> s.id === this.projectId)[0];
    abp.event.trigger('app.dashboardFilters.updateSpring', 
    { sprintId: this.sprintId,
      sprintName : selectedSprint?.sprintName,
      projectName : projects?.projectName
    });
  }
}

export class GetProjectOutput {
  id!: number;
  projectName!: string
}

export class GetSprintOutput {
  id: number;
  sprintName: string;
}