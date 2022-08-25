import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-role-view-modal',
  templateUrl: './project-role-view-modal.component.html',
  styleUrls: ['./project-role-view-modal.component.scss']
})
export class ProjectRoleViewModalComponent implements OnInit {

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
    this.breadCrumbItems = [{ label: 'Project Roles' }, { label: 'Project Roles View', active: true }];
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

