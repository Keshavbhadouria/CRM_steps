import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CommissionTrackingService, CreateOrEditCommissionTrackingDto } from 'src/app/core/services/commission-tracking.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-commission-tracking-modal',
  templateUrl: './create-or-edit-commission-tracking-modal.component.html',
  //styleUrls: ['./create-or-edit-commission-tracking-modal.component.scss']
})
export class CreateOrEditCommissionTrackingModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  commissionTracking: CreateOrEditCommissionTrackingDto;
  loading = false;
  createLoader = false;

  campaigns: DropdownDto[];
  invoices: DropdownDto[];
  commissionStatuses: DropdownDto[];

  constructor(private _commissionTrackingService: CommissionTrackingService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.commissionTracking = this.data;
    }
    else {
      this.commissionTracking = new CreateOrEditCommissionTrackingDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._commissionTrackingService.getAllCampaignForTableDropdown(),
      this._commissionTrackingService.getAllInvoiceForTableDropdown(),
      this._commissionTrackingService.getAllCommissionStatusForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.campaigns = data[0].result;
          this.invoices = data[1].result;
          this.commissionStatuses = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.commissionTracking) {
      this._commissionTrackingService.createOrEdit(this.commissionTracking).then(res => {
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
}
