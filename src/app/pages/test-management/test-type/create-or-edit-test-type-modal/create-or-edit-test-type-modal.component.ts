import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditTestTypeDto, TestTypesService } from 'src/app/core/services/test-types.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-or-edit-test-type-modal',
  templateUrl: './create-or-edit-test-type-modal.component.html'
  //styleUrls: ['./create-or-edit-test-type-modal.component.scss']
})
export class CreateOrEditTestTypeModalComponent implements OnInit {

  constructor(private _testTypesService: TestTypesService,
    private _messageService: MessageService) { }

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  testType: CreateOrEditTestTypeDto;
  loading = false;
  createLoader = false;

  public description_editor = ClassicEditor;

  ngOnInit(): void {
    if (this.data) {
      this.testType = this.data;
    }
    else {
      this.testType = new CreateOrEditTestTypeDto();
      this.testType.description = '';
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.testType) {
      this._testTypesService.createOrEdit(this.testType).then(res => {
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

}
