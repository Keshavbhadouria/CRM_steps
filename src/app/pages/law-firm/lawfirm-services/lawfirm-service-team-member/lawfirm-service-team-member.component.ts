import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ServiceTeamMemberService } from 'src/app/core/services/service-team-member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lawfirm-service-team-member',
  templateUrl: './lawfirm-service-team-member.component.html',
  styleUrls: ['./lawfirm-service-team-member.component.scss']
})
export class LawfirmServiceTeamMemberComponent implements OnInit {

  @Input() data;
  @Input() public modal: any
  @Output() $modalClose = new EventEmitter();
  loading = false;
  createLoader = false;
  allUsers: DropdownDto[];
  userSelected;
  roles = [];
  teamMembers: any[] = [];

  constructor(private _serviceTeamMember: ServiceTeamMemberService) { }

  ngOnInit(): void {
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._serviceTeamMember.getAllUserForTableDropdown(),
      this._serviceTeamMember.getAllByServiceId(this.data.lawfirmService.id),
      this._serviceTeamMember.getAllRoleForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allUsers = data[0].result;
          this.teamMembers = data[1].result;
          this.roles = data[2].result;
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
      "hoursLimit": 0,
      "lawfirmServiceId": this.data.lawfirmService.id,
      "roleId": 0
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
    debugger;
    if (this.teamMembers.filter(x => x.roleId == 0).length) {
      Swal.fire('Role is required!');
      return;
    }

    this.showLoader();

    this._serviceTeamMember.createOrEditAll(this.teamMembers)
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
            this._serviceTeamMember.delete(item.id).then(res => {
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
