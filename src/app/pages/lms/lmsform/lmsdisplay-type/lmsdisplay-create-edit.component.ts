import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CreateOrEditLMSDisplayTypeDto, LMSServiceTypeService } from 'src/app/core/services/lmsform-display.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lmsdisplay-create-edit',
  templateUrl: './lmsdisplay-create-edit.component.html',
  styleUrls: ['./lmsdisplay-create-edit.component.scss']
})
export class LmsdisplayCreateEditComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  lmsDisplayType: CreateOrEditLMSDisplayTypeDto = new CreateOrEditLMSDisplayTypeDto();
  loading = false;
  createLoader = false;


  constructor(private _dsiplayTypeService: LMSServiceTypeService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.lmsDisplayType = this.data;
    }
    else {
      this.lmsDisplayType = new CreateOrEditLMSDisplayTypeDto();
    }
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.lmsDisplayType) {
      this._dsiplayTypeService.createOrEdit(this.lmsDisplayType).then(res => {
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
