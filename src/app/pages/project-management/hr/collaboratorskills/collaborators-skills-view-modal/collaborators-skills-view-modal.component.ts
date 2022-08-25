import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collaborators-skills-view-modal',
  templateUrl: './collaborators-skills-view-modal.component.html',
  styleUrls: ['./collaborators-skills-view-modal.component.scss']
})
export class CollaboratorsSkillsViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  item: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Project Roles' }, { label: 'Project Roles View', active: true }];
    if (this.data) {
      this.item = this.data;
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

