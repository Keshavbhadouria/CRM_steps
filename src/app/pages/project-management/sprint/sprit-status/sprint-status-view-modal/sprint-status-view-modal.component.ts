import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { SprintStatusService } from 'src/app/core/services/Sprint-status.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sprint-status-view-modal',
  templateUrl: './sprint-status-view-modal.component.html',
  styleUrls: ['./sprint-status-view-modal.component.scss']
})
export class SprintStatusViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  SprintStatus: any;

  constructor(private _SprintStatusService: SprintStatusService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects View', active: true }];
    if (this.data) {
      this.SprintStatus = this.data;
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

