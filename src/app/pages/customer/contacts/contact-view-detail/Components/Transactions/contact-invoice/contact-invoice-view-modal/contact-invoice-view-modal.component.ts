import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactInvoiceService } from 'src/app/core/services/contact-invoice.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-invoice-view-modal',
  templateUrl: './contact-invoice-view-modal.component.html',
  //styleUrls: ['./contact-invoice-view-modal.component.scss']
})
export class ContactInvoiceViewModalComponent implements OnInit {

  @Input() public modal: any;
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  item: any;
  invoiceDetail: any;
  loading: boolean = false;

  subTotal: number = 0;
  total: number = 0;

  constructor( private _contactInvoiceService: ContactInvoiceService,private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Transaction' }, { label: 'Invoice', active: true }];
    if (this.data) {
      
      this.item = this.data;
      this.getAllByContactInvoiceHeaderId()
    }
  }


  getAllByContactInvoiceHeaderId() {
    this.showLoader();
    
    this._contactInvoiceService.getAllByContactInvoiceHeaderId(
      this.item.contactInvoiceHeader.id
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.invoiceDetail = [];
        this.invoiceDetail = res.result.contactInvoiceHeader.invoiceDetail;
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
    return this.invoiceDetail.forEach(element => {
      this.subTotal += element.price *  element.quantity
      this.total += element.total
    })
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }


}
