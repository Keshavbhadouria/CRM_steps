import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-call-history-view-modal',
  templateUrl: './phone-call-history-view-modal.component.html',
  styleUrls: ['./phone-call-history-view-modal.component.scss']
})
export class PhoneCallHistoryViewModalComponent implements OnInit {

  constructor() { }
  phoneCall: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.phoneCall = this.data;
  }

}
