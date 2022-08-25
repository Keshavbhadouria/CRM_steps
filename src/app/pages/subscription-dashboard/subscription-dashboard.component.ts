import { Component, OnInit } from '@angular/core';
import { DashboardCustomizationConst } from 'src/app/shared/common/customizable-dashboard/DashboardCustomizationConsts';

@Component({
  selector: 'app-subscription-dashboard',
  templateUrl: './subscription-dashboard.component.html',
  //styleUrls: ['./subscription-dashboard.component.scss']
})
export class SubscriptionDashboardComponent implements OnInit {
  dashboardName: string = DashboardCustomizationConst.dashboardNames.subscriptionDashboard;
  constructor() { }

  ngOnInit(): void {
  }

}
