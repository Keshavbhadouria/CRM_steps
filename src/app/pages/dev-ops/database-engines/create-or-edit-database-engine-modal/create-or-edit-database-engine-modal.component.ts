import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditDatabaseEngineDto, DatabaseEnginesService } from 'src/app/core/services/database-engines.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-database-engine-modal',
  templateUrl: './create-or-edit-database-engine-modal.component.html',
  //styleUrls: ['./create-or-edit-database-engine-modal.component.scss']
})
export class CreateOrEditDatabaseEngineModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  databaseEngine: CreateOrEditDatabaseEngineDto;
  loading = false;
  createLoader = false;

  constructor(private _databaseEngineService: DatabaseEnginesService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.databaseEngine = this.data;
    }
    else {
      this.databaseEngine = new CreateOrEditDatabaseEngineDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.databaseEngine) {
      this._databaseEngineService.createOrEdit(this.databaseEngine).then(res => {
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
