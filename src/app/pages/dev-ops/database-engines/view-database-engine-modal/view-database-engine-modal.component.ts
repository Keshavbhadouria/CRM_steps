import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-database-engine-modal',
  templateUrl: './view-database-engine-modal.component.html',
  //styleUrls: ['./view-database-engine-modal.component.scss']
})
export class ViewDatabaseEngineModalComponent implements OnInit {

  constructor() { }
  dbEngine: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.dbEngine = this.data;
  }

}
