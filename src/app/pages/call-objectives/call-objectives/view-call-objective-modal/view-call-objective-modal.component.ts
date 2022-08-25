import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-call-objective-modal',
  templateUrl: './view-call-objective-modal.component.html',
  //styleUrls: ['./view-call-objective-modal.component.scss']
})
export class ViewCallObjectiveModalComponent implements OnInit {

  constructor() { }
  callObjective: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.callObjective = this.data;
  }

}
