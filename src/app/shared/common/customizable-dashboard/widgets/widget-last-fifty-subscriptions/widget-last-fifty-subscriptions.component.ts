import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { HostDashboardService } from 'src/app/core/services/host-dashboard.service';

@Component({
  selector: 'app-widget-last-fifty-subscriptions',
  templateUrl: './widget-last-fifty-subscriptions.component.html',
  //styleUrls: ['./widget-last-fifty-subscriptions.component.scss']
})
export class WidgetLastFiftySubscriptionsComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  
  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();
  
  constructor(private _dashboardService: HostDashboardService) {
    // this.primengTableHelper.defaultRecordsCountPerPage = 50;
  }

  ngOnInit(): void {
    this.getLast50Subscriptions();
  }

  getLast50Subscriptions(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._dashboardService.getAll(
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }


}
