import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditOnlineToolsDto, OnlineToolsService } from 'src/app/core/services/online-tools.service';
import { CloudProvidersService, CreateOrEditCloudProviderDto } from 'src/app/core/services/cloud-providers.service';

@Component({
  selector: 'app-cloud-providers-create-edit',
  templateUrl: './cloud-providers-create-edit.component.html',
  styleUrls: ['./cloud-providers-create-edit.component.scss']
})
export class CloudProvidersCreateEditComponent implements OnInit {
  constructor(private _cloudService: CloudProvidersService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    cloudProvider: CreateOrEditCloudProviderDto = new CreateOrEditCloudProviderDto();
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      
      if (this.data) {
        this.cloudProvider = this.data;
      }
      else {
        this.cloudProvider = new CreateOrEditCloudProviderDto();
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.cloudProvider) {
        this._cloudService.createOrEdit(this.cloudProvider).then(res => {
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
