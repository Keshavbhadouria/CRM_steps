import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-contactdocument-signature-modal',
  templateUrl: './view-contactdocument-signature-modal.component.html',
  //styleUrls: ['./view-contactdocument-signature-modal.component.scss']
})
export class ViewContactdocumentSignatureModalComponent implements OnInit {

  constructor() { }
  contactDocSignature: any;
  @Input() public modal: any
  @Input() public data: any;
  remoteUrl = environment.apiURL;
  attachmentUrl: string = '';

  ngOnInit(): void {
    this.contactDocSignature = this.data;
    if (this.contactDocSignature.contactDocumentSignature.signatureImagesUrl !== undefined && this.contactDocSignature.contactDocumentSignature.signatureImagesUrl !== null) {
      this.attachmentUrl = this.contactDocSignature.contactDocumentSignature.signatureImagesUrl;
    }
  }
}
