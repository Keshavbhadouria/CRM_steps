import { Component, OnInit } from '@angular/core';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
import { DashboardChartBase } from '../dashboard-chart-base';
import { WidgetComponentBaseComponent } from '../widget-component-base';


class MemberActivityTable extends DashboardChartBase {

  memberActivities: Array<any>;

  constructor(private _dashboardService: TenantDashboardService) {
    super();
  }

  init() {
    this.reload();
  }

  reload() {
    this.showLoading();
    this._dashboardService
      .getMemberActivity()
      .then(result => {
        this.memberActivities = result.result.memberActivities;
        this.hideLoading();
      });
  }
}

@Component({
  selector: 'app-widget-member-activity',
  templateUrl: './widget-member-activity.component.html',
  styleUrls: ['./widget-member-activity.component.scss']
})
export class WidgetMemberActivityComponent extends WidgetComponentBaseComponent implements OnInit {
  memberActivityTable: MemberActivityTable;

  constructor(private _dashboardService: TenantDashboardService) { 
    super();
    this.memberActivityTable = new MemberActivityTable(this._dashboardService);
  }

  ngOnInit() {
    this.memberActivityTable.init();
  }

}
