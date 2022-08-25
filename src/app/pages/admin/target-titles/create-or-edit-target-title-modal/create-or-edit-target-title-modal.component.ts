import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditTargetTitleDto, TargetTitlesService } from 'src/app/core/services/target-titles.service';

@Component({
  selector: 'app-create-or-edit-target-title-modal',
  templateUrl: './create-or-edit-target-title-modal.component.html',
  //styleUrls: ['./create-or-edit-target-title-modal.component.scss']
})
export class CreateOrEditTargetTitleModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  targetTitle: CreateOrEditTargetTitleDto;
  loading = false;
  createLoader = false;

  constructor(private _targetTitleService: TargetTitlesService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.targetTitle = this.data;
    }
    else {
      this.targetTitle = new CreateOrEditTargetTitleDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.targetTitle) {
      this._targetTitleService.createOrEdit(this.targetTitle).then(res => {
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
