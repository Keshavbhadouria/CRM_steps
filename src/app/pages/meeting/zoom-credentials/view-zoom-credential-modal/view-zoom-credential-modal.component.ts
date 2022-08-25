import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-zoom-credential-modal',
  templateUrl: './view-zoom-credential-modal.component.html',
  //styleUrls: ['./view-zoom-credential-modal.component.scss']
})
export class ViewZoomCredentialModalComponent implements OnInit {

  constructor() { }
  credentials: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.credentials = this.data;
  }

}
