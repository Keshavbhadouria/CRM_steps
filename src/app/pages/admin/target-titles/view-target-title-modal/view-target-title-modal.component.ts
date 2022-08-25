import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-target-title-modal',
  templateUrl: './view-target-title-modal.component.html',
  //styleUrls: ['./view-target-title-modal.component.scss']
})
export class ViewTargetTitleModalComponent implements OnInit {

  constructor() { }
  targetTitle: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.targetTitle = this.data;
  }

}
