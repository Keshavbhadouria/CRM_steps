import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ClientDatabasesService, CreateOrEditClientDatabaseDto } from 'src/app/core/services/client-databases.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-client-database-modal',
  templateUrl: './create-or-edit-client-database-modal.component.html',
  //styleUrls: ['./create-or-edit-client-database-modal.component.scss']
})
export class CreateOrEditClientDatabaseModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  clientDatabase: CreateOrEditClientDatabaseDto;
  loading = false;
  createLoader = false;

  databaseEngines: DropdownDto[];
  serverInventories: DropdownDto[];
  responsibles: DropdownDto[];

  constructor(private _clientDatabaseService: ClientDatabasesService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.clientDatabase = this.data;
    }
    else {
      this.clientDatabase = new CreateOrEditClientDatabaseDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._clientDatabaseService.getAllDatabaseEngineForTableDropdown(),
      this._clientDatabaseService.getAllServerInventoryForTableDropdown(),
      this._clientDatabaseService.getAllUserForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.databaseEngines = data[0].result;
          this.serverInventories = data[1].result;
          this.responsibles = data[2].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.clientDatabase) {
      this._clientDatabaseService.createOrEdit(this.clientDatabase).then(res => {
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
