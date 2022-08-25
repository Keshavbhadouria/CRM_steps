import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactDocumentService, CreateOrEditContactDocumentDto } from 'src/app/core/services/contact-document.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-contact-document-modal',
  templateUrl: './create-or-edit-contact-document-modal.component.html',
  //styleUrls: ['./create-or-edit-contact-document-modal.component.scss']
})
export class CreateOrEditContactDocumentModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  contactDocument: CreateOrEditContactDocumentDto;
  loading = false;
  createLoader = false;

  contacts: DropdownDto[];
  stepDocuments: DropdownDto[];

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _contactDocumentService: ContactDocumentService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.contactDocument = this.data;
      if (this.contactDocument.documentUrl != null && this.contactDocument.documentUrl != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.contactDocument.documentUrl;
      }
    }
    else {
      this.contactDocument = new CreateOrEditContactDocumentDto();
      this.isAttachment = false;
      this.imageUrl = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactDocumentService.getAllContactForTableDropdown(),
      this._contactDocumentService.getAllStepDocumentsForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contacts = data[0].result;
          this.stepDocuments = data[1].result;
        }
        this.hideLoader();
      });
  }
  save(): any {

    if (this.contactDocument.documentUrl === "" ||
      this.contactDocument.documentUrl === undefined ||
      this.contactDocument.documentUrl === null) {
      this._messageService.showError("", "Please select signature image.");
      return false;
    }

    this.showCreateEditLoader();
    if (this.contactDocument) {
      this._contactDocumentService.createOrEdit(this.contactDocument).then(res => {
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
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
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
  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.contactDocument.documentUrl = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageType");
    }
  }

  changeImage() {
    this.isAttachment = false;
  }
}
