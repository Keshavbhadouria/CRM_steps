import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GetEditionTenantStatisticsOutput, HostDashboardService } from 'src/app/core/services/host-dashboard.service';
import { WidgetComponentBaseComponent } from '../widget-component-base';
import * as _ from 'lodash';
declare let abp: any;


@Component({
  selector: 'app-widget-edition-statistics',
  templateUrl: './widget-edition-statistics.component.html',
  styleUrls: ['./widget-edition-statistics.component.scss']
})
export class WidgetEditionStatisticsComponent extends WidgetComponentBaseComponent implements OnInit, OnDestroy {

  @ViewChild('EditionStatisticsChart', { static: true }) editionStatisticsChart: ElementRef;

  currDate = new Date();
  selectedDateRange: Date[] = [new Date(this.currDate.getFullYear(), this.currDate.getMonth(), (this.currDate.getDay() - 7)), new Date()];


  editionStatisticsHasData = false;
  editionStatisticsData;

  constructor(private _hostDashboardService: HostDashboardService) {
    super();
  }

  ngOnInit(): void {
    this.subDateRangeFilter();
    this.runDelayed(this.showChart);
  }
  showChart = () => {
    this._hostDashboardService.getEditionTenantStatistics(this.selectedDateRange[0], this.selectedDateRange[1])
      .them((editionTenantStatistics) => {
        this.editionStatisticsData = this.normalizeEditionStatisticsData(editionTenantStatistics.result);
        this.editionStatisticsHasData = _.filter(this.editionStatisticsData, data => data.value > 0).length > 0;
      });
  }

  normalizeEditionStatisticsData(data: GetEditionTenantStatisticsOutput): Array<any> {
    if (!data || !data.editionStatistics || data.editionStatistics.length === 0) {
      return [];
    }

    const chartData = new Array(data.editionStatistics.length);

    for (let i = 0; i < data.editionStatistics.length; i++) {
      chartData[i] = {
        name: data.editionStatistics[i].label,
        value: data.editionStatistics[i].value
      };
    }

    return chartData;
  }

  onDateRangeFilterChange = (dateRange) => {
    if (!dateRange || dateRange.length !== 2 || (this.selectedDateRange[0] === dateRange[0] && this.selectedDateRange[1] === dateRange[1])) {
      return;
    }

    this.selectedDateRange[0] = dateRange[0];
    this.selectedDateRange[1] = dateRange[1];
    this.runDelayed(this.showChart);
  }

  subDateRangeFilter() {
    abp.event.on('app.dashboardFilters.dateRangePicker.onDateChange', this.onDateRangeFilterChange);
  }

  unSubDateRangeFilter() {
    abp.event.off('app.dashboardFilters.dateRangePicker.onDateChange', this.onDateRangeFilterChange);
  }

  ngOnDestroy(): void {
    this.unSubDateRangeFilter();
  }
}
