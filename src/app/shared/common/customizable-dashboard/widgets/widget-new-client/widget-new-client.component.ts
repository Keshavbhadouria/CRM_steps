import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-widget-new-client',
  templateUrl: './widget-new-client.component.html',
  styleUrls: ['./widget-new-client.component.scss']
})
export class WidgetNewClientComponent implements OnInit {

  newClientsData: any;
  smsData: any;
  emailData: any;
  loading: boolean = false;
  constructor(private _dashboardService: TenantDashboardService) { }

  ngOnInit(): void {
    this.getNewClientsCount();
  }
  getNewClientsCount(): void {
    this.loading = true;
    const promises = [
      this._dashboardService.getNewClients(),
      this._dashboardService.getEmailsCount(),
      this._dashboardService.getSMSCount()
    ];
    Promise.all(promises)
      .then(data => {
        this.loading = false;
        if (data.length > 0) {
          this.newClientsData = data[0].result;
          this.smsData = data[1].result;
          this.emailData = data[2].result;
        }
      });
  }
}
