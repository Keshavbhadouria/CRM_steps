import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-email-history-modal',
  templateUrl: './view-email-history-modal.component.html',
  //styleUrls: ['./view-email-history-modal.component.scss']
})
export class ViewEmailHistoryModalComponent implements OnInit {

  constructor() { }
  emailHistory: any;
  @Input() public modal: any
  @Input() public data: any;
  remoteUrl = environment.apiURL;
  attachmentUrl: string = '';
  ngOnInit(): void {
    this.emailHistory = this.data;
    if (this.emailHistory.contactEmailHistory.attachmentUrl !== undefined && this.emailHistory.contactEmailHistory.attachmentUrl !== null) {
      this.attachmentUrl = this.emailHistory.contactEmailHistory.attachmentUrl;
    }
  }

}
