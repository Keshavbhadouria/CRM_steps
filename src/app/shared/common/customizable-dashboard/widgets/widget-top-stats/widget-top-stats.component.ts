import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';


class DashboardTopStats extends DashboardChartBase {

  totalProfit = 0; totalProfitCounter = 0;
  newFeedbacks = 0; newFeedbacksCounter = 0;
  newOrders = 0; newOrdersCounter = 0;
  newUsers = 0; newUsersCounter = 0;

  totalProfitChange = 76; totalProfitChangeCounter = 0;
  newFeedbacksChange = 85; newFeedbacksChangeCounter = 0;
  newOrdersChange = 45; newOrdersChangeCounter = 0;
  newUsersChange = 57; newUsersChangeCounter = 0;

  init(totalProfit, newFeedbacks, newOrders, newUsers) {
    this.totalProfit = totalProfit;
    this.newFeedbacks = newFeedbacks;
    this.newOrders = newOrders;
    this.newUsers = newUsers;
    this.hideLoading();
  }
}
@Component({
  selector: 'app-widget-top-stats',
  templateUrl: './widget-top-stats.component.html',
  styleUrls: ['./widget-top-stats.component.scss']
})
export class WidgetTopStatsComponent implements OnInit {

  dashboardTopStats: DashboardTopStats;

  constructor(private _tenantDashboardService: TenantDashboardService) {
    this.dashboardTopStats = new DashboardTopStats();
  }

  ngOnInit(): void {
    this.loadTopStatsData();
  }

  loadTopStatsData() {
    this._tenantDashboardService.getTopStats().then((response) => {
      let data = response.result;
      this.dashboardTopStats.init(data.totalProfit, data.newFeedbacks, data.newOrders, data.newUsers);
    });
  }
}
