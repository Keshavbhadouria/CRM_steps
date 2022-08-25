import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditLawfirmFeeTypeDto } from 'src/app/core/models/Lawfirm/LawfirmFeeType';
import { LawfirmFeeTypeService } from 'src/app/core/services/lawfirm-fee-type.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-fee-type-create-edit-modal',
  templateUrl: './fee-type-create-edit-modal.component.html',
  styleUrls: ['./fee-type-create-edit-modal.component.scss']
})
export class FeeTypeCreateEditModalComponent implements OnInit {

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



  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  feeType: CreateOrEditLawfirmFeeTypeDto = new CreateOrEditLawfirmFeeTypeDto();

  constructor(private _feeTypeService: LawfirmFeeTypeService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Services' }, { label: 'Create FeeType', active: true }];

    if (this.data) {
      this.feeType = this.data;
    }
    else {
      this.feeType = new CreateOrEditLawfirmFeeTypeDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.feeType) {
      this._feeTypeService.createOrEdit(this.feeType).then(res => {
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

