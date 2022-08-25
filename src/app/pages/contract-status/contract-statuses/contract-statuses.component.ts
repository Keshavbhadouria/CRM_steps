import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ContractStatusService, CreateOrEditContractStatusDto } from 'src/app/core/services/contract-status.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-statuses',
  templateUrl: './contract-statuses.component.html',
  styleUrls: ['./contract-statuses.component.scss']
})
export class ContractStatusesComponent implements OnInit {

  advancedFiltersAreShown: boolean = false;
  filterText = '';
  statusNameFilter = '';
  contractStatusList: any;
  loading = false;
  totalCount: number = 0;
  editContractStatus: any;
  viewContractStatus: any;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'md'
  };

  constructor(private _contractStatusService: ContractStatusService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  contractStatus: CreateOrEditContractStatusDto = new CreateOrEditContractStatusDto();

  ngOnInit(): void {
    this.getContractStatuses();
  }


  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  getContractStatuses(): void {
    this.showLoader();
    this._contractStatusService.getAll(this.filterText, this.statusNameFilter, undefined, 0, 10)
      .then(response => {
        if (response.success) {
          this.contractStatusList = response.result.items;
          this.totalCount = response.result.totalCount;
          this.hideLoader();
        }
        else {
          this._messageService.showServerSideError();
          this.hideLoader();
        }
      });
  }

  openCreateModal(modal: any) {
    this.editContractStatus = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  onEditContractStatus(item, modal) {
    this.editContractStatus = item;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  onViewContractStatus(item, modal) {
    this.editContractStatus = item;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }
  modalEmitEvent() {
    this.closeCreateModal();
    this.getContractStatuses();
  }

  onDelete(pmProject) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._contractStatusService.delete(pmProject.contractStatus.id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getContractStatuses();
                this._messageService.showSuccess('Deleted!', 'Contract status deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }

}
