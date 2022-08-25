import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-story-modal',
  templateUrl: './view-story-modal.component.html'
  //styleUrls: ['./view-story-modal.component.scss']
})
export class ViewStoryModalComponent implements OnInit {

  constructor() { }
  story: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    this.story = this.data;
  }

}
