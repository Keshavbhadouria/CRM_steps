import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectRolesService } from 'src/app/core/services/project-roles.service';

@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.scss']
})
export class TeamMemberDetailComponent implements OnInit {
  @Input() data: any;
  @Output() $removeItem = new EventEmitter();
  @Input() pmRoles: any[];
  constructor(private _projectRoleService: ProjectRolesService) { }
  roleId = 0;
  loading = false;

  ngOnInit(): void {
    this.roleId = this.data.abpRoleId;
  }

  setRole() {
    this.data.abpRoleId = this.roleId;
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
