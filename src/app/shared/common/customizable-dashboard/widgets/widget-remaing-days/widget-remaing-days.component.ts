import { Component, NgZone, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
declare let abp: any;
@Component({
  selector: 'app-widget-remaing-days',
  templateUrl: './widget-remaing-days.component.html',
  styleUrls: ['./widget-remaing-days.component.scss']
})
export class WidgetRemaingDaysComponent implements OnInit {

  data: any;
  widColor: string = '';
  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone) { }

  ngOnInit(): void {
    this.registerEvents();
  }
  reload(sprintId): void {
    this._dashboardService.getRemainingDays(sprintId).then(result => {
      
      this.data = result.result;
      if(this.data.progress < 60){
        this.widColor = "red";
      }
      else if(this.data.progress > 60 && this.data.progress < 80){
        this.widColor = "orange";
      }
      else{
        this.widColor = "green";
      }
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
