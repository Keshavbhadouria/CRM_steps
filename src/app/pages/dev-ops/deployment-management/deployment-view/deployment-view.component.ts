import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deployment-view',
  templateUrl: './deployment-view.component.html',
  styleUrls: ['./deployment-view.component.scss']
})
export class DeploymentViewComponent implements OnInit {

  constructor() { }
  dm: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.dm = this.data;
  }

}
