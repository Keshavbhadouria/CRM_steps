import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-widget-emails-count',
  templateUrl: './widget-emails-count.component.html',
  styleUrls: ['./widget-emails-count.component.scss']
})
export class WidgetEmailsCountComponent implements OnInit {

  data: any;
  constructor(private _dashboardService: TenantDashboardService) { }

  ngOnInit(): void {
    this.getEmailsCount();
  }
  getEmailsCount(): void {
    this._dashboardService.getEmailsCount().then(result => {
      this.data = result.result;
    });
  }
}
