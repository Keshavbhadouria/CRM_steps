import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deployment-details-view',
  templateUrl: './deployment-details-view.component.html',
  styleUrls: ['./deployment-details-view.component.scss']
})
export class DeploymentDetailsViewComponent implements OnInit {

  constructor() { }
  dmDetails: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.dmDetails = this.data;
  }
}
