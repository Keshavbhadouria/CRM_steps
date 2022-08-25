import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent
} from "ng-apexcharts";
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};
declare let abp: any;

@Component({
  selector: 'app-widget-story-task-bug',
  templateUrl: './widget-story-task-bug.component.html',
  //styleUrls: ['./widget-story-task-bug.component.scss']
})
export class WidgetStoryTaskBugComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>[];

  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone) { }

  ngOnInit(): void {
    this.registerEvents();
    this.reload(0);
  }

  registerEvents(): void {
    let self = this;

    function onSprintChange(sprintId) {
      if (sprintId == null || sprintId == undefined) { sprintId = 0; }
      self.reload(sprintId);
    }

    abp.event.on('app.dashboardFilters.sprintChange', sprintId => {

      self._zone.run(() => {
        onSprintChange(sprintId);
      });
    });
  }

  reload(sprintId): void {
    this._dashboardService.getStoriesTasksAndBugs(sprintId).then(result => {
      this.chartOptions = [];
      for (let index = 0; index < 3; index++) {
        if (index === 0) {
          this.chartOptions.push(this.getChartOptions(result.result.storyPercentage,"Stories"));
        }
        else if (index === 1) {
          this.chartOptions.push(this.getChartOptions(result.result.taskPercentage,"Tasks"));
        }
        else if (index === 2) {
          this.chartOptions.push(this.getChartOptions(result.result.bugPercentage,"Bugs"));
        }
      }
    });
  }

  getChartOptions(data: number, text:string): any {
    var chartOptions = {
      series: [data],
      chart: {
        type: "radialBar",
        offsetY: -20
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: true
            },
            value: {
              offsetY: -50,
              fontSize: "22px"
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        }
      },
      labels: [text]
    };

    return chartOptions;
  }

}
