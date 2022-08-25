import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditContactEmailHistoryDto, EmailHistoriesService } from 'src/app/core/services/email-histories.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-email-history-modal',
  templateUrl: './create-or-edit-email-history-modal.component.html',
  //styleUrls: ['./create-or-edit-email-history-modal.component.scss']
})
export class CreateOrEditEmailHistoryModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  emailHistory: CreateOrEditContactEmailHistoryDto;
  loading = false;
  createLoader = false;

  users: DropdownDto[];
  contacts: DropdownDto[];

  public editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _emailHistoryService: EmailHistoriesService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.emailHistory = this.data;
      if (this.emailHistory.attachmentUrl != null && this.emailHistory.attachmentUrl != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.emailHistory.attachmentUrl;
      }
    }
    else {
      this.emailHistory = new CreateOrEditContactEmailHistoryDto();
      this.isAttachment = false;
      this.emailHistory.bodyMessage = '';
      this.imageUrl = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._emailHistoryService.getAllUserForTableDropdown(),
      this._emailHistoryService.getAllContactForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.users = data[0].result;
          this.contacts = data[1].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.emailHistory) {
      this._emailHistoryService.createOrEdit(this.emailHistory).then(res => {
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
        this.emailHistory.attachmentUrl = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
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
