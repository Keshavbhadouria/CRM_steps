import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ApplicationRecurrentJobsService, CreateOrEditApplicationRecurrentJobDto } from 'src/app/core/services/application-recurrent-jobs.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-recurrentjob-modal',
  templateUrl: './create-or-edit-recurrentjob-modal.component.html',
  //styleUrls: ['./create-or-edit-recurrentjob-modal.component.scss']
})
export class CreateOrEditRecurrentjobModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  recurrentJob: CreateOrEditApplicationRecurrentJobDto;
  loading = false;
  createLoader = false;

  clientApplications: DropdownDto[];
  serverInventories: DropdownDto[];
  responsibles: DropdownDto[];

  constructor(private _applicationRecurrentJobsService: ApplicationRecurrentJobsService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.recurrentJob = this.data;
    }
    else {
      this.recurrentJob = new CreateOrEditApplicationRecurrentJobDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._applicationRecurrentJobsService.getAllClientApplicationForTableDropdown(),
      this._applicationRecurrentJobsService.getAllServerInventoryForTableDropdown(),
      this._applicationRecurrentJobsService.getAllUserForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.clientApplications = data[0].result;
          this.serverInventories = data[1].result;
          this.responsibles = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.recurrentJob) {
      this._applicationRecurrentJobsService.createOrEdit(this.recurrentJob).then(res => {
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
