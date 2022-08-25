import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';

@Component({
  selector: 'app-widget-appointments',
  templateUrl: './widget-appointments.component.html',
  styleUrls: ['./widget-appointments.component.scss']
})
export class WidgetAppointmentsComponent implements OnInit {

  loading: boolean = false;
  data: any;
  constructor(private _dashboardService: TenantDashboardService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.loading = true;
    this._dashboardService.getAppointments().then(result => {
      this.loading = false;
      if (result.success) {
        this.data = result.result;
      }
      else {
        this._messageService.showError("Appointments", "Something went wrong.");
      }

    });
  }
}
