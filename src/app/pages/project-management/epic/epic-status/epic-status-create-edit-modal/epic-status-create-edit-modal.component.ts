import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditPMEpicStatusDto } from 'src/app/core/models/Project/CreateOrEditEpic';
import { EpicStatusService } from 'src/app/core/services/epic-status.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-epic-status-create-edit-modal',
  templateUrl: './epic-status-create-edit-modal.component.html',
  styleUrls: ['./epic-status-create-edit-modal.component.scss']
})
export class EpicStatusCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;



  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  epicStatus: CreateOrEditPMEpicStatusDto = new CreateOrEditPMEpicStatusDto();

  constructor(private _EpicStatusService: EpicStatusService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Epic' }, { label: 'Create Epic Status', active: true }];

    if (this.data) {
      this.epicStatus = this.data;
    }
    else {
      this.epicStatus = new CreateOrEditPMEpicStatusDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.epicStatus) {
      this._EpicStatusService.createOrEdit(this.epicStatus).then(res => {
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



  //#endregion


  //#region Helper Methods


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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}

