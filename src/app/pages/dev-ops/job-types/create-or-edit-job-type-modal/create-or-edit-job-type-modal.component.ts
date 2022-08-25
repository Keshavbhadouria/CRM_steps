import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditJobTypeDto, JobTypesService } from 'src/app/core/services/job-types.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-job-type-modal',
  templateUrl: './create-or-edit-job-type-modal.component.html',
  //styleUrls: ['./create-or-edit-job-type-modal.component.scss']
})
export class CreateOrEditJobTypeModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  jobType: CreateOrEditJobTypeDto;
  loading = false;
  createLoader = false;

  constructor(private _jobTypeService: JobTypesService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.jobType = this.data;
    }
    else {
      this.jobType = new CreateOrEditJobTypeDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.jobType) {
      this._jobTypeService.createOrEdit(this.jobType).then(res => {
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
