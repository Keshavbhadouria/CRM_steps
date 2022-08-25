import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditSupportTicketCommentDto, SupportCommentService } from 'src/app/core/services/support-comment.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-support-comment-modal',
  templateUrl: './create-or-edit-support-comment-modal.component.html',
  //styleUrls: ['./create-or-edit-support-comment-modal.component.scss']
})
export class CreateOrEditSupportCommentModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  supportComment: CreateOrEditSupportTicketCommentDto;
  loading = false;
  createLoader = false;

  users: DropdownDto[];
  supportTickets: DropdownDto[];


  public editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _supportCommentService: SupportCommentService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.supportComment = this.data;
      if (this.supportComment.attatchmentUrl != null && this.supportComment.attatchmentUrl != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.supportComment.attatchmentUrl;
      }
    }
    else {
      this.supportComment = new CreateOrEditSupportTicketCommentDto();
      this.isAttachment = false;
      this.supportComment.comment = '';
      this.imageUrl = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._supportCommentService.getAllUserForTableDropdown(),
      this._supportCommentService.getAllSupportForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.users = data[0].result;
          this.supportTickets = data[1].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.supportComment) {
      this._supportCommentService.createOrEdit(this.supportComment).then(res => {
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
        this.supportComment.attatchmentUrl = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
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
