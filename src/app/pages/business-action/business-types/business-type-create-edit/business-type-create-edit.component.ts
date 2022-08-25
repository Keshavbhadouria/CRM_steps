import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BusinessTypeService, CreateOrEditActionTypeDto } from 'src/app/core/services/business-type.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-business-type-create-edit',
  templateUrl: './business-type-create-edit.component.html',
  styleUrls: ['./business-type-create-edit.component.scss']
})
export class BusinessTypeCreateEditComponent implements OnInit {

  constructor(private _storyStatusService: BusinessTypeService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    businessType: CreateOrEditActionTypeDto;
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      if (this.data) {
        this.businessType = this.data;
      }
      else {
        this.businessType = new CreateOrEditActionTypeDto();
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.businessType) {
        this._storyStatusService.createOrEdit(this.businessType).then(res => {
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
