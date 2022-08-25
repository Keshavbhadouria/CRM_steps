import { Component, NgZone, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
declare let abp: any;
@Component({
  selector: 'app-widget-over-all-progress',
  templateUrl: './widget-over-all-progress.component.html',
  //styleUrls: ['./widget-over-all-progress.component.scss']
})
export class WidgetOverAllProgressComponent implements OnInit {

  data: number = 0;
  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone) { }

  ngOnInit(): void {
    this.registerEvents();
  }
  reload(sprintId): void {
    this._dashboardService.getOverallProgress(sprintId).then(result => {
      
      this.data = result.result;
    });
  }

  registerEvents(): void {
    let self = this;

    function onSprintChange(sprintId) {
      if (sprintId == null || sprintId == undefined) { sprintId = 0; }
      self.reload(sprintId);
    }

    abp.event.on('app.dashboardFilters.sprintChange', sprintId => {

      self._zone.run(() => {
        onSprintChange(sprintId);
      });
    });
  }
}
