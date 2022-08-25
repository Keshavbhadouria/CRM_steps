import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-audit-log-view',
  templateUrl: './audit-log-view.component.html',
  styleUrls: ['./audit-log-view.component.scss']
})
export class AuditLogViewComponent implements OnInit {
  constructor() { }
  auditLog: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.auditLog = this.data;
  }
  getExecutionTime(): string {
    const self = this;
    return moment(self.auditLog.executionTime).fromNow() + ' (' + moment(self.auditLog.executionTime).format('YYYY-MM-DD HH:mm:ss') + ')';
}

getDurationAsMs(): string {
    const self = this;
    return self.auditLog.executionDuration;
}

getFormattedParameters(): string {
    const self = this;
    try {
        const json = JSON.parse(self.auditLog.parameters);
        return JSON.stringify(json, null, 4);
    } catch (e) {
        return self.auditLog.parameters;
    }
}
}
