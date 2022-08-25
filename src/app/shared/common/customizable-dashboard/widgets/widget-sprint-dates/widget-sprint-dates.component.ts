import { Component, NgZone, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
declare let abp: any;
@Component({
  selector: 'app-widget-sprint-dates',
  templateUrl: './widget-sprint-dates.component.html',
  //styleUrls: ['./widget-sprint-dates.component.scss']
})
export class WidgetSprintDatesComponent implements OnInit {

  data: any[] = ["","",""];
  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone) { }

  ngOnInit(): void {
    this.registerEvents();
  }
  reload(sprintId): void {
    this._dashboardService.getSprintDates(sprintId).then(result => {
      
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
