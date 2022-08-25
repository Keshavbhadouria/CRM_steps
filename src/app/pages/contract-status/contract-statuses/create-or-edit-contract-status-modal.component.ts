import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContractStatusService, CreateOrEditContractStatusDto } from "src/app/core/services/contract-status.service";
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-contract-status-create-edit-modal',
    templateUrl: './create-or-edit-contract-status-modal.component.html'
})


export class CreateOrEditContractStatusModalComponent implements OnInit {

    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    contractStatus: CreateOrEditContractStatusDto;
    loading = false;
    createLoader = false;

    constructor(private _contractStatusService: ContractStatusService,
        private _messageService: MessageService,
        private modalService: NgbModal) {

    }

    ngOnInit() {
        if (this.data) {
            this.contractStatus = this.data.contractStatus;
        }
        else {
            this.contractStatus = new CreateOrEditContractStatusDto();
        }
    }

    save() {
        this.showCreateEditLoader();
        if (this.contractStatus) {
            this._contractStatusService.createOrEdit(this.contractStatus).then(res => {
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