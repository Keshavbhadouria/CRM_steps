import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditKPICategoryDto, KpiCategoryService } from 'src/app/core/services/kpi-category.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-kpi-category-modal',
  templateUrl: './create-or-edit-kpi-category-modal.component.html'
  //styleUrls: ['./create-or-edit-kpi-category-modal.component.scss']
})
export class CreateOrEditKpiCategoryModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  kPICategory: CreateOrEditKPICategoryDto;
  loading = false;
  createLoader = false;

  constructor(private _kpiCategoryService: KpiCategoryService,
              private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.kPICategory = this.data;
    }
    else {
      this.kPICategory = new CreateOrEditKPICategoryDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.kPICategory) {
      this._kpiCategoryService.createOrEdit(this.kPICategory).then(res => {
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
