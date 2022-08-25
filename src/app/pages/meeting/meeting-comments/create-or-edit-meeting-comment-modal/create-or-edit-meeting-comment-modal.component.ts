import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CreateOrEditContactZoomCallCommentsDto, MeetingCommentsService } from 'src/app/core/services/meeting-comments.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-meeting-comment-modal',
  templateUrl: './create-or-edit-meeting-comment-modal.component.html',
  //styleUrls: ['./create-or-edit-meeting-comment-modal.component.scss']
})
export class CreateOrEditMeetingCommentModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  meetingComment: CreateOrEditContactZoomCallCommentsDto;
  loading = false;
  createLoader = false;

  contactZoomCallMeetings: DropdownDto[];
  users: DropdownDto[];

  public editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _contactMeetingCommentsService: MeetingCommentsService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.meetingComment = this.data;
      if (this.meetingComment.attachmentUrl != null && this.meetingComment.attachmentUrl != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.meetingComment.attachmentUrl;
      }
    }
    else {
      this.meetingComment = new CreateOrEditContactZoomCallCommentsDto();
      this.isAttachment = false;
      this.meetingComment.comments = '';
      this.imageUrl = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactMeetingCommentsService.getAllContactZoomCallMeetingForTableDropdown(),
      this._contactMeetingCommentsService.getAllUserForTableDropdown()
      
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contactZoomCallMeetings = data[0].result;
          this.users = data[1].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.meetingComment) {
      this._contactMeetingCommentsService.createOrEdit(this.meetingComment).then(res => {
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
        this.meetingComment.attachmentUrl = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
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
