import { Component, OnDestroy, OnInit } from '@angular/core';
import { HostDashboardService, TopStatsData } from 'src/app/core/services/host-dashboard.service';
import { WidgetComponentBaseComponent } from '../widget-component-base';
declare let abp: any;
@Component({
  selector: 'app-widget-host-top-stats',
  templateUrl: './widget-host-top-stats.component.html',
  styleUrls: ['./widget-host-top-stats.component.scss']
})
export class WidgetHostTopStatsComponent extends WidgetComponentBaseComponent implements OnInit, OnDestroy {

  public countoNewSubscriptionAmount = 0;
  public countoNewTenantsCount = 0;
  public countoDashboardPlaceholder1 = 0;
  public countoDashboardPlaceholder2 = 0;

  currDate = new Date();
  selectedDateRange: Date[] = [new Date(this.currDate.getFullYear(), this.currDate.getMonth(), (this.currDate.getDay() - 7)), new Date()];
  loading = true;
  topStatsData: TopStatsData;
  constructor(private _hostDashboardService: HostDashboardService) {
    super();
  }

  ngOnInit(): void {
    this.subDateRangeFilter();
    this.runDelayed(this.loadHostTopStatsData);
  }
  loadHostTopStatsData = () => {
    this._hostDashboardService.getTopStatsData(this.selectedDateRange[0], this.selectedDateRange[1]).then((data) => {
      this.topStatsData = data.result;
      this.loading = false;
    });
  }

  onDateRangeFilterChange = (dateRange) => {
    if (!dateRange || dateRange.length !== 2 || (this.selectedDateRange[0] === dateRange[0] && this.selectedDateRange[1] === dateRange[1])) {
      return;
    }

    this.selectedDateRange[0] = dateRange[0];
    this.selectedDateRange[1] = dateRange[1];
    this.runDelayed(this.loadHostTopStatsData);
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
