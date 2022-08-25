import { Component, OnInit } from '@angular/core';
import { HostDashboardService } from 'src/app/core/services/host-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';

export class TenantTrialSubscriptionChart extends DashboardChartBase {
  chartData: any[] = [];
  data: any;
  scheme: any = {
    domain: [
    ]
  };
  colors: string[] = [];
  constructor(private _dashboardService: HostDashboardService) {
    super();
  }

  init(data: any) {

    let formattedData = [];
    this.scheme.domain = [];
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        formattedData.push({
          'name': "Today",
          'value': data.todaysTenants
        });
      }
      else if (i === 1) {
        formattedData.push({
          'name': "This Week",
          'value': data.thisWeekTenants
        });
      } else if (i === 2) {
        formattedData.push({
          'name': "This Month",
          'value': data.thisMonthTenants
        });
      }

      this.scheme.domain[i] = this.colors[i];

    }

    this.chartData = formattedData;
  }
  reload() {
    this.showLoading();
    this._dashboardService.getTenantsWithTrialSubscriptions().then(data => {
      //this.init(data.result);
      debugger;
      this.data = data.result;
      this.hideLoading();
    });
  }
}
@Component({
  selector: 'app-widget-tenant-trial-subscriptions',
  templateUrl: './widget-tenant-trial-subscriptions.component.html',
  styleUrls: ['./widget-tenant-trial-subscriptions.component.scss']
})
export class WidgetTenantTrialSubscriptionsComponent implements OnInit {

  view: any[] = [625, 200];
  tenantTrialSubscriptionChart: TenantTrialSubscriptionChart;
  cardColor = "#232837";
  constructor(private _dashboardService: HostDashboardService) {

    this.tenantTrialSubscriptionChart = new TenantTrialSubscriptionChart(this._dashboardService);
    debugger;
  }

  ngOnInit(): void {
    this.tenantTrialSubscriptionChart.reload();
    this.generateRandomColor();
  }
  generateRandomColor(): void {
    for (let index = 1; index <= 20; index++) {

      if (this.tenantTrialSubscriptionChart.colors === undefined) {
        this.tenantTrialSubscriptionChart.colors = [];
      }
      else {
        this.tenantTrialSubscriptionChart.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      }
    }
  }
}
