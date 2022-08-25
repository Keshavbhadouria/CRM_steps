import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cloud-providers-view',
  templateUrl: './cloud-providers-view.component.html',
  styleUrls: ['./cloud-providers-view.component.scss']
})
export class CloudProvidersViewComponent implements OnInit {

  constructor() { }
  cloudProvider: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.cloudProvider = this.data;
  }

}
