import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactDocumentSignatureService, CreateOrEditContactDocumentSignatureDto } from 'src/app/core/services/contact-document-signature.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-contactdocument-signature-modal',
  templateUrl: './create-or-edit-contactdocument-signature-modal.component.html',
  //styleUrls: ['./create-or-edit-contactdocument-signature-modal.component.scss']
})
export class CreateOrEditContactdocumentSignatureModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  contactDocSignature: CreateOrEditContactDocumentSignatureDto;
  loading = false;
  createLoader = false;

  contactDocuments: DropdownDto[];
  users: DropdownDto[];
  roles: DropdownDto[];

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _contactDocSignatureService: ContactDocumentSignatureService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.contactDocSignature = this.data;
      if (this.contactDocSignature.signatureImagesUrl != null && this.contactDocSignature.signatureImagesUrl != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.contactDocSignature.signatureImagesUrl;
      }
    }
    else {
      this.contactDocSignature = new CreateOrEditContactDocumentSignatureDto();
      this.isAttachment = false;
      this.imageUrl = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._contactDocSignatureService.getAllContactDocumentForTableDropdown(),
      this._contactDocSignatureService.getAllUserForTableDropdown(),
      this._contactDocSignatureService.getAllRoleForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.contactDocuments = data[0].result;
          this.users = data[1].result;
          this.roles = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): any {

    if (this.contactDocSignature.signatureImagesUrl === "" ||
      this.contactDocSignature.signatureImagesUrl === undefined ||
      this.contactDocSignature.signatureImagesUrl === null) {
      this._messageService.showError("", "Please select signature image.");
      return false;
    }
    
    this.showCreateEditLoader();
    if (this.contactDocSignature) {
      this._contactDocSignatureService.createOrEdit(this.contactDocSignature).then(res => {
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
        this.contactDocSignature.signatureImagesUrl = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
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
