import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditTestTypeTodoListTemplateDto, TestTemplatesService } from 'src/app/core/services/test-templates.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-or-edit-test-template-modal',
  templateUrl: './create-or-edit-test-template-modal.component.html'
  //styleUrls: ['./create-or-edit-test-template-modal.component.scss']
})
export class CreateOrEditTestTemplateModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  testTypeTodoListTemplate: CreateOrEditTestTypeTodoListTemplateDto;
  loading = false;
  createLoader = false;

  testTypes: DropdownDto[];
  public description_editor = ClassicEditor;

  constructor(private _testTypeTodoListTemplateService: TestTemplatesService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.testTypeTodoListTemplate = this.data;
    }
    else {
      this.testTypeTodoListTemplate = new CreateOrEditTestTypeTodoListTemplateDto();
      this.testTypeTodoListTemplate.description = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._testTypeTodoListTemplateService.getAllTestTypeForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.testTypes = data[0].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.testTypeTodoListTemplate) {
      this._testTypeTodoListTemplateService.createOrEdit(this.testTypeTodoListTemplate).then(res => {
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
}
