import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-client-database-modal',
  templateUrl: './view-client-database-modal.component.html',
  //styleUrls: ['./view-client-database-modal.component.scss']
})
export class ViewClientDatabaseModalComponent implements OnInit {

  constructor() { }
  clientDatabase: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.clientDatabase = this.data;
  }

}
