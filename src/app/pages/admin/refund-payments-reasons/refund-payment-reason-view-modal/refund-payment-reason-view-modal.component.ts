import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refund-payment-reason-view-modal',
  templateUrl: './refund-payment-reason-view-modal.component.html',
  styleUrls: ['./refund-payment-reason-view-modal.component.scss']
})
export class RefundPaymentReasonViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  RefundReason: any;

  constructor(private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects View', active: true }];
    if (this.data) {
      this.RefundReason = this.data;
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
