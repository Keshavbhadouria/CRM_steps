import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-widget-last-twenty-estimates',
  templateUrl: './widget-last-twenty-estimates.component.html',
  styleUrls: ['./widget-last-twenty-estimates.component.scss']
})
export class WidgetLastTwentyEstimatesComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();

  constructor(private _dashboardService: TenantDashboardService) { }

  ngOnInit(): void {
    this.getLast20Estimates();
  }
  getLast20Estimates(event?: LazyLoadEvent) {

    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._dashboardService.getLast20Estimates(
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }
}
