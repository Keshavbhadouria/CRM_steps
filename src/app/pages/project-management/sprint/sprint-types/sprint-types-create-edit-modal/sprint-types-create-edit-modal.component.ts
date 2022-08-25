import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditPMSprintTypeDto } from 'src/app/core/models/Project/Sprint';
import { MessageService } from 'src/app/core/services/message.service';
import { SprintTypesService } from 'src/app/core/services/Sprint-Types.service';

@Component({
  selector: 'app-sprint-types-create-edit-modal',
  templateUrl: './sprint-types-create-edit-modal.component.html',
  styleUrls: ['./sprint-types-create-edit-modal.component.scss']
})
export class SprintTypesCreateEditModalComponent implements OnInit {

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

  SprintTypes: CreateOrEditPMSprintTypeDto = new CreateOrEditPMSprintTypeDto();

  constructor(private _SprintTypesService: SprintTypesService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Sprint' }, { label: 'Create Sprint Types', active: true }];

    if (this.data) {
      this.SprintTypes = this.data;
    }
    else {
      this.SprintTypes = new CreateOrEditPMSprintTypeDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.SprintTypes) {
      this._SprintTypesService.createOrEdit(this.SprintTypes).then(res => {
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
