import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';

class GeneralStatsPieChart extends DashboardChartBase {

  public data = [];

  constructor(private _dashboardService: TenantDashboardService) {
    super();
  }

  init(transactionPercent, newVisitPercent, bouncePercent) {
    this.data = [
      {
        'name': 'Operations',
        'value': transactionPercent
      }, {
        'name': 'New Visits',
        'value': newVisitPercent
      }, {
        'name': 'Bounce',
        'value': bouncePercent
      }];

    this.hideLoading();
  }

  reload() {
    this.showLoading();
    this._dashboardService
      .getGeneralStats()
      .then(response => {
        let result = response.result;
        this.init(result.transactionPercent, result.newVisitPercent, result.bouncePercent);
      });
  }
}

@Component({
  selector: 'app-widget-general-stats',
  templateUrl: './widget-general-stats.component.html',
  styleUrls: ['./widget-general-stats.component.scss']
})
export class WidgetGeneralStatsComponent implements OnInit {

  generalStatsPieChart: GeneralStatsPieChart;

  constructor(private _dashboardService: TenantDashboardService) {
    this.generalStatsPieChart = new GeneralStatsPieChart(this._dashboardService);
  }

  ngOnInit(): void {
    this.generalStatsPieChart.reload();
  }

}
