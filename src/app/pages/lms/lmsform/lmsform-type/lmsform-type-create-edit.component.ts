import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CreateOrEditLMSFormTypeDto, LMSFormTypeService } from 'src/app/core/services/lmsform-type.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lmsform-type-create-edit',
  templateUrl: './lmsform-type-create-edit.component.html',
  styleUrls: ['./lmsform-type-create-edit.component.scss']
})
export class LmsformTypeCreateEditComponent implements OnInit {

 
  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  lmsFormType: CreateOrEditLMSFormTypeDto = new CreateOrEditLMSFormTypeDto();
  loading = false;
  createLoader = false;


  constructor(private _formTypeService: LMSFormTypeService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.lmsFormType = this.data;
    }
    else {
      this.lmsFormType = new CreateOrEditLMSFormTypeDto();
    }
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.lmsFormType) {
      this._formTypeService.createOrEdit(this.lmsFormType).then(res => {
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
