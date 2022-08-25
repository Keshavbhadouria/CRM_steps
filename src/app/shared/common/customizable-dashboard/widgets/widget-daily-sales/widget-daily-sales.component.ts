import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';


class DailySalesLineChart extends DashboardChartBase {

  chartData: any[];
  scheme: any = {
    name: 'green',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#34bfa3'
    ]
  };

  constructor(private _dashboardService: TenantDashboardService) {
    super();
  }

  init(data) {
    this.chartData = [];
    for (let i = 0; i < data.length; i++) {
      this.chartData.push({
        name: i + 1,
        value: data[i]
      });
    }
  }

  reload() {
    this.showLoading();
    this._dashboardService
      .getDailySales()
      .then(result => {
        this.init(result.result.dailySales);
        this.hideLoading();
      });
  }
}


@Component({
  selector: 'app-widget-daily-sales',
  templateUrl: './widget-daily-sales.component.html',
  styleUrls: ['./widget-daily-sales.component.scss']
})
export class WidgetDailySalesComponent implements OnInit {

  dailySalesLineChart: DailySalesLineChart;
  constructor(private _tenantdashboardService: TenantDashboardService) { 
    this.dailySalesLineChart = new DailySalesLineChart(this._tenantdashboardService);
  }

  ngOnInit(): void {
    this.dailySalesLineChart.reload();
  }

}
