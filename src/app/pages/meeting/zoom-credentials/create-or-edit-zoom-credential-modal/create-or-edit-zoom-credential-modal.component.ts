import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditZoomCredentialDto, ZoomCredentialsService } from 'src/app/core/services/zoom-credentials.service';

@Component({
  selector: 'app-create-or-edit-zoom-credential-modal',
  templateUrl: './create-or-edit-zoom-credential-modal.component.html',
  //styleUrls: ['./create-or-edit-zoom-credential-modal.component.scss']
})
export class CreateOrEditZoomCredentialModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  zoomCredential: CreateOrEditZoomCredentialDto;
  loading = false;
  createLoader = false;

  users: DropdownDto[];

  constructor(private _zoomCredentialsService: ZoomCredentialsService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.zoomCredential = this.data;
    }
    else {
      this.zoomCredential = new CreateOrEditZoomCredentialDto();
    }
    this.loadDropDown();
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._zoomCredentialsService.getAllUserForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.users = data[0].result;
        }
        this.hideLoader();
      });
  }

  save() {
    this.showCreateEditLoader();
    if (this.zoomCredential) {
      this._zoomCredentialsService.createOrEdit(this.zoomCredential).then(res => {
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
