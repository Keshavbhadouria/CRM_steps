import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-notification-template-modal',
  templateUrl: './view-notification-template-modal.component.html',
  //styleUrls: ['./view-notification-template-modal.component.scss']
})
export class ViewNotificationTemplateModalComponent implements OnInit {

  constructor() { }
  template: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.template = this.data;
  }

}
