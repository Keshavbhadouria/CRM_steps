import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-widget-income',
  templateUrl: './widget-income.component.html',
  styleUrls: ['./widget-income.component.scss']
})
export class WidgetIncomeComponent implements OnInit {
  data: any;
  constructor(private _dashboardService: TenantDashboardService) { }

  ngOnInit(): void {
    this.getIncomeDetails();
  }
  getIncomeDetails(): void {
    this._dashboardService.getIncomeDetails().then(result => {
      this.data = result.result;
    });
  }
}
