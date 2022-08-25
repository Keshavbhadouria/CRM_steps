import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { BusinessKpiService, CreateOrEditBusinessKPIDto } from 'src/app/core/services/business-kpi.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-business-kpi-modal',
  templateUrl: './create-or-edit-business-kpi-modal.component.html',
  //styleUrls: ['./create-or-edit-business-kpi-modal.component.scss']
})
export class CreateOrEditBusinessKpiModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  businessKPI: CreateOrEditBusinessKPIDto;
  loading = false;
  createLoader = false;

  kpiCategories: DropdownDto[];

  constructor(private _businessKPIService: BusinessKpiService,
              private _messageService: MessageService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.businessKPI = this.data;
    }
    else {
      this.businessKPI = new CreateOrEditBusinessKPIDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._businessKPIService.getAllKPICategoryForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.kpiCategories = data[0].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.businessKPI) {
      this._businessKPIService.createOrEdit(this.businessKPI).then(res => {
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
