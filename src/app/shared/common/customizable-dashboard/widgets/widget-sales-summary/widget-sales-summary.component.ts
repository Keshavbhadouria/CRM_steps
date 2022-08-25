import { Component, OnInit } from '@angular/core';
import { SalesSummaryDatePeriod, TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';
import * as _ from 'lodash';
import { WidgetComponentBaseComponent } from '../widget-component-base';
declare let abp: any;

class SalesSummaryChart extends DashboardChartBase {
  totalSales = 0; totalSalesCounter = 0;
  revenue = 0; revenuesCounter = 0;
  expenses = 0; expensesCounter = 0;
  growth = 0; growthCounter = 0;

  selectedDatePeriod: SalesSummaryDatePeriod;

  data = [];

  constructor(
    private _dashboardService: TenantDashboardService) {
    super();
  }

  init(salesSummaryData, totalSales, revenue, expenses, growth) {
    this.totalSales = totalSales;
    this.totalSalesCounter = totalSales;

    this.revenue = revenue;
    this.expenses = expenses;
    this.growth = growth;

    this.setChartData(salesSummaryData);

    this.hideLoading();
  }

  setChartData(items): void {
    let sales = [];
    let profit = [];

    _.forEach(items, (item) => {

      sales.push({
        'name': item['period'],
        'value': item['sales']
      });

      profit.push({
        'name': item['period'],
        'value': item['profit']
      });
    });

    this.data = [
      {
        'name': 'Sales',
        'series': sales
      }, {
        'name': 'Profit',
        'series': profit
      }
    ];
  }

  reload(datePeriod) {
    if (this.selectedDatePeriod === datePeriod) {
      this.hideLoading();
      return;
    }

    this.selectedDatePeriod = datePeriod;

    this.showLoading();
    this._dashboardService
      .getSalesSummary(datePeriod)
      .then(result => {
        this.setChartData(result.result.salesSummary);
        this.hideLoading();
      });
  }
}

@Component({
  selector: 'app-widget-sales-summary',
  templateUrl: './widget-sales-summary.component.html',
  styleUrls: ['./widget-sales-summary.component.scss']
})
export class WidgetSalesSummaryComponent extends WidgetComponentBaseComponent implements OnInit {

  salesSummaryChart: SalesSummaryChart;
  appSalesSummaryDateInterval = SalesSummaryDatePeriod;

  constructor(private _tenantDashboardService: TenantDashboardService) {
    super();
    this.salesSummaryChart = new SalesSummaryChart(this._tenantDashboardService);
  }

  ngOnInit(): void {
    this.subDateRangeFilter();

    this.runDelayed(() => {
      this.salesSummaryChart.reload(SalesSummaryDatePeriod.Daily);
    });
  }
  onDateRangeFilterChange = (dateRange) => {
    
    this.runDelayed(() => {
      this.salesSummaryChart.reload(SalesSummaryDatePeriod.Daily);
    });
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
