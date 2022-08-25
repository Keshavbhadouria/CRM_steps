import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-story-status-modal',
  templateUrl: './view-story-status-modal.component.html'
  //styleUrls: ['./view-story-status-modal.component.scss']
})
export class ViewStoryStatusModalComponent implements OnInit {

  constructor() { }
  storyStatus: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.storyStatus = this.data;
  }
}
