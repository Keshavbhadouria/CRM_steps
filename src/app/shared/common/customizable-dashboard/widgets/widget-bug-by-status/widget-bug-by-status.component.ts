import { Component, NgZone, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';
declare let abp: any;

export class BugByStatusPieChart extends DashboardChartBase {
  chartData: any[] = [];

  scheme: any = {
    domain: []
  };

  colors : string[] = [];

  constructor(private _dashboardService: TenantDashboardService) {
    super();
  }

  init(data: any[]) {

    let formattedData = [];
    this.scheme.domain = [];
    for (let i = 0; i < data.length; i++) {
      formattedData.push({
        'name': data[i].statusName,
        'value': data[i].statusCount
      });
      if(data[i].hexaColor === "" || data[i].hexaColor === undefined || data[i].hexaColor === null){
        this.scheme.domain[i] = this.colors[i];
      }
      else{
        this.scheme.domain[i] = data[i].hexaColor;
      }
    }

    this.chartData = formattedData;
  }
  reload(sprintId) {
    this.showLoading();
    this._dashboardService.getBugsByStatus(sprintId).then(data => {
      this.init(data.result);
      this.hideLoading();
    });
  }
}


@Component({
  selector: 'app-widget-bug-by-status',
  templateUrl: './widget-bug-by-status.component.html',
  styleUrls: ['./widget-bug-by-status.component.scss']
})
export class WidgetBugByStatusComponent implements OnInit {

  bugByStatusPieChart: BugByStatusPieChart;

  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone) {
    this.bugByStatusPieChart = new BugByStatusPieChart(this._dashboardService);
  }

  ngOnInit(): void {
    this.registerEvents();
    this.bugByStatusPieChart.reload(0);
    this.generateRandomColor();
  }

  generateRandomColor():void{
    for (let index = 1; index <= 20; index++) {
       
      if(this.bugByStatusPieChart.colors === undefined){
        this.bugByStatusPieChart.colors = [];
      }
      else{
        this.bugByStatusPieChart.colors.push('#' + Math.floor(Math.random()*16777215).toString(16));
      }
    }
  }

  registerEvents(): void {
    let self = this;

    function onSprintChange(sprintId) {
      if (sprintId == null || sprintId == undefined) { sprintId = 0; }
      self.bugByStatusPieChart.reload(sprintId);
    }

    abp.event.on('app.dashboardFilters.sprintChange', sprintId => {

      self._zone.run(() => {
        onSprintChange(sprintId);
      });
    });
  }
}
