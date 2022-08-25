import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceTeamMemberService } from 'src/app/core/services/service-team-member.service';

@Component({
  selector: 'app-service-team-member-detail',
  templateUrl: './service-team-member-detail.component.html',
  styleUrls: ['./service-team-member-detail.component.scss']
})
export class ServiceTeamMemberDetailComponent implements OnInit {
  @Input() data: any;
  @Output() $removeItem = new EventEmitter();
  @Input() roles: any[];

  constructor() { }
  roleId = 0;
  loading = false;

  ngOnInit(): void {
    debugger;
    this.roleId = this.data.roleId;
  }

  setRole() {

    this.data.roleId = this.roleId;
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  removeItem() {
    this.$removeItem.emit();
  }

}
