import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditInvoiceTemplateDto, InvoiceTemplateService } from 'src/app/core/services/invoice-emplate.service';
import { MessageService } from 'src/app/core/services/message.service';
import { Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'app-invoice-template-create-edit',
  templateUrl: './invoice-template-create-edit.component.html',
  styleUrls: ['./invoice-template-create-edit.component.scss']
})
export class InvoiceTemplateCreateEditComponent implements OnInit {
  constructor(private _invoiceTemplateService: InvoiceTemplateService,
    private _messageService: MessageService, private _lightbox: Lightbox) { }

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  invoiceTemplate: CreateOrEditInvoiceTemplateDto = new CreateOrEditInvoiceTemplateDto();
  loading = false;
  createLoader = false;
  InvoiceTemplate_Template: string;
  _albums = [];
  ngOnInit(): void {
    this.loadInvoiceImages()
    if (this.data) {
      this.invoiceTemplate = this.data;
      this.InvoiceTemplate_Template = this.invoiceTemplate.template;
    }
    else {
      this.invoiceTemplate = new CreateOrEditInvoiceTemplateDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.invoiceTemplate) {
      if (this.InvoiceTemplate_Template == '') {
        this._messageService.showError('',"Please Select any template !");
        return;
      }
      this.invoiceTemplate.template = this.InvoiceTemplate_Template;
      this._invoiceTemplateService.createOrEdit(this.invoiceTemplate).then(res => {
        if (res.success) {
          this.hideCreateEditLoader();
          this.$modalClose.emit(true);
        } else {
          this.hideCreateEditLoader();
          this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
      });
    }
  }

  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  selectInvoice(invoiceType) {
    this.InvoiceTemplate_Template = invoiceType;
  }
  loadInvoiceImages() {
    for (let i = 1; i <= 6; i++) {
      const src = '../../../../../assets/invoice-design/Invoice' + i + '.PNG';
      const caption = 'Template' + i + '';
      const album = {
        src: src,
        caption: caption,
      };
      this._albums.push(album);
    }
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index - 1);
  }

}
