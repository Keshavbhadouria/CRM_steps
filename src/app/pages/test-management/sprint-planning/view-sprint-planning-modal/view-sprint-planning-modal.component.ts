import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-sprint-planning-modal',
  templateUrl: './view-sprint-planning-modal.component.html'
  //styleUrls: ['./view-sprint-planning-modal.component.scss']
})
export class ViewSprintPlanningModalComponent implements OnInit {

  constructor() { }
  storyEstimationVote: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.storyEstimationVote = this.data;
  }

}
