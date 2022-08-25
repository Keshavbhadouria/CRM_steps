import { Component, OnInit } from '@angular/core';
import { HostDashboardService } from 'src/app/core/services/host-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';

export class Last3MonthSubscriptionChart extends DashboardChartBase {
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
          'name': "New",
          'value': data.newTenants
        });
      }
      else if (i === 1) {
        formattedData.push({
          'name': "Cancel",
          'value': data.cancelTenants
        });
      } else if (i === 2) {
        formattedData.push({
          'name': "Inactive",
          'value': data.inActiveTennats
        });
      }

      this.scheme.domain[i] = this.colors[i];

    }

    this.chartData = formattedData;
  }
  reload() {
    this.showLoading();
    this._dashboardService.getLast3MonthSubscriptions().then(data => {
      //this.init(data.result);
      this.data = data.result;
      this.hideLoading();
    });
  }
}

@Component({
  selector: 'app-widget-last-three-moth-subscriptions',
  templateUrl: './widget-last-three-moth-subscriptions.component.html',
  styleUrls: ['./widget-last-three-moth-subscriptions.component.scss']
})
export class WidgetLastThreeMothSubscriptionsComponent implements OnInit {

  view: any[] = [625, 200];
  last3MonthSubscriptionChart: Last3MonthSubscriptionChart;
  cardColor = "#232837";

  constructor(private _dashboardService: HostDashboardService) {
    this.last3MonthSubscriptionChart = new Last3MonthSubscriptionChart(this._dashboardService);
  }

  ngOnInit(): void {
    this.last3MonthSubscriptionChart.reload();
    this.generateRandomColor();
  }
  generateRandomColor(): void {
    for (let index = 1; index <= 20; index++) {

      if (this.last3MonthSubscriptionChart.colors === undefined) {
        this.last3MonthSubscriptionChart.colors = [];
      }
      else {
        this.last3MonthSubscriptionChart.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      }
    }
  }
}
