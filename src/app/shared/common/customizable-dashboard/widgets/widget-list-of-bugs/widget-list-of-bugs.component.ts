import { Component, NgZone, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
declare let abp: any;
@Component({
  selector: 'app-widget-list-of-bugs',
  templateUrl: './widget-list-of-bugs.component.html',
  //styleUrls: ['./widget-list-of-bugs.component.scss']
})
export class WidgetListOfBugsComponent implements OnInit {

  data: any[] = [];
  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone) { }

  ngOnInit(): void {
    this.registerEvents();
  }

  reload(sprintId): void {
    this._dashboardService.getListOfBugs(sprintId).then(result => {
      
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
