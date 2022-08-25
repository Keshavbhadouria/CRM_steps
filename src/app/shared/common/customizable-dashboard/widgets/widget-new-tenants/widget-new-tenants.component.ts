import { Component, NgZone, OnInit } from '@angular/core';
import { HostDashboardService } from 'src/app/core/services/host-dashboard.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-widget-new-tenants',
  templateUrl: './widget-new-tenants.component.html',
  styleUrls: ['./widget-new-tenants.component.scss']
})
export class WidgetNewTenantsComponent implements OnInit {

  data: any;
  loading : boolean = false;
  constructor(private _dashboardService: HostDashboardService,
    public _zone: NgZone,
    private _messageService : MessageService) { }

  ngOnInit(): void {
    //this.registerEvents();
    this.reload();
  }

  reload(): void {
    this.loading = true;
    this._dashboardService.getNewTenants().then(result => {
      this.loading = false;
      if(result.success){
        this.data = result.result;
      }
      else{
        this._messageService.showError("New Tenants","Something went wrong");
      }
      
    });
  }
}
