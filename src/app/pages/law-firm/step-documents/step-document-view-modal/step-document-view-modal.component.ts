import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { ServiceActivitiesService } from 'src/app/core/services/service-activities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-step-document-view-modal',
  templateUrl: './step-document-view-modal.component.html',
  styleUrls: ['./step-document-view-modal.component.scss']
})
export class StepDocumentViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  item: any;

  constructor(private _itemService: ServiceActivitiesService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Lawfirm Service' }, { label: 'Lawfirm Service', active: true }];
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
