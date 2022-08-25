import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-widget-sms-count',
  templateUrl: './widget-sms-count.component.html',
  styleUrls: ['./widget-sms-count.component.scss']
})
export class WidgetSmsCountComponent implements OnInit {
  data: any;
  constructor(private _dashboardService: TenantDashboardService) { }

  ngOnInit(): void {
    this.getSMSCount();
  }
  getSMSCount(): void {
    this._dashboardService.getSMSCount().then(result => {
      this.data = result.result;
    });
  }
}
