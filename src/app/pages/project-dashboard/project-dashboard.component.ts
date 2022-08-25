import { Component, OnInit } from '@angular/core';
import { DashboardCustomizationConst } from 'src/app/shared/common/customizable-dashboard/DashboardCustomizationConsts';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  dashboardName: string = DashboardCustomizationConst.dashboardNames.projectDashboard;
  constructor() { }

  ngOnInit(): void {
  }

}
