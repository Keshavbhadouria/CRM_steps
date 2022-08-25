import { Component, OnInit, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PMIndustriesServiceProxy, CreateOrEditPMIndustryDto } from 'src/app/core/services/industry.service';

@Component({
  selector: 'app-industry-view-modal',
  templateUrl: './industry-view-modal.component.html',
  styleUrls: ['./industry-view-modal.component.scss']
})
export class IndustryViewModalComponent implements OnInit {
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
  
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Industry List', active: true }];

    if (this.data) {
      this.pmIndustry = this.data.pmIndustry;
    }
    else {
      this.pmIndustry = new CreateOrEditPMIndustryDto();
    }
  }

}
