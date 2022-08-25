import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditContactPhoneCallHistoryDto, PhoneCallsService } from 'src/app/core/services/phone-calls.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-or-edit-phone-call-modal',
  templateUrl: './create-or-edit-phone-call-modal.component.html',
  // styleUrls: ['./create-or-edit-phone-call-modal.component.scss']
})
export class CreateOrEditPhoneCallModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  phoneCall: CreateOrEditContactPhoneCallHistoryDto;
  loading = false;
  createLoader = false;

  contacts: DropdownDto[];
  users: DropdownDto[];
  phoneCallObjectives: DropdownDto[];
  contactPhoneCalloutcomes: DropdownDto[];
  businessActionScripts: DropdownDto[];
  nextPhoneCallObjectives: DropdownDto[];
  callAgainTimeStr:any;

  public editor = ClassicEditor;

  constructor(private _phoneCallService: PhoneCallsService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.phoneCall = this.data;

      this.callAgainTimeStr = this.phoneCall.callAgainTime.toString();
      this.phoneCall.callAgainTime = this.callAgainTimeStr;
    }
    else {
      this.phoneCall = new CreateOrEditContactPhoneCallHistoryDto();
      this.phoneCall.comments = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._phoneCallService.getAllContactForTableDropdown(),
      this._phoneCallService.getAllUserForTableDropdown(),
      this._phoneCallService.getAllPhoneCallObjetiveForTableDropdown(),
      this._phoneCallService.getAllContactPhoneCallOutcomeForTableDropdown(),
      this._phoneCallService.getAllBusinessActionScriptForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contacts = data[0].result;
          this.users = data[1].result;
          this.phoneCallObjectives = data[2].result;
          this.nextPhoneCallObjectives = data[2].result;
          this.contactPhoneCalloutcomes = data[3].result;
          this.businessActionScripts = data[4].result;
          
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.phoneCall) {
      this._phoneCallService.createOrEdit(this.phoneCall).then(res => {
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
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
