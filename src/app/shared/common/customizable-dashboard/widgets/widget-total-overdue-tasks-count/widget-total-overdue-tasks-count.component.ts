import { Component, NgZone, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';
declare let abp: any;

export class TotalOverDueTaskNumberChart extends DashboardChartBase {
  chartData: any[] = [];

  scheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  colors: string[] = [];
  constructor(private _dashboardService: TenantDashboardService) {
    super();
  }

  init(data: any) {

    let formattedData = [];
    formattedData.push({
      'name': "Task Overdue",
      'value': data
    });

    this.chartData = formattedData;
  }
  reload(sprintId) {
    this.showLoading();
    this._dashboardService.getOverdueTasksCount(sprintId).then(data => {
      this.init(data.result);
      this.hideLoading();
    });
  }
}

@Component({
  selector: 'app-widget-total-overdue-tasks-count',
  templateUrl: './widget-total-overdue-tasks-count.component.html',
  //styleUrls: ['./widget-total-overdue-tasks-count.component.scss']
})
export class WidgetTotalOverdueTasksCountComponent implements OnInit {
  totalOverDueTaskNumberChart: TotalOverDueTaskNumberChart;
  cardColor = "#232837";


  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone) {
    this.totalOverDueTaskNumberChart = new TotalOverDueTaskNumberChart(this._dashboardService);
  }

  ngOnInit(): void {
    this.registerEvents();
    this.totalOverDueTaskNumberChart.reload(0);
  }

  registerEvents(): void {
    let self = this;

    function onSprintChange(sprintId) {
      if (sprintId == null || sprintId == undefined) { sprintId = 0; }
      self.totalOverDueTaskNumberChart.reload(sprintId);
    }

    abp.event.on('app.dashboardFilters.sprintChange', sprintId => {

      self._zone.run(() => {
        onSprintChange(sprintId);
      });
    });
  }
}
