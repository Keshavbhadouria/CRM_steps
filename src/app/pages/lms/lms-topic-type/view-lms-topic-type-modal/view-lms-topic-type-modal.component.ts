import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-lms-topic-type-modal',
  templateUrl: './view-lms-topic-type-modal.component.html',
  //styleUrls: ['./view-lms-topic-type-modal.component.scss']
})
export class ViewLmsTopicTypeModalComponent implements OnInit {

  constructor() { }
  topicType: any;
  @Input() public modal: any
  @Input() public data: any;

  remoteUrl = environment.apiURL;

  ngOnInit(): void {
    this.topicType = this.data;
  }

}
