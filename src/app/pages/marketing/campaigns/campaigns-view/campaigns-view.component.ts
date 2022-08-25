import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaigns-view',
  templateUrl: './campaigns-view.component.html',
  styleUrls: ['./campaigns-view.component.scss']
})
export class CampaignsViewComponent implements OnInit {

  constructor() { }
  campaign: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.campaign = this.data;
  }

}
