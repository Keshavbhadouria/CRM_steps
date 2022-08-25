import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { AffiliateService, CreateOrEditAffiliateDto } from 'src/app/core/services/affiliate.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-affiliate-modal',
  templateUrl: './create-or-edit-affiliate-modal.component.html',
  //styleUrls: ['./create-or-edit-affiliate-modal.component.scss']
})
export class CreateOrEditAffiliateModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  affiliate: CreateOrEditAffiliateDto;
  loading = false;
  createLoader = false;

  tierNames: DropdownDto[];

isNewCodeGenerated = false;
  constructor(private _affiliateService: AffiliateService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.affiliate = this.data;

      if(this.affiliate.specialCode=="")
        this.isNewCodeGenerated=true;
    }
    else {
      this.isNewCodeGenerated=true;
      this.affiliate = new CreateOrEditAffiliateDto();
    }

    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._affiliateService.getAllAffiliateTierForTableDropdown(),
    ];

    

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.tierNames = data[0].result;

          
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.affiliate) {
      this._affiliateService.createOrEdit(this.affiliate).then(res => {
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
