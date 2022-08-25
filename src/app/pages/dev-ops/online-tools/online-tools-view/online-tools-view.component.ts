import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-tools-view',
  templateUrl: './online-tools-view.component.html',
  styleUrls: ['./online-tools-view.component.scss']
})
export class OnlineToolsViewComponent implements OnInit {
  constructor() { }
  onlineTools: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    
    this.onlineTools = this.data;
  }
}
