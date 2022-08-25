import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditKnowledgeBaseDto, KnowledgeBasesService } from 'src/app/core/services/knowledge-bases.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-knowledge-base-modal',
  templateUrl: './create-or-edit-knowledge-base-modal.component.html',
  //styleUrls: ['./create-or-edit-knowledge-base-modal.component.scss']
})
export class CreateOrEditKnowledgeBaseModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  knowledgeBase: CreateOrEditKnowledgeBaseDto;
  loading = false;
  createLoader = false;

  projects: DropdownDto[];

  public editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  fileType: string = '';

  constructor(private _knowledgeBaseService: KnowledgeBasesService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.knowledgeBase = this.data;
      if (this.knowledgeBase.attachment != null && this.knowledgeBase.attachment != '') {
        this.isAttachment = true;
        this.fileType = this.knowledgeBase.attachment.split('.').pop();
        this.imageUrl = environment.apiURL + "/" + this.knowledgeBase.attachment;
      }
    }
    else {
      this.knowledgeBase = new CreateOrEditKnowledgeBaseDto();
      this.isAttachment = false;
      this.knowledgeBase.comments = '';
      this.imageUrl = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._knowledgeBaseService.getAllPMProjectForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.projects = data[0].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.knowledgeBase) {
      this._knowledgeBaseService.createOrEdit(this.knowledgeBase).then(res => {
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

    this.fileType = file.name.split('.').pop();

    if (this.fileType.toLowerCase() == "png" ||
      this.fileType.toLowerCase() == 'jpg' ||
      this.fileType.toLowerCase() == "jpeg" ||
      this.fileType.toLowerCase() == "doc" ||
      this.fileType.toLowerCase() == "docx" ||
      this.fileType.toLowerCase() == "pdf" ||
      this.fileType.toLowerCase() == "xls" ||
      this.fileType.toLowerCase() == "xlsx") {
    }
    else {
      this._messageService.showError("SupportTicketFileTypeTitleErrorMsg", "SupportTicketFileTypeErrorMsg");
      this.myInputVariable.nativeElement.value = "";
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.knowledgeBase.attachment = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
    };
    this.isAttachment = true;
  }

  changeImage() {
    this.isAttachment = false;
  }

}
