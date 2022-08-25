import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers-view',
  templateUrl: './servers-view.component.html',
  styleUrls: ['./servers-view.component.scss']
})
export class ServersViewComponent implements OnInit {

  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.item = this.data;
  }

}
