import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditLeadStageHistoryDto, StagesHistoryService } from 'src/app/core/services/stages-history.service';

@Component({
  selector: 'app-stages-history-create-edit',
  templateUrl: './stages-history-create-edit.component.html',
  styleUrls: ['./stages-history-create-edit.component.scss']
})
export class StagesHistoryCreateEditComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();

  leadStageHistory: CreateOrEditLeadStageHistoryDto = new CreateOrEditLeadStageHistoryDto();
  allContact: any;
  allStages: any;
  allStages2: any;
  allContacts: any;
  createLoader: boolean;
  loading: boolean;

  constructor(private _stageHistoryServices: StagesHistoryService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.leadStageHistory = this.data.leadStageHistory;
    }
    else {
      this.leadStageHistory = new CreateOrEditLeadStageHistoryDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._stageHistoryServices.getAllContactForTableDropdown(),
      this._stageHistoryServices.getAllLeadStageForTableDropdown(),
      this._stageHistoryServices.getAllLeadStageForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allContacts = data[0].result;
          this.allStages = data[1].result;
          this.allStages2 = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.leadStageHistory) {
      this._stageHistoryServices.createOrEdit(this.leadStageHistory).then(res => {
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

  hideLoader(): void {
    this.loading = false;
  }
}
