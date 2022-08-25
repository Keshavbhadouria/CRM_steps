import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-knowledge-base-modal',
  templateUrl: './view-knowledge-base-modal.component.html',
  //styleUrls: ['./view-knowledge-base-modal.component.scss']
})
export class ViewKnowledgeBaseModalComponent implements OnInit {

  constructor() { }
  knowledgeBase: any;
  @Input() public modal: any
  @Input() public data: any;
  fileType: string = '';

  remoteUrl = environment.apiURL;
  attachmentUrl: string = '';

  ngOnInit(): void {
    this.knowledgeBase = this.data;
    if (this.knowledgeBase.knowledgeBase.attachment !== undefined && this.knowledgeBase.knowledgeBase.attachment !== null) {
      this.fileType = this.knowledgeBase.knowledgeBase.attachment.split('.').pop();
      this.attachmentUrl = this.knowledgeBase.knowledgeBase.attachment;
    }
  }
}
