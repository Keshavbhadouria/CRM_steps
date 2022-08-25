import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-phone-call-modal',
  templateUrl: './view-phone-call-modal.component.html',
  //styleUrls: ['./view-phone-call-modal.component.scss']
})
export class ViewPhoneCallModalComponent implements OnInit {

  constructor() { }
  phoneCall: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.phoneCall = this.data;
  }

}
