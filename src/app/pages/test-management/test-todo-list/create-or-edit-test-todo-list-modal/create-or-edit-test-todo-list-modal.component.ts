import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditTestTypeTodoListDto, TestTodoListService } from 'src/app/core/services/test-todo-list.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-or-edit-test-todo-list-modal',
  templateUrl: './create-or-edit-test-todo-list-modal.component.html'
  //styleUrls: ['./create-or-edit-test-todo-list-modal.component.scss']
})
export class CreateOrEditTestTodoListModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  testTypeTodoList: CreateOrEditTestTypeTodoListDto;
  loading = false;
  createLoader = false;

  pmTaskTypes: DropdownDto[];
  testTypes: DropdownDto[];
  users: DropdownDto[];

  public description_editor = ClassicEditor;
  public comments_editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _testTypeTodoListService: TestTodoListService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.testTypeTodoList = this.data;
      if (this.testTypeTodoList.attachment != null && this.testTypeTodoList.attachment != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.testTypeTodoList.attachment;
      }
    }
    else {
      this.testTypeTodoList = new CreateOrEditTestTypeTodoListDto();
      this.testTypeTodoList.description = '';
      this.testTypeTodoList.comments = '';
      this.isAttachment = false;
      this.imageUrl = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._testTypeTodoListService.getAllPMtaskForTableDropdown(),
      this._testTypeTodoListService.getAllTestTypeForTableDropdown(),
      this._testTypeTodoListService.getAllUserForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.pmTaskTypes = data[0].result;
          this.testTypes = data[1].result;
          this.users = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.testTypeTodoList) {
      this._testTypeTodoListService.createOrEdit(this.testTypeTodoList).then(res => {
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
        this.testTypeTodoList.attachment = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
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
