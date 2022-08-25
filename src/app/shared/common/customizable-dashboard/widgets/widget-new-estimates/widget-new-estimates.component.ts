import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-widget-new-estimates',
  templateUrl: './widget-new-estimates.component.html',
  styleUrls: ['./widget-new-estimates.component.scss']
})
export class WidgetNewEstimatesComponent implements OnInit {
  newEstimateData: any;
  invoiceData: any;
  incomeData: any;
  loading: boolean = false;
  constructor(private _dashboardService: TenantDashboardService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.getNewEstimates();
  }
  getNewEstimates(): void {
    this.loading = true;
    const promises = [
      this._dashboardService.getNewEstimates(),
      this._dashboardService.getNewInvoices(),
      this._dashboardService.getIncomeDetails()
    ];
    Promise.all(promises)
      .then(data => {
        this.loading = false;
        if (data.length > 0) {
          this.newEstimateData = data[0].result;
          this.invoiceData = data[1].result;
          this.incomeData = data[2].result;
        }
      });
  }
}
