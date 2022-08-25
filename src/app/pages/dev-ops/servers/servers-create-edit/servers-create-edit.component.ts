import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditServerInventoryDto, ServersService } from 'src/app/core/services/servers.service';

@Component({
  selector: 'app-servers-create-edit',
  templateUrl: './servers-create-edit.component.html',
  styleUrls: ['./servers-create-edit.component.scss']
})
export class ServersCreateEditComponent implements OnInit {
  allClouds: any;
  constructor(private _serversService: ServersService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    serverInventory: CreateOrEditServerInventoryDto = new CreateOrEditServerInventoryDto();
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      this.loadDropdown();
      if (this.data) {
        this.serverInventory = this.data;
      }
      else {
        this.serverInventory = new CreateOrEditServerInventoryDto();
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.serverInventory) {
        this._serversService.createOrEdit(this.serverInventory).then(res => {
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
    loadDropdown(){
      const promises = [
        this._serversService.getAllCloudProviderForTableDropdown(),
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.allClouds = data[0].result;
          }
          this.hideLoader();
        });
    }
}
