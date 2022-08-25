import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditClientApplicationStatusDto, StatusService } from 'src/app/core/services/status.service';

@Component({
  selector: 'app-status-create-edit',
  templateUrl: './status-create-edit.component.html',
  styleUrls: ['./status-create-edit.component.scss']
})
export class StatusCreateEditComponent implements OnInit {
  constructor(private _statusService: StatusService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    item: CreateOrEditClientApplicationStatusDto;
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      
      if (this.data) {
        this.item = this.data;
      }
      else {
        this.item = new CreateOrEditClientApplicationStatusDto();
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.item) {
        this._statusService.createOrEdit(this.item).then(res => {
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
