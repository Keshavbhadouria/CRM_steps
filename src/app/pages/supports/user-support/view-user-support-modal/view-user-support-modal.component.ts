import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-user-support-modal',
  templateUrl: './view-user-support-modal.component.html',
  //styleUrls: ['./view-user-support-modal.component.scss']
})
export class ViewUserSupportModalComponent implements OnInit {

  constructor() { }
  viewSupport: any;
  @Input() public modal: any
  @Input() public data: any;

  remoteUrl = environment.apiURL;

  ngOnInit(): void {
    this.viewSupport = this.data;
  }

}
