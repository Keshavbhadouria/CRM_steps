import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { GetExpiringTenantsOutput, HostDashboardService } from 'src/app/core/services/host-dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-widget-subscription-expiring-tenants',
  templateUrl: './widget-subscription-expiring-tenants.component.html',
  styleUrls: ['./widget-subscription-expiring-tenants.component.scss']
})
export class WidgetSubscriptionExpiringTenantsComponent implements OnInit {
  primengTableHelper:PrimengTableHelper = new PrimengTableHelper();

  @ViewChild('ExpiringTenantsTable', { static: true }) expiringTenantsTable: Table;

  dataLoading = true;
  expiringTenantsData: GetExpiringTenantsOutput;

  constructor( private _hostDashboardService: HostDashboardService) { }

  ngOnInit(): void {
    this.primengTableHelper = new PrimengTableHelper();
    
    this.getData();
  }
  getData() {
    this._hostDashboardService.getSubscriptionExpiringTenantsData().then((data) => {
      this.expiringTenantsData = data.result;
      this.dataLoading = false;
    });
  }
  gotoAllExpiringTenants(): void {
    const url = environment.frontEndURL +
      'app/admin/tenants?' +
      'subscriptionEndDateStart=' +
      this.expiringTenantsData.subscriptionEndDateStart +
      '&' +
      'subscriptionEndDateEnd=' +
      this.expiringTenantsData.subscriptionEndDateEnd;

    window.open(url);
  }
}
