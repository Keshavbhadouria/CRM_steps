import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deployment-approval-view',
  templateUrl: './deployment-approval-view.component.html',
  styleUrls: ['./deployment-approval-view.component.scss']
})
export class DeploymentApprovalViewComponent implements OnInit {

  constructor() { }
  dm: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.dm = this.data;
  }
}
