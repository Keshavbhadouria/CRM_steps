import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditOnlineToolsDto, OnlineToolsService } from 'src/app/core/services/online-tools.service';

@Component({
  selector: 'app-online-tools-create-or-edit',
  templateUrl: './online-tools-create-or-edit.component.html',
  styleUrls: ['./online-tools-create-or-edit.component.scss']
})
export class OnlineToolsCreateOrEditComponent implements OnInit {
  constructor(private _onlineToolsService: OnlineToolsService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    onlineTools: CreateOrEditOnlineToolsDto;
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      
      if (this.data) {
        this.onlineTools = this.data;
      }
      else {
        this.onlineTools = new CreateOrEditOnlineToolsDto();
        this.onlineTools.description = '';
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.onlineTools) {
        this._onlineToolsService.createOrEdit(this.onlineTools).then(res => {
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
