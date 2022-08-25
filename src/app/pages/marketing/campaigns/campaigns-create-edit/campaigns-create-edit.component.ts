import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CampaignsServiceProxy, CreateOrEditCampaignDto } from 'src/app/core/services/campaigns.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-campaigns-create-edit',
  templateUrl: './campaigns-create-edit.component.html',
  styleUrls: ['./campaigns-create-edit.component.scss']
})
export class CampaignsCreateEditComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  campaign: CreateOrEditCampaignDto = new  CreateOrEditCampaignDto();
  loading = false;
  createLoader = false;

  objectives: DropdownDto[];
  leads: DropdownDto[];
  
  isNewCodeGenerated = false;

  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;


  constructor(private _campaignService: CampaignsServiceProxy,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    
    if (this.data) {
      this.campaign = this.data;

      if(this.campaign.specialCode=="")
      this.isNewCodeGenerated=true;
  }
  else {
    this.isNewCodeGenerated=true;
      this.campaign = new CreateOrEditCampaignDto();
    }
    this.loadDropDown();
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._campaignService.getAllCampaignObjectiveForTableDropdown(),
      this._campaignService.getAllLeadSourceForTableDropdown()
    ];

    if(this.isNewCodeGenerated)
      promises.push(this._campaignService.getUniqueCode())

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.objectives = data[0].result;
          this.leads = data[1].result;

          if(this.isNewCodeGenerated)
            this.campaign.specialCode = data[2].result;
        }
        this.hideLoader();
      });
  }

  save(): void {
    this.showCreateEditLoader();
    if (this.campaign) {
      this._campaignService.createOrEdit(this.campaign).then(res => {
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
