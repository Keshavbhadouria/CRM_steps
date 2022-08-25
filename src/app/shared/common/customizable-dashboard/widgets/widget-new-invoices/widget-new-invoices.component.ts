import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-widget-new-invoices',
  templateUrl: './widget-new-invoices.component.html',
  styleUrls: ['./widget-new-invoices.component.scss']
})
export class WidgetNewInvoicesComponent implements OnInit {
  data: any;
  constructor(private _dashboardService: TenantDashboardService) { }

  ngOnInit(): void {
    this.getNewInvoices();
  }
  getNewInvoices(): void {
    this._dashboardService.getNewInvoices().then(result => {
      this.data = result.result;
    });
  }
}
