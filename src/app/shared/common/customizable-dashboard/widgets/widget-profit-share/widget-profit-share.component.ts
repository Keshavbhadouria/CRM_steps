import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';


class ProfitSharePieChart extends DashboardChartBase {

  chartData: any[] = [];
  scheme: any = {
    name: 'custom',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#00c5dc', '#ffb822', '#716aca'
    ]
  };

  constructor(private _dashboardService: TenantDashboardService) {
    super();
  }

  init(data: number[]) {

    let formattedData = [];
    for (let i = 0; i < data.length; i++) {
      formattedData.push({
        'name': this.getChartItemName(i),
        'value': data[i]
      });
    }

    this.chartData = formattedData;
  }

  getChartItemName(index: number) {
    if (index === 0) {
      return 'Product Sales';
    }

    if (index === 1) {
      return 'Online Courses';
    }

    if (index === 2) {
      return 'Custom Development';
    }

    return 'Other';
  }

  reload() {
    this.showLoading();
    this._dashboardService.getProfitShare().then(data => {
      this.init(data.result.profitShares);
      this.hideLoading();
    });
  }
}
@Component({
  selector: 'app-widget-profit-share',
  templateUrl: './widget-profit-share.component.html',
  styleUrls: ['./widget-profit-share.component.scss']
})
export class WidgetProfitShareComponent implements OnInit {
  profitSharePieChart: ProfitSharePieChart;
  constructor(private _dashboardService: TenantDashboardService) {
    this.profitSharePieChart = new ProfitSharePieChart(this._dashboardService);
  }

  ngOnInit(): void {
    this.profitSharePieChart.reload();
  }

}
