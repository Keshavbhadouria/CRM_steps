import { Component, OnInit } from '@angular/core';
import { HostDashboardService } from 'src/app/core/services/host-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';


export class TotalMembersNumberChart extends DashboardChartBase {
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
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        formattedData.push({
          'name': "This Week",
          'value': data.thisWeek
        });
      }
      else if (i === 1) {
        formattedData.push({
          'name': "This Month",
          'value': data.thisMonth
        });
      } else if (i === 2) {
        formattedData.push({
          'name': "Last 3 Months",
          'value': data.last3Months
        });
      }
      else if (i === 3) {
        formattedData.push({
          'name': "Last 6 Months",
          'value': data.last6Months
        });
      }
      this.scheme.domain[i] = this.colors[i];

    }

    this.chartData = formattedData;
  }
  reload() {
    this.showLoading();
    this._dashboardService.totalMembers().then(data => {
      //this.init(data.result);
      this.data = data.result;
      this.hideLoading();
    });
  }
}
@Component({
  selector: 'app-widget-total-members',
  templateUrl: './widget-total-members.component.html',
  styleUrls: ['./widget-total-members.component.scss']
})
export class WidgetTotalMembersComponent implements OnInit {
  view: any[] = [625, 200];
  totalMembersNumberChart: TotalMembersNumberChart;
  cardColor = "#232837";
  constructor(private _dashboardService: HostDashboardService) {
    this.totalMembersNumberChart = new TotalMembersNumberChart(this._dashboardService);

  }

  ngOnInit(): void {
    this.totalMembersNumberChart.reload();
    this.generateRandomColor();
  }
  generateRandomColor(): void {
    for (let index = 1; index <= 20; index++) {

      if (this.totalMembersNumberChart.colors === undefined) {
        this.totalMembersNumberChart.colors = [];
      }
      else {
        this.totalMembersNumberChart.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      }
    }
  }
}
