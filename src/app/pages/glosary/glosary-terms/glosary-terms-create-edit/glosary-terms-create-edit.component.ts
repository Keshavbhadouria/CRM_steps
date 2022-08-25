import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditGlosaryTermDto, GlosaryTermsService } from 'src/app/core/services/glosary-term.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-glosary-terms-create-edit',
  templateUrl: './glosary-terms-create-edit.component.html',
  styleUrls: ['./glosary-terms-create-edit.component.scss']
})
export class GlosaryTermsCreateEditComponent implements OnInit {
  constructor(private _glosaryTermsService: GlosaryTermsService ,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  glosaryTerm: CreateOrEditGlosaryTermDto = new CreateOrEditGlosaryTermDto();
  loading = false;
  createLoader = false;
  allCountries = [];

  ngOnInit(): void {
    if (this.data) {
      this.glosaryTerm = this.data;
    }
    else {
      this.glosaryTerm = new CreateOrEditGlosaryTermDto();
      this.glosaryTerm.description='';
    }
  }

  save() {
    this.showCreateEditLoader();
    if (this.glosaryTerm) {
      this._glosaryTermsService.createOrEdit(this.glosaryTerm).then(res => {
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
