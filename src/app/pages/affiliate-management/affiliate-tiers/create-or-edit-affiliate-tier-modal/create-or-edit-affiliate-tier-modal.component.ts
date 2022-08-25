import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AffiliateTierService, CreateOrEditAffiliateTierDto } from 'src/app/core/services/affiliate-tier.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-affiliate-tier-modal',
  templateUrl: './create-or-edit-affiliate-tier-modal.component.html',
  //styleUrls: ['./create-or-edit-affiliate-tier-modal.component.scss']
})
export class CreateOrEditAffiliateTierModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  affiliateTier: CreateOrEditAffiliateTierDto;
  loading = false;
  createLoader = false;

  constructor(private _affiliateTierService: AffiliateTierService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.affiliateTier = this.data;
    }
    else {
      this.affiliateTier = new CreateOrEditAffiliateTierDto();
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.affiliateTier) {
      this._affiliateTierService.createOrEdit(this.affiliateTier).then(res => {
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
