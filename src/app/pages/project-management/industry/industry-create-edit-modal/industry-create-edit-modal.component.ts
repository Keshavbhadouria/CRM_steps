import { Component, OnInit, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PMIndustriesServiceProxy, CreateOrEditPMIndustryDto } from 'src/app/core/services/industry.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-industry-create-edit-modal',
  templateUrl: './industry-create-edit-modal.component.html',
  styleUrls: ['./industry-create-edit-modal.component.scss']
})
export class IndustryCreateEditModalComponent implements OnInit {
  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();

  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  totalCount: number = 0;
  industryList: any;

  // Create

  active = false;
  saving = false;

  pmIndustry: CreateOrEditPMIndustryDto = new CreateOrEditPMIndustryDto();
  constructor(private _industryService: PMIndustriesServiceProxy, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Industry List', active: true }];

    if (this.data) {
      this.pmIndustry = this.data.pmIndustry;
    }
    else {
      this.pmIndustry = new CreateOrEditPMIndustryDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.pmIndustry) {
      this._industryService.createOrEdit(this.pmIndustry).then(res => {
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
