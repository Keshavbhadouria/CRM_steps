import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-support-comment-modal',
  templateUrl: './view-support-comment-modal.component.html',
  //styleUrls: ['./view-support-comment-modal.component.scss']
})
export class ViewSupportCommentModalComponent implements OnInit {

  constructor() { }
  supportComment: any;
  @Input() public modal: any
  @Input() public data: any;
  remoteUrl = environment.apiURL;
  attachmentUrl: string = '';
  ngOnInit(): void {
    
    this.supportComment = this.data;
    if (this.supportComment.supportTicketComment.attatchmentUrl !== undefined && this.supportComment.supportTicketComment.attatchmentUrl !== null) {
      this.attachmentUrl = this.supportComment.supportTicketComment.attatchmentUrl;
    }
  }

}
