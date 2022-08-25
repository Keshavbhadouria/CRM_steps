import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectStatusService } from 'src/app/core/services/project-status.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-skills-view-modal',
  templateUrl: './skills-view-modal.component.html',
  styleUrls: ['./skills-view-modal.component.scss']
})
export class SkillsViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  pmProjectStatus: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Skills' }, { label: 'Skills View', active: true }];
    if (this.data) {
      this.pmProjectStatus = this.data;
    }
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }
}
