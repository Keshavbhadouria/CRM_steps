import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDateInterval, HostDashboardService } from 'src/app/core/services/host-dashboard.service';
import { WidgetComponentBaseComponent } from '../widget-component-base';
import * as _ from 'lodash';
declare let abp: any;

@Component({
  selector: 'app-widget-income-statistics',
  templateUrl: './widget-income-statistics.component.html',
  styleUrls: ['./widget-income-statistics.component.scss']
})
export class WidgetIncomeStatisticsComponent extends WidgetComponentBaseComponent implements OnInit, OnDestroy {

  selectedIncomeStatisticsDateInterval = ChartDateInterval.Daily;
  loadingIncomeStatistics = true;

  currDate = new Date();
  selectedDateRange: Date[] = [new Date(this.currDate.getFullYear(), this.currDate.getMonth(), (this.currDate.getDay() - 7)), new Date()];
  incomeStatisticsData: any = [];
  incomeStatisticsHasData = false;
  appIncomeStatisticsDateInterval = ChartDateInterval;

  constructor(private _hostDashboardService: HostDashboardService) {
    super();
  }

  ngOnInit() {
    this.subDateRangeFilter();
    this.runDelayed(this.loadIncomeStatisticsData);
  }

  incomeStatisticsDateIntervalChange(interval: number) {
    if (this.selectedIncomeStatisticsDateInterval === interval) {
      return;
    }

    this.selectedIncomeStatisticsDateInterval = interval;
    this.loadIncomeStatisticsData();
  }

  loadIncomeStatisticsData = () => {
    this.loadingIncomeStatistics = true;
    this._hostDashboardService.getIncomeStatistics(
      this.selectedIncomeStatisticsDateInterval,
      this.selectedDateRange[0],
      this.selectedDateRange[1])
      .then(result => {
        this.incomeStatisticsData = this.normalizeIncomeStatisticsData(result.result.incomeStatistics);
        this.incomeStatisticsHasData = _.filter(this.incomeStatisticsData[0].series, data => data.value > 0).length > 0;
        this.loadingIncomeStatistics = false;
      });
  }

  normalizeIncomeStatisticsData(data): any {
    const chartData = [];
    for (let i = 0; i < data.length; i++) {
      chartData.push({
        'name': data[i].date,
        'value': data[i].amount
      });
    }

    return [{
      name: '',
      series: chartData
    }];
  }

  onDateRangeFilterChange = (dateRange) => {
    if (!dateRange || dateRange.length !== 2 || (this.selectedDateRange[0] === dateRange[0] && this.selectedDateRange[1] === dateRange[1])) {
      return;
    }

    this.selectedDateRange[0] = dateRange[0];
    this.selectedDateRange[1] = dateRange[1];
    this.runDelayed(this.loadIncomeStatisticsData);
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
