import { Component, NgZone, OnInit } from '@angular/core';
import { HostDashboardService } from 'src/app/core/services/host-dashboard.service';

@Component({
  selector: 'app-widget-last-fifty-members',
  templateUrl: './widget-last-fifty-members.component.html',
  //styleUrls: ['./widget-last-fifty-members.component.scss']
})
export class WidgetLastFiftyMembersComponent implements OnInit {

  data: any;
  constructor(private _dashboardService: HostDashboardService,
    public _zone: NgZone) { }

  ngOnInit(): void {
    this.reload();
  }
  reload(): void {
    this._dashboardService.getLast50Members().then(result => {
      this.data = result.result;
    });
  }
}
