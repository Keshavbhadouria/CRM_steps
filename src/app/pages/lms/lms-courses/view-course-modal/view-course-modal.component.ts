import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-course-modal',
  templateUrl: './view-course-modal.component.html',
  //styleUrls: ['./view-course-modal.component.scss']
})
export class ViewCourseModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  courseDetails: any;
  @Input() public data: any;
  @Input() public modal: any;

  @ViewChild('topicDetails') topicDetails: ElementRef

  ngOnInit(): void {
    this.courseDetails = this.data;
  }

  modalRef: any;
  topicData: any;
  viewTopicDetails(topicDetails, content): void {
    this.topicData = topicDetails;
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      size: 'xl'
    })
  }
}
