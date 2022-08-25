import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-call-outcome-modal',
  templateUrl: './view-call-outcome-modal.component.html',
  //styleUrls: ['./view-call-outcome-modal.component.scss']
})
export class ViewCallOutcomeModalComponent implements OnInit {

  constructor() { }
  outcome: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.outcome = this.data;
  }
}
