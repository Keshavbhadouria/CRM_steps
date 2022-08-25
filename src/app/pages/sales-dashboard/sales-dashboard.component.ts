import { Component, OnInit } from '@angular/core';
import { DashboardCustomizationConst } from 'src/app/shared/common/customizable-dashboard/DashboardCustomizationConsts';

@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.scss']
})
export class SalesDashboardComponent implements OnInit {
  dashboardName: string = DashboardCustomizationConst.dashboardNames.salesDashboard;
  constructor() { }

  ngOnInit(): void {
  }

}
