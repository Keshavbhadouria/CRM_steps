import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ContractTemplateNameService } from 'src/app/core/services/contract-template-name.service';
import { CreateOrEditContracTemplateNameDto } from 'src/app/core/models/Retainer/ContractTemplateName';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-edit-modal',
  templateUrl: './create-edit-modal.component.html',
  styleUrls: ['./create-edit-modal.component.scss']
})
export class CreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;
  public Editor = ClassicEditor;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  allLawfirmcontracTemplateNames: DropdownDto[];


  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  contracTemplateName: CreateOrEditContracTemplateNameDto = new CreateOrEditContracTemplateNameDto();

  constructor(private _contractTemplateNameService: ContractTemplateNameService, private _messageService: MessageService, private modalService: NgbModal) {
   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Lawfirm Service' }, { label: 'Create LawfirmServices', active: true }];
    if (this.data) {
      this.contracTemplateName = this.data.contracTemplateName;
    }
    else {
      this.contracTemplateName = new CreateOrEditContracTemplateNameDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.contracTemplateName) {
      this._contractTemplateNameService.createOrEdit(this.contracTemplateName).then(res => {
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

  //#endregion


  //#region Helper Methods


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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}
