import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-story-priority-modal',
  templateUrl: './view-story-priority-modal.component.html',
  //styleUrls: ['./view-story-priority-modal.component.scss']
})
export class ViewStoryPriorityModalComponent implements OnInit {

  constructor() { }

  storyPriority: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.storyPriority = this.data;
  }

}
