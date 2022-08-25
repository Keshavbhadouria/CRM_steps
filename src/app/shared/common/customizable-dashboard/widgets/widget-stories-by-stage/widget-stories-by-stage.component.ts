import { Component, NgZone, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';
declare let abp: any;

export class StoriesByStageBarChart extends DashboardChartBase {
  chartData: any[] = [];

  scheme: any = {
    domain: []
  };

  colors: string[] = [];

  constructor(private _dashboardService: TenantDashboardService) {
    super();
  }

  init(data: any[]) {

    let formattedData = [];
    this.scheme.domain = [];
    for (let i = 0; i < data.length; i++) {
      formattedData.push({
        'name': data[i].status,
        'value': data[i].statusCount
      });
      if (data[i].hexaColor === "" || data[i].hexaColor === undefined || data[i].hexaColor === null) {
        this.scheme.domain[i] = this.colors[i];
      }
      else {
        this.scheme.domain[i] = data[i].hexaColor;
      }
    }

    this.chartData = formattedData;
  }
  reload(sprintId) {
    this.showLoading();
    this._dashboardService.getStoriesByStage(sprintId).then(data => {
      this.init(data.result);
      this.hideLoading();
    });
  }

}

@Component({
  selector: 'app-widget-stories-by-stage',
  templateUrl: './widget-stories-by-stage.component.html',
  //styleUrls: ['./widget-stories-by-stage.component.scss']
})
export class WidgetStoriesByStageComponent implements OnInit {

  storiesByStageBarChart: StoriesByStageBarChart;
  xAxisLabel : string;

  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone,
    private translate : TranslateService) {
    this.storiesByStageBarChart = new StoriesByStageBarChart(this._dashboardService);
  }

  ngOnInit(): void {
    this.registerEvents();
    this.storiesByStageBarChart.reload(0);
    this.generateRandomColor();
    this.xAxisLabel = this.translate.instant("StoriesByStage");
  }
  generateRandomColor(): void {
    for (let index = 1; index <= 20; index++) {

      if (this.storiesByStageBarChart.colors === undefined) {
        this.storiesByStageBarChart.colors = [];
      }
      else {
        this.storiesByStageBarChart.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      }
    }
  }

  registerEvents(): void {
    let self = this;

    function onSprintChange(sprintId) {
      if (sprintId == null || sprintId == undefined) { sprintId = 0; }
      self.storiesByStageBarChart.reload(sprintId);
    }

    abp.event.on('app.dashboardFilters.sprintChange', sprintId => {

      self._zone.run(() => {
        onSprintChange(sprintId);
      });
    });
  }
}
