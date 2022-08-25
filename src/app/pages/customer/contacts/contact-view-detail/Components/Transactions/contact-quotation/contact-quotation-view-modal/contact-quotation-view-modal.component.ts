import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactQuotationService } from 'src/app/core/services/contact-quotation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-quotation-view-modal',
  templateUrl: './contact-quotation-view-modal.component.html',
  styleUrls: ['./contact-quotation-view-modal.component.scss']
})
export class ContactQuotationViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  item: any;
  quoteDetail: any;
  loading: boolean = false;

  subTotal: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor( private _contactQuotationService: ContactQuotationService,private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Transaction' }, { label: 'Quotation', active: true }];
    if (this.data) {
      this.item = this.data;
      this.getQuoteDetailByHeaderId()
    }
  }



  getQuoteDetailByHeaderId() {
    this.showLoader();
    this._contactQuotationService.getAllByContactQuoteHeaderId(
      this.item.contactQuoteHeader.id
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.quoteDetail = [];
        this.quoteDetail = res.result;
        this.getSumOfSubtotal()
      } else {
        this._messageService.showServerSideError();
      }
    })
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  getSumOfSubtotal() {
    return this.quoteDetail.forEach(element => {
      this.subTotal += element.contactQuoteDetail.price
      this.tax += element.contactQuoteDetail.tax
      this.total += element.contactQuoteDetail.total
    })
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }


}
