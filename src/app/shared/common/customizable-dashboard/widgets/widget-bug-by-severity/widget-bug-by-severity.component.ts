import { Component, NgZone, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';
declare let abp: any;

export class BugBySeverityPieChart extends DashboardChartBase {
  chartData: any[] = [];

  scheme: any = {
    domain: [
      '#FF0000', '#FFA500', '#FFFF00'
    ]
  };

  constructor(private _dashboardService: TenantDashboardService) {
    super();
  }

  init(data: any[]) {

    let formattedData = [];
    for (let i = 0; i < data.length; i++) {
      formattedData.push({
        'name': data[i].severityName,
        'value': data[i].severityCount
      });
    }

    this.chartData = formattedData;
  }
  reload(sprintId) {
    this.showLoading();
    this._dashboardService.getBugsBySeverity(sprintId).then(data => {
      this.init(data.result);
      this.hideLoading();
    });
  }
}

@Component({
  selector: 'app-widget-bug-by-severity',
  templateUrl: './widget-bug-by-severity.component.html',
  styleUrls: ['./widget-bug-by-severity.component.scss']
})
export class WidgetBugBySeverityComponent implements OnInit {

  bugBySeverityPieChart: BugBySeverityPieChart;
  constructor(
    private _dashboardService: TenantDashboardService,
    public _zone: NgZone
  ) {
    this.bugBySeverityPieChart = new BugBySeverityPieChart(this._dashboardService);
  }

  ngOnInit(): void {
    this.registerEvents();
    this.bugBySeverityPieChart.reload(0);
  }
  registerEvents(): void {
    let self = this;

    function onSprintChange(sprintId) {
      if (sprintId == null || sprintId == undefined) { sprintId = 0; }
      self.bugBySeverityPieChart.reload(sprintId);
    }

    abp.event.on('app.dashboardFilters.sprintChange', sprintId => {

      self._zone.run(() => {
        onSprintChange(sprintId);
      });
    });
  }
}
