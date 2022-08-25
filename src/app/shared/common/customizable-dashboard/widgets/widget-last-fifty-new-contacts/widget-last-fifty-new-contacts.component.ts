import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from 'src/app/core/helpers/PrimengTableHelper';
import { TenantDashboardService } from 'src/app/core/services/tenant-dashboard.service';
declare let abp: any;
@Component({
  selector: 'app-widget-last-fifty-new-contacts',
  templateUrl: './widget-last-fifty-new-contacts.component.html',
  styleUrls: ['./widget-last-fifty-new-contacts.component.scss']
})
export class WidgetLastFiftyNewContactsComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  startDate: any;
  endDate: any;

  primengTableHelper: PrimengTableHelper = new PrimengTableHelper();

  constructor(private _dashboardService: TenantDashboardService,
    public _zone: NgZone) {
    //this.primengTableHelper.defaultRecordsCountPerPage = 50;
  }

  ngOnInit(): void {
    //this.registerEvents();
    this.getLast50NewContacts();
  }

  registerEvents(): void {
    let self = this;

    function onSprintChange(dates) {

      self.startDate = dates.start;
      self.endDate = dates.end;
      self.getLast50NewContacts();
    }

    abp.event.on('app.dashboardFilters.datesChange', (obj) => {

      self._zone.run(() => {

        onSprintChange(obj);
      });
    });
  }


  getLast50NewContacts(event?: LazyLoadEvent) {
    
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();
    
    this._dashboardService.getLast50NewContacts(
      this.startDate === undefined ? undefined : (typeof this.startDate === 'string' ? this.startDate : this.startDate.toLocaleDateString()),
      this.endDate === undefined ? undefined : (typeof this.endDate === 'string' ? this.endDate : this.endDate.toLocaleDateString()),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).then(result => {
      this.primengTableHelper.totalRecordsCount = result.result.totalCount;
      this.primengTableHelper.records = result.result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }
}
