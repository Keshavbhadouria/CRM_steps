import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditSupportDto, SupportsService } from 'src/app/core/services/supports.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-user-support-modal',
  templateUrl: './create-or-edit-user-support-modal.component.html',
  //styleUrls: ['./create-or-edit-user-support-modal.component.scss']
})
export class CreateOrEditUserSupportModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  userSupport: CreateOrEditSupportDto;
  loading = false;
  createLoader = false;

  users: DropdownDto[];
  statuses: DropdownDto[];


  public editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _supportsService: SupportsService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.userSupport = this.data;
      if (this.userSupport.attatchmentUrl != null && this.userSupport.attatchmentUrl != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.userSupport.attatchmentUrl;
      }
    }
    else {
      this.userSupport = new CreateOrEditSupportDto();
      this.isAttachment = false;
      this.userSupport.bodyMessage = '';
      this.imageUrl = '';
    }
    this.loadDropDown();
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._supportsService.getAllUserForTableDropdown(),
      this._supportsService.getAllHelpDeskStatusForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.users = data[0].result;
          this.statuses = data[1].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.userSupport) {
      this._supportsService.createOrEdit(this.userSupport).then(res => {
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
  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userSupport.attatchmentUrl = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageType");
    }
  }

  changeImage() {
    this.isAttachment = false;
  }
}
