import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-meeting-comment-modal',
  templateUrl: './view-meeting-comment-modal.component.html',
  //styleUrls: ['./view-meeting-comment-modal.component.scss']
})
export class ViewMeetingCommentModalComponent implements OnInit {

  constructor() { }
  meetingComment: any;
  @Input() public modal: any
  @Input() public data: any;

  remoteUrl = environment.apiURL;
  attachmentUrl: string = '';

  ngOnInit(): void {
    this.meetingComment = this.data;

    if (this.meetingComment.contactZoomCallComments.attachmentUrl !== undefined && this.meetingComment.contactZoomCallComments.attachmentUrl !== null) {
      this.attachmentUrl = this.meetingComment.contactZoomCallComments.attachmentUrl;
    }

  }

}
