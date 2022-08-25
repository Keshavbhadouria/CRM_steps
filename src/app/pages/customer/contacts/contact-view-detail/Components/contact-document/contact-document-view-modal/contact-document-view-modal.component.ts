import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactPaymentPlanService } from 'src/app/core/services/contact-payment-plan.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-document-view-modal',
  templateUrl: './contact-document-view-modal.component.html',
  //styleUrls: ['./contact-document-view-modal.component.scss']
})
export class ContactDocumentViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  item: any;
  paymentPlanDetail: any;
  loading: boolean = false;

  subTotal: number = 0;
  total: number = 0;

  constructor( private _contactPaymentPlanService: ContactPaymentPlanService,private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Transaction' }, { label: 'Payment History', active: true }];
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
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  openLinkInNewTab(url) {
    window.open(environment.apiURL + '/' + url);
  }

}
