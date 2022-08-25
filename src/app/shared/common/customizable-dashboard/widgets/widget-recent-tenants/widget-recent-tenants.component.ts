import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { GetRecentTenantsOutput, HostDashboardService } from 'src/app/core/services/host-dashboard.service';
import { environment } from 'src/environments/environment';
import { WidgetComponentBaseComponent } from '../widget-component-base';

@Component({
  selector: 'app-widget-recent-tenants',
  templateUrl: './widget-recent-tenants.component.html',
  styleUrls: ['./widget-recent-tenants.component.scss']
})
export class WidgetRecentTenantsComponent extends WidgetComponentBaseComponent {
  primengTableHelper:PrimengTableHelper = new PrimengTableHelper();

  @ViewChild('RecentTenantsTable', { static: true }) recentTenantsTable: Table;

  constructor(private _hostDashboardService: HostDashboardService) { 
    super();
    this.loadRecentTenantsData();
  }

  loading = true;

  recentTenantsData: GetRecentTenantsOutput;

  loadRecentTenantsData() {
    this._hostDashboardService.getRecentTenantsData().then((data) => {
      this.recentTenantsData = data;
      this.loading = false;
    });
  }

  gotoAllRecentTenants(): void {
    window.open(environment.frontEndURL + 'app/admin/tenants?' +
      'creationDateStart=' + this.recentTenantsData.tenantCreationStartDate);
  }

}
