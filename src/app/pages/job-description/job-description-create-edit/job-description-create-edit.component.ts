import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditJobDescriptionDto, JobDescriptionService } from 'src/app/core/services/job-description.service';


@Component({
  selector: 'app-job-description-create-edit',
  templateUrl: './job-description-create-edit.component.html',
  styleUrls: ['./job-description-create-edit.component.scss']
})
export class JobDescriptionCreateEditComponent implements OnInit {
  allUsers = [];

  constructor(private _jobService: JobDescriptionService ,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    public Function_Editor = ClassicEditor;

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();

  jobDescription: CreateOrEditJobDescriptionDto = new CreateOrEditJobDescriptionDto();
  loading = false;
  createLoader = false;

  ngOnInit(): void {
    this.loadUsers();
    if (this.data) {
      this.jobDescription = this.data;
    }
    else {
      this.jobDescription = new CreateOrEditJobDescriptionDto();
      this.jobDescription.description='';
      this.jobDescription.functions = '';
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.jobDescription) {
      this._jobService.createOrEdit(this.jobDescription).then(res => {
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
  loadUsers(){
    this._jobService.getAllUserForTableDropdown().then(res => {
        this.allUsers = res.result;
    })
  }
}
