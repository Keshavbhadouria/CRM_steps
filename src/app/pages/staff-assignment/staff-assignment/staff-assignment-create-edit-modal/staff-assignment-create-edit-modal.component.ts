import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactAssignLawyerParalegalDTO, CreateOrEditContactAssignParalegalDto } from 'src/app/core/models/StaffAssignment/StaffAssignment';
import { MessageService } from 'src/app/core/services/message.service';
import { StaffAssignmentService } from 'src/app/core/services/staff-assignment.service';

@Component({
  selector: 'app-staff-assignment-create-edit-modal',
  templateUrl: './staff-assignment-create-edit-modal.component.html',
  styleUrls: ['./staff-assignment-create-edit-modal.component.scss']
})
export class StaffAssignmentCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  selectedParalegals: any[] = [];



  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  contactAssignParalegal: CreateOrEditContactAssignParalegalDto = new CreateOrEditContactAssignParalegalDto();
  allContacts: DropdownDto[];
  allUsers: DropdownDto[];
  allLawyers: DropdownDto[];
  allParalegals: DropdownDto[];
  obj: ContactAssignLawyerParalegalDTO  = new ContactAssignLawyerParalegalDTO();

  constructor(private _staffAssignmentService: StaffAssignmentService, private _messageService: MessageService, private modalService: NgbModal) {
    this.loadDropDown();
   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Epic' }, { label: 'Create Epic Status', active: true }];
    if (this.data) {
      this.showCreateEditLoader()
      this.contactAssignParalegal = this.data.contactAssignParalegal;
      this._staffAssignmentService.getContactAssignParalegalForCustomEdit(this.contactAssignParalegal.id).then(result => {
        this.hideCreateEditLoader()
        let list = result.result.list;
        if (list.length > 0) {
          let arr = [];
          list.forEach(x => {
            arr.push(x.id);
          });
          this.selectedParalegals = arr;
        }
    });
    }
    else {
      this.contactAssignParalegal = new CreateOrEditContactAssignParalegalDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.contactAssignParalegal) {
        this.obj.id = this.contactAssignParalegal.id;
        this.obj.userId = this.contactAssignParalegal.userId;
        this.obj.contactId = this.contactAssignParalegal.contactId;
        this.obj.paralegalIds = this.selectedParalegals;
      
      this._staffAssignmentService.createOrEdit(this.obj).then(res => {
        if (res.success) {
          this.hideCreateEditLoader();
          this.$modalClose.emit(true);
        } else {
          this.hideCreateEditLoader();
          this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
      });
    }

  }


  loadDropDown() {
    this.showLoader();
    const promises = [
      this._staffAssignmentService.getAllContactForTableDropdown(),
      this._staffAssignmentService.getAllLawyersForTableDropdown(),
      this._staffAssignmentService.getAllParalegalForTableDropdown(),
      this._staffAssignmentService.getAllUserForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allContacts = data[0].result;
          this.allLawyers = data[1].result;
          this.allParalegals = data[2].result;
          this.allUsers = data[3].result;
        }
        this.hideLoader();
      });
  }



  //#endregion


  //#region Helper Methods


  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}
