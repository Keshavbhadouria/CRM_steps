import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPBXConfigurationDto, PBXConfigurationService } from 'src/app/core/services/pbxconfiguration.service';

@Component({
  selector: 'app-pbx-configuration-create-or-edit-modal',
  templateUrl: './pbx-configuration-create-or-edit-modal.component.html',
  styleUrls: ['./pbx-configuration-create-or-edit-modal.component.scss']
})
export class PbxConfigurationCreateOrEditModalComponent implements OnInit {

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

  pbx: CreateOrEditPBXConfigurationDto = new CreateOrEditPBXConfigurationDto();

  constructor(private _PBXConfigurationService: PBXConfigurationService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Settings' }, { label: 'Create Pbx', active: true }];

    if (this.data) {
      this.pbx = this.data;
    }
    else {
      this.pbx = new CreateOrEditPBXConfigurationDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.pbx) {
      this._PBXConfigurationService.createOrEdit(this.pbx).then(res => {
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

