import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ProjectRolesService } from 'src/app/core/services/project-roles.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { ProjectService } from 'src/app/core/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-members-modal',
  templateUrl: './team-members-modal.component.html',
  styleUrls: ['./team-members-modal.component.scss']
})
export class TeamMembersModalComponent implements OnInit {
  @Input() data: any;
  @Input() public modal: any
  @Output() $modalClose = new EventEmitter();

  loading = false;
  createLoader = false;
  allUsers: DropdownDto[];
  userSelected;
  pmRoles = [];
  teamMembers: any[];

  constructor(
    private _projectService: ProjectService,
    private _projectTeamMembserService: ProjectTeamService,
    private _projectRoleService: ProjectRolesService
  ) { }

  ngOnInit(): void {
    this.teamMembers = [];
    this.loadDropDown();
  }

  loadDropDown() {
    this.showLoader();

    const promises = [
      this._projectService.getAllUserForTableDropdown(),
      this._projectTeamMembserService.getAllByProject(this.data.pmProject.id),
      this._projectRoleService.getAllPMRoles()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allUsers = data[0].result;
          this.teamMembers = data[1].result;
          this.pmRoles = data[2].result;
        }
        this.hideLoader();
      });
  }

  addMember() {

    var existingMember = this.teamMembers.filter(x => x.userId == this.userSelected);
    if (existingMember.length > 0) {
      Swal.fire('Member already exists!');
      return;
    }

    var user = this.allUsers.filter(x => x.id == this.userSelected)[0];
    
    this.teamMembers.push({
      "userId": user.id,
      "userName": user.displayName,
      "pmRoleId": 0,
      "hoursLimit": 0,
      "pmProjectId": this.data.pmProject.id,
      "abpRoleId": 0
    });

    this.userSelected = 0;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  save() {

    if (this.teamMembers.filter(x => x.abpRoleId == 0).length) {
      Swal.fire('Role is required!');
      return;
    }

    this.showLoader();

    this._projectTeamMembserService.createOrEditAll(this.teamMembers)
      .then(res => {
        this.hideLoader();
        if (res.success) {
          this.$modalClose.emit(true);
        } else {
          this.hideLoader();
        }
      },
        (error) => { this.hideLoader(); }
      );
  }

  removeItem(index) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {

          var item = this.teamMembers[index];

          if (item.id == null) {
            this.teamMembers.splice(index, 1);
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
          }
          else {
            this.showLoader();
            this._projectTeamMembserService.delete(item.id).then(res => {
              this.hideLoader();
              if (res.success) {
                this.teamMembers.splice(index, 1);
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your record has been deleted.',
                  'success'
                );
              } else {

              }
            });
          }
        }
      });
  }

}
