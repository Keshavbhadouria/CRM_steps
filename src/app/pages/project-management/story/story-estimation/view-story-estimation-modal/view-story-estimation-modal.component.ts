import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-story-estimation-modal',
  templateUrl: './view-story-estimation-modal.component.html'
  //styleUrls: ['./view-story-estimation-modal.component.scss']
})
export class ViewStoryEstimationModalComponent implements OnInit {

  constructor() { }
  storyEstimation: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.storyEstimation = this.data;
  }

}
