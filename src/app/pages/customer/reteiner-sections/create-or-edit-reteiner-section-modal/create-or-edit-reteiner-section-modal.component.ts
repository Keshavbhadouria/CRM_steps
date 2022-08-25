import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditReteinerSectionsDto, ReteinerSectionService } from 'src/app/core/services/reteiner-section.service';

@Component({
  selector: 'app-create-or-edit-reteiner-section-modal',
  templateUrl: './create-or-edit-reteiner-section-modal.component.html',
  //styleUrls: ['./create-or-edit-reteiner-section-modal.component.scss']
})
export class CreateOrEditReteinerSectionModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  reteinerSection: CreateOrEditReteinerSectionsDto;
  loading = false;
  createLoader = false;

  contractSections: DropdownDto[];

  constructor(private _reteinerSectionService: ReteinerSectionService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.reteinerSection = this.data;
    }
    else {
      this.reteinerSection = new CreateOrEditReteinerSectionsDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._reteinerSectionService.getAllContractSectionForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contractSections = data[0].result;
        }
        this.hideLoader();
      });
  }

  save() {
    this.showCreateEditLoader();
    if (this.reteinerSection) {
      this._reteinerSectionService.createOrEdit(this.reteinerSection).then(res => {
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
